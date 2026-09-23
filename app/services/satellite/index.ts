import { getToken, refreshAccessToken } from "@/app/utils/cookie";
import axios, { InternalAxiosRequestConfig } from "axios";

const satellite = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20_000,
});

const readTokenFromBrowser = (): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);

  return match ? decodeURIComponent(match[1]) : undefined;
};

export const getRequestToken = async (): Promise<string | undefined> =>
  readTokenFromBrowser() ?? (await getToken());

satellite.interceptors.request.use(
  async (request) => {
    const token = await getRequestToken();

    if (token) request.headers["Authorization"] = `Bearer ${token}`;

    return request;
  },
  async (error) => Promise.reject(error),
);

let pendingRefresh: Promise<string | undefined> | null = null;

export const refreshOnce = () =>
  (pendingRefresh ??= refreshAccessToken().finally(() => {
    pendingRefresh = null;
  }));

satellite.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const request = error.config as
      | (InternalAxiosRequestConfig & { _retried?: boolean })
      | undefined;

    if (
      error.response?.data?.message === "jwt expired" &&
      request &&
      !request._retried
    ) {
      const token = await refreshOnce();

      if (token) {
        request._retried = true;
        request.headers["Authorization"] = `Bearer ${token}`;
        return satellite(request);
      }
    }

    if (error.response) {
      const errorMessage =
        error.response.data.message || "An unknown error occurred";
      return Promise.reject({ status: false, message: errorMessage });
    }
    return Promise.reject({
      status: false,
      message: "Network error, please try again!",
    });
  },
);

export default satellite;
