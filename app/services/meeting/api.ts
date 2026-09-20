import {
  IAddClassMeetingRequestBody,
  IGetAllClassMeetingResponseBody,
  IUpdateAttendanceRequestBody,
  IUpdateMeetingStatusRequestBody,
} from "@/app/interfaces/meeting/meeting.interface";
import satellite from "../satellite";
import { IBaseResponse } from "@/app/interfaces/global/index.interface";

export const postMeeting = async (
  body: IAddClassMeetingRequestBody,
): Promise<IBaseResponse> => {
  const res = await satellite.post("/meeting", body);

  return res.data;
};

export const getMeetings = async (
  classId: string,
): Promise<IBaseResponse<IGetAllClassMeetingResponseBody[]>> => {
  const res = await satellite.get(`/meeting/${classId}`);

  return res.data;
};

export const putMeetingStatus = async (
  meetingId: string,
  body: IUpdateMeetingStatusRequestBody,
): Promise<IBaseResponse> => {
  const res = await satellite.put(`/meeting/${meetingId}/status`, body);

  return res.data;
};

export const putStudentAttendance = async (
  meetingId: string,
  userId: string,
  body: IUpdateAttendanceRequestBody,
): Promise<IBaseResponse> => {
  const res = await satellite.put(
    `/meeting/${meetingId}/attendances/${userId}`,
    body,
  );

  return res.data;
};

export const deleteStudentAttendance = async (
  meetingId: string,
  userId: string,
): Promise<IBaseResponse> => {
  const res = await satellite.delete(
    `/meeting/${meetingId}/attendances/${userId}`,
  );

  return res.data;
};
