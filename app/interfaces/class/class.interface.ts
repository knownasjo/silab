export interface IGetClassResponseBody {
  id: string;
  subjectId: string;
  name: string;
  subject_name: string;
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
  subject_name: string;
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
  recorded_meetings: number;
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
