import {
  IChangePasswordRequestBody,
  ILoginRequestBody,
  ILoginResponseBody,
  IMeResponseBody,
} from "@/app/interfaces/auth/auth.interface";
import satellite from "../satellite";
import { IBaseResponse } from "@/app/interfaces/global/index.interface";

export const postLogin = async (body: ILoginRequestBody) => {
  const res = await satellite.post<IBaseResponse<ILoginResponseBody>>(
    "/auth/login",
    body,
  );

  return res.data;
};

export const getMe = async (accessToken?: string) => {
  const res = await satellite.get<IBaseResponse<IMeResponseBody>>(
    "/auth/me",
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  );

  return res.data;
};

export const updateMe = async (fullname: string) => {
  const res = await satellite.put<IBaseResponse<IMeResponseBody>>(
    "/auth/me",
    { fullname },
  );

  return res.data;
};

export const changeMyPassword = async (body: IChangePasswordRequestBody) => {
  const res = await satellite.put<IBaseResponse<ILoginResponseBody>>(
    "/auth/me/password",
    body,
  );

  return res.data;
};
