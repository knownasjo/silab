import { error } from "console";
import {
  IAddSubjectRequestBody,
  IGetSubjectResponseBody,
  IUpdateSubjectRequestBody,
} from "../interfaces/subject/subject.interface";
import { create } from "zustand";
import {
  addSubject,
  getAllSubjects,
  putSubject,
} from "../services/subject/api";
import { coalesce } from "../utils/coalesce";

type SubjectState = GlobalState & {
  subjectsData: IGetSubjectResponseBody[];
};

type SubjectActions = {
  getAllSubjects: () => Promise<void>;
  refreshAllSubjects: () => Promise<void>;
  addSubject: (body: IAddSubjectRequestBody) => Promise<void>;
  updateSubject: (
    id: string,
    body: IUpdateSubjectRequestBody,
  ) => Promise<{ ok: boolean; message: string }>;
};

const initialState = {
  isLoading: false,
  error: null,
  subjectsData: [],
};

const useSubjectStore = create<SubjectState & SubjectActions>((set, get) => ({
  ...initialState,

  getAllSubjects: async () => {
    set({ isLoading: true });

    try {
      const res = await getAllSubjects();

      if (res.data && res.status) {
        set({ subjectsData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch {
      console.log(get().error);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshAllSubjects: coalesce(async () => {
    const res = await getAllSubjects();

    if (res.data && res.status) set({ subjectsData: res.data });
  }),

  addSubject: async (body) => {
    set({ isLoading: true, error: null });

    try {
      const res = await addSubject(body);

      if (!res.status) {
        set({ error: res.message });
      }
    } catch {
      console.log(get().error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSubject: async (id, body) => {
    try {
      const res = await putSubject(id, body);

      await get().refreshAllSubjects();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },
}));

export default useSubjectStore;
