import { create } from "zustand";
import {
  IAddSessionRequestBody,
  ISessionResponseBody,
  IUpdateSessionRequestBody,
} from "../interfaces/session/session.interface";
import {
  deleteSession,
  getSessions,
  postSession,
  putSession,
} from "../services/session/api";
import { coalesce } from "../utils/coalesce";

type SessionState = GlobalState & {
  sessionsData: ISessionResponseBody[];
  isLoaded: boolean;
};

type SessionResult = { ok: boolean; message: string };

type SessionActions = {
  getSessions: () => Promise<void>;
  refreshSessions: () => Promise<void>;
  addSession: (body: IAddSessionRequestBody) => Promise<SessionResult>;
  updateSession: (
    id: string,
    body: IUpdateSessionRequestBody,
  ) => Promise<SessionResult>;
  removeSession: (id: string) => Promise<SessionResult>;
};

const initialState = {
  isLoading: false,
  error: null,
  sessionsData: [],
  isLoaded: false,
};

const failure = (error: any): SessionResult => ({
  ok: false,
  message: error?.message ?? "Terjadi kesalahan",
});

const useSessionStore = create<SessionState & SessionActions>((set, get) => ({
  ...initialState,

  getSessions: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await getSessions();

      set({ sessionsData: res.data ?? [], isLoaded: true });
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshSessions: coalesce(async () => {
    const res = await getSessions();

    if (res.data) set({ sessionsData: res.data, isLoaded: true });
  }),

  addSession: async (body) => {
    try {
      const res = await postSession(body);

      await get().refreshSessions();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return failure(error);
    }
  },

  updateSession: async (id, body) => {
    try {
      const res = await putSession(id, body);

      await get().refreshSessions();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return failure(error);
    }
  },

  removeSession: async (id) => {
    try {
      const res = await deleteSession(id);

      await get().refreshSessions();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return failure(error);
    }
  },
}));

export default useSessionStore;
