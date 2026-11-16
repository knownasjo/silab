import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import {
  IActivityListResponseBody,
  IActivityQuery,
} from "@/app/interfaces/activity/activity.interface";
import satellite from "../satellite";

export const getActivities = async (query: IActivityQuery) => {
  const params = new URLSearchParams(
    Object.entries(query)
      .map(([key, value]) => [key, String(value)])
      .filter(([, value]) => value !== ""),
  );
  const res = await satellite.get<IBaseResponse<IActivityListResponseBody>>(
    `/activity?${params}`,
  );

  return res.data;
};
