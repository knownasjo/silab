import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";
import {
  IAddClassRequestBody,
  IGetClassByIdResponseBody,
  IGetClassResponseBody,
} from "@/app/interfaces/class/class.interface";

export const getAllClass = async (accessToken?: string) => {
  const res = await satellite.get<IBaseResponse<IGetClassResponseBody[]>>(
    "/class",
    accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  );

  return res.data;
};

export const getClassById = async (id: string) => {
  const res = await satellite.get<IBaseResponse<IGetClassByIdResponseBody>>(
    `/class/${id}`,
  );

  return res.data;
};

export const postClass = async (body: IAddClassRequestBody) => {
  const res = await satellite.post<IBaseResponse>("/class", body);

  return res.data;
};
