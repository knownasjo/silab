import {
  IAddSubjectRequestBody,
  IGetSubjectResponseBody,
  IUpdateSubjectRequestBody,
} from "../interfaces/subject/subject.interface";
import { create } from "zustand";
import {
  addSubject,
  deleteSubject,
  getAllSubjects,
  putSubject,
} from "../services/subject/api";
import { coalesce } from "../utils/coalesce";

type SubjectState = GlobalState & {
  subjectsData: IGetSubjectResponseBody[];
  isLoaded: boolean;
  loadCount: number;
};

type SubjectActions = {
  getAllSubjects: () => Promise<void>;
  refreshAllSubjects: () => Promise<void>;
  addSubject: (
    body: IAddSubjectRequestBody,
  ) => Promise<{ ok: boolean; message: string }>;
  updateSubject: (
    id: string,
    body: IUpdateSubjectRequestBody,
  ) => Promise<{ ok: boolean; message: string }>;
  deleteSubject: (id: string) => Promise<{ ok: boolean; message: string }>;
};

const initialState = {
  isLoading: false,
  error: null,
  subjectsData: [],
  isLoaded: false,
  loadCount: 0,
};

const useSubjectStore = create<SubjectState & SubjectActions>((set, get) => ({
  ...initialState,

  getAllSubjects: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await getAllSubjects();

      if (res.data && res.status) {
        set({
          subjectsData: res.data,
          isLoaded: true,
          loadCount: get().loadCount + 1,
        });
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshAllSubjects: coalesce(async () => {
    const res = await getAllSubjects();

    if (res.data && res.status)
      set({
        subjectsData: res.data,
        error: null,
        isLoaded: true,
        loadCount: get().loadCount + 1,
      });
  }),

  addSubject: async (body) => {
    try {
      const res = await addSubject(body);

      await get().refreshAllSubjects();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
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

  deleteSubject: async (id) => {
    try {
      const res = await deleteSubject(id);

      await get().refreshAllSubjects();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },
}));

export default useSubjectStore;
