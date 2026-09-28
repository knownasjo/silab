import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import {
  IPeriodResponseBody,
  IStartPeriodRequestBody,
  IStartPeriodResponseBody,
} from "@/app/interfaces/period/period.interface";
import satellite from "../satellite";

export const getPeriods = async () => {
  const res =
    await satellite.get<IBaseResponse<IPeriodResponseBody[]>>("/period");

  return res.data;
};

export const postPeriod = async (body: IStartPeriodRequestBody = {}) => {
  const res = await satellite.post<IBaseResponse<IStartPeriodResponseBody>>(
    "/period",
    body,
  );

  return res.data;
};
