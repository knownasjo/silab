import { IBaseResponse } from "@/app/interfaces/global/index.interface";
import { ILecturerDashboardResponseBody } from "@/app/interfaces/dashboard/dashboard.interface";
import satellite from "../satellite";

export const getLecturerDashboard = async () => {
  const res =
    await satellite.get<IBaseResponse<ILecturerDashboardResponseBody>>(
      "/dashboard/dosen",
    );

  return res.data;
};
