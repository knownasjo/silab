import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import satellite from "../satellite";
import { IGetActivationResponseBody } from "@/app/interfaces/activation/activation.interface";

export const getAllActivation = async (
  name?: string,
): Promise<IBaseResponse<IGetActivationResponseBody[]>> => {
  const res = await satellite.get(`/activation/?name=${name ?? ""}`);

  return res.data;
};

export const putUpdatePaymentStatus = async (
  id: string,
  paymentStatus: boolean,
  classId?: string,
): Promise<IBaseResponse> => {
  const res = await satellite.put(`/activation/${id}`, {
    status: paymentStatus,
    ...(classId ? { classId } : {}),
  });

  return res.data;
};

export const putUpdateStudentClass = async (
  id: string,
  classId: string,
): Promise<IBaseResponse> => {
  const res = await satellite.put(`/activation/${id}/class`, { classId });

  return res.data;
};
