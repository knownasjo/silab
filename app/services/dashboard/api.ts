import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import { ILecturerDashboardResponseBody } from "@/app/interfaces/dashboard/dashboard.interface";
import satellite from "../satellite";

export const getLecturerDashboard = async (periodId?: string) => {
  const res = await satellite.get<
    IBaseResponse<ILecturerDashboardResponseBody>
  >(periodId ? `/dashboard/dosen?periodId=${periodId}` : "/dashboard/dosen");

  return res.data;
};
