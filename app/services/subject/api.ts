import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";
import {
  IAddSubjectRequestBody,
  IGetSubjectResponseBody,
} from "@/app/interfaces/subject/subject.interface";
import { IGetActivationResponseBody } from "@/app/interfaces/activation/activation.interface";

export const getAllSubjects = async () => {
  const res =
    await satellite.get<IBaseResponse<IGetSubjectResponseBody[]>>("/subject");

  return res.data;
};

/**
 * Mengambil daftar aktivasi.
 *
 * status dikosongkan  -> seluruh aktivasi
 * status "true"       -> yang sudah membayar
 * status "false"      -> yang belum membayar
 */
export const getActivations = async (status?: "true" | "false") => {
  const res = await satellite.get<IBaseResponse<IGetActivationResponseBody[]>>(
    `/activation/?status=${status ?? ""}`,
  );

  return res.data;
};

export const addSubject = async (body: IAddSubjectRequestBody) => {
  const res = await satellite.post<IBaseResponse>("/subject", body);

  return res.data;
};
