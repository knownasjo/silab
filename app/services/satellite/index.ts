import { getToken, refreshAccessToken } from "@/app/utils/cookie";
import axios, { InternalAxiosRequestConfig } from "axios";

const satellite = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20_000,
});

/**
 * Membaca cookie accessToken langsung dari browser.
 *
 * Sebelumnya setiap permintaan memanggil getToken(), sebuah server action,
 * sehingga harus bolak-balik ke server hanya untuk membaca cookie. Tepat
 * setelah login, panggilan itu mengantre di belakang navigasi yang sedang
 * berjalan dan membuat halaman tampak kosong sampai di-refresh.
 *
 * Cookie ini memang terbaca JavaScript karena diset tanpa httpOnly, jadi
 * membacanya di sini tidak menambah risiko apa pun yang belum ada.
 */
const readTokenFromBrowser = (): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);

  return match ? decodeURIComponent(match[1]) : undefined;
};

satellite.interceptors.request.use(
  async (request) => {
    // Cookie accessToken hilang sendiri saat tokennya kedaluwarsa; getToken()
    // lalu meminta token baru dengan refresh token.
    const token = readTokenFromBrowser() ?? (await getToken());

    if (token) request.headers["Authorization"] = `Bearer ${token}`;

    return request;
  },
  async (error) => Promise.reject(error),
);

// Beberapa permintaan yang gagal bersamaan cukup memicu satu refresh.
let pendingRefresh: Promise<string | undefined> | null = null;

const refreshOnce = () =>
  (pendingRefresh ??= refreshAccessToken().finally(() => {
    pendingRefresh = null;
  }));

satellite.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const request = error.config as
      | (InternalAxiosRequestConfig & { _retried?: boolean })
      | undefined;

    // Jam browser bisa tertinggal dari jam server, sehingga cookie masih
    // terkirim padahal backend sudah menganggap tokennya kedaluwarsa.
    // Permintaan itu diulang sekali dengan token baru.
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
