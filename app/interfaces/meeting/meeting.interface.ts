export interface IAddClassMeetingRequestBody {
  classId: string;
  meetingName: string;
}

export interface IUpdateMeetingRequestBody {
  meetingName: string;
}

export interface IGetAllClassMeetingResponseBody {
  id: string;
  meetingName: string;
  isOpen?: boolean;
  isHeld?: boolean;
  students?: IMeetingParticipants[];
}

export interface IGetMeetingQrTokenResponseBody {
  token: string;
  periodSeconds: number;
  expiresInMs: number;
}

export type DeviceCheck = "BIASA" | "TIDAK_BIASA" | "SUDAH_DICEK";

export interface IMeetingParticipants {
  studentId: string;
  studentName: string;
  nim: string;
  submittedAt: string | null;
  isAttended: boolean;
  deviceCheck?: DeviceCheck | null;
}

export interface IUpdateMeetingStatusRequestBody {
  status: boolean;
}

export interface IUpdateAttendanceRequestBody {
  status: boolean;
}

export interface ICheckStudentDeviceRequestBody {
  present: boolean;
}
