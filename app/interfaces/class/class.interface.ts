import { IClassPeriod } from "../period/period.interface";

export interface IGetClassResponseBody {
  id: string;
  subjectId: string;
  name: string;
  subjectName: string;
  quota: number;
  day: string;
  startAt: string;
  endAt: string;
  room: string;
  sessionId: string | null;
  participants: number;
}

export interface IGetClassByIdResponseBody {
  id: string;
  subjectId: string;
  name: string;
  subjectCode: string;
  subjectName: string;
  semester: string;
  lecturer: string;
  quota: number;
  day: string;
  startAt: string;
  endAt: string;
  room: string;
  sessionId: string | null;
  participants: number;
  meetings: number;
  recordedMeetings: number;
  period: IClassPeriod | null;
}

export interface IAddClassRequestBody {
  subjectId: string;
  name: string;
  quota: number;
  day: string;
  room: string;
  sessionId: string;
}

export type IUpdateClassRequestBody = Omit<IAddClassRequestBody, "subjectId">;

export interface IDeleteClassResponseBody {
  participants: number;
  assistants: number;
  meetings: number;
}
