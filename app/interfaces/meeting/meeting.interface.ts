export interface IAddClassMeetingRequestBody {
  classId: string;
  meetingName: string;
}

export interface IGetAllClassMeetingResponseBody {
  id: string;
  meeting_name: string;
  is_open?: boolean;
  token?: string;
  students?: IMeetingParticipants[];
}

export interface IMeetingParticipants {
  student_id: string;
  student_name: string;
  nim: string;
  submitted_at: string | null;
  is_attended: boolean;
}

export interface IUpdateMeetingStatusRequestBody {
  status: boolean;
}

export interface IUpdateAttendanceRequestBody {
  status: boolean;
}
