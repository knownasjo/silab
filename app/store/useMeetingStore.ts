import { create } from "zustand";
import {
  IAddClassMeetingRequestBody,
  IGetAllClassMeetingResponseBody,
} from "../interfaces/meeting/meeting.interface";
import {
  deleteStudentAttendance,
  getMeetings,
  postMeeting,
  putMeetingStatus,
  putStudentAttendance,
} from "../services/meeting/api";

type MeetingState = GlobalState & {
  meetingsData: IGetAllClassMeetingResponseBody[];
  message: string | null;
};

type MeetingActions = {
  getMeetings: (classId: string) => Promise<void>;
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
};

const useMeetingStore = create<MeetingState & MeetingActions>((set, get) => ({
  ...initialState,

  getMeetings: async (classId) => {
    set({ isLoading: true });

    try {
      const res = await getMeetings(classId);

      if (res.status && res.data) {
        set({ meetingsData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch {
      console.log(get().error);
    } finally {
      set({ isLoading: false });
    }
  },

  addMeeting: async (body) => {
    set({ isLoading: true, error: null });

    try {
      const res = await postMeeting(body);

      if (res.status) {
        set({ message: res.message });
      } else {
        set({ error: res.message });
      }
    } catch {
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
      set({ error: error?.response?.data?.message ?? "Terjadi kesalahan" });
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
      set({ error: error?.response?.data?.message ?? "Terjadi kesalahan" });
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
      set({ error: error?.response?.data?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMeetingStore;
