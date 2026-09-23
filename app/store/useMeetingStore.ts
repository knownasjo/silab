import { create } from "zustand";
import {
  IAddClassMeetingRequestBody,
  IGetAllClassMeetingResponseBody,
} from "../interfaces/meeting/meeting.interface";
import {
  deleteStudentAttendance,
  getMeetingQrToken,
  getMeetings,
  postMeeting,
  putMeetingStatus,
  putStudentAttendance,
} from "../services/meeting/api";

type MeetingQrToken = {
  meetingId: string;
  token: string;
  periodSeconds: number;
  expiresAt: number;
};

type MeetingState = GlobalState & {
  meetingsData: IGetAllClassMeetingResponseBody[];
  message: string | null;
  qrToken: MeetingQrToken | null;
  qrError: string | null;
};

type MeetingActions = {
  getMeetings: (classId: string) => Promise<void>;
  getQrToken: (meetingId: string) => Promise<void>;
  clearQrToken: () => void;
  addMeeting: (body: IAddClassMeetingRequestBody) => Promise<void>;
  updateMeetingStatus: (
    meetingId: string,
    status: boolean,
    classId: string,
  ) => Promise<void>;
  updateStudentAttendance: (
    meetingId: string,
    userId: string,
    status: boolean,
    classId: string,
  ) => Promise<void>;
  resetStudentAttendance: (
    meetingId: string,
    userId: string,
    classId: string,
  ) => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  meetingsData: [],
  message: null,
  qrToken: null,
  qrError: null,
};

const useMeetingStore = create<MeetingState & MeetingActions>((set, get) => ({
  ...initialState,

  getMeetings: async (classId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await getMeetings(classId);

      if (res.status && res.data) {
        set({ meetingsData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  getQrToken: async (meetingId) => {
    try {
      const res = await getMeetingQrToken(meetingId);

      if (res.status && res.data) {
        set({
          qrToken: {
            meetingId,
            token: res.data.token,
            periodSeconds: res.data.period_seconds,
            expiresAt: Date.now() + res.data.expires_in_ms,
          },
          qrError: null,
        });
      } else {
        set({ qrToken: null, qrError: res.message });
      }
    } catch (error: any) {
      set({ qrToken: null, qrError: error?.message ?? "Terjadi kesalahan" });
    }
  },

  clearQrToken: () => {
    set({ qrToken: null, qrError: null });
  },

  addMeeting: async (body) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const res = await postMeeting(body);

      if (res.status) {
        set({ message: res.message });
        await get().getMeetings(body.classId);
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateMeetingStatus: async (meetingId, status, classId) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const res = await putMeetingStatus(meetingId, { status });

      if (res.status) {
        set({ message: res.message });
        await get().getMeetings(classId);
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateStudentAttendance: async (meetingId, userId, status, classId) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const res = await putStudentAttendance(meetingId, userId, { status });

      if (res.status) {
        set({ message: res.message });
        await get().getMeetings(classId);
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  resetStudentAttendance: async (meetingId, userId, classId) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const res = await deleteStudentAttendance(meetingId, userId);

      if (res.status) {
        set({ message: res.message });
        await get().getMeetings(classId);
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMeetingStore;
