import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import {
  IAddSessionRequestBody,
  ISessionResponseBody,
  IUpdateSessionRequestBody,
} from "@/app/interfaces/session/session.interface";
import satellite from "../satellite";

export const getSessions = async () => {
  const res =
    await satellite.get<IBaseResponse<ISessionResponseBody[]>>("/session");

  return res.data;
};

export const postSession = async (body: IAddSessionRequestBody) => {
  const res = await satellite.post<IBaseResponse<ISessionResponseBody>>(
    "/session",
    body,
  );

  return res.data;
};

export const putSession = async (
  id: string,
  body: IUpdateSessionRequestBody,
) => {
  const res = await satellite.put<IBaseResponse<ISessionResponseBody>>(
    `/session/${id}`,
    body,
  );

  return res.data;
};

export const deleteSession = async (id: string) => {
  const res = await satellite.delete<IBaseResponse>(`/session/${id}`);

  return res.data;
};
