import { create } from "zustand";
import {
  IAddClassRequestBody,
  IGetClassByIdResponseBody,
  IGetClassResponseBody,
  IUpdateClassRequestBody,
} from "../interfaces/class/class.interface";
import {
  deleteClass,
  getAllClass,
  getClassById,
  postClass,
  putClass,
} from "../services/class/api";
import { coalesce } from "../utils/coalesce";

type ClassState = GlobalState & {
  classesData: IGetClassResponseBody[];
  classData?: IGetClassByIdResponseBody | null;
  classNotice: string | null;
};

type ClassResult = { ok: boolean; message: string };

type ClassActions = {
  getAllClass: () => Promise<void>;
  getClassById: (id: string) => Promise<void>;
  refreshAllClass: () => Promise<void>;
  refreshClassById: (id: string) => Promise<void>;
  addClass: (body: IAddClassRequestBody) => Promise<ClassResult>;
  updateClass: (
    id: string,
    body: IUpdateClassRequestBody,
  ) => Promise<ClassResult>;
  removeClass: (id: string) => Promise<ClassResult>;
  clearClassNotice: () => void;
};

const initialState = {
  isLoading: false,
  error: null,
  classesData: [],
  classData: null,
  classNotice: null,
};

const useClassStore = create<ClassState & ClassActions>((set, get) => ({
  ...initialState,

  getAllClass: async () => {
    set({ isLoading: true });

    try {
      const res = await getAllClass();

      if (res.status && res.data) {
        set({ classesData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch {
      console.log(get().error);
    } finally {
      set({ isLoading: false });
    }
  },

  getClassById: async (id: string) => {
    set({ isLoading: true, error: null, classData: null });

    try {
      const res = await getClassById(id);

      if (res.status && res.data) {
        set({ classData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshAllClass: coalesce(async () => {
    const res = await getAllClass();

    if (res.status && res.data) set({ classesData: res.data });
  }),

  refreshClassById: coalesce(async (id: string) => {
    const res = await getClassById(id);

    if (get().classData?.id === id && res.status && res.data) {
      set({ classData: res.data });
    }
  }),

  addClass: async (body) => {
    try {
      const res = await postClass(body);

      await get().refreshAllClass();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },

  updateClass: async (id, body) => {
    try {
      const res = await putClass(id, body);

      await get().refreshClassById(id);
      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },

  removeClass: async (id) => {
    try {
      const res = await deleteClass(id);

      set((state) => ({
        classesData: state.classesData.filter(
          (subjectClass) => subjectClass.id !== id,
        ),
        classNotice: res.message,
      }));
      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },

  clearClassNotice: () => set({ classNotice: null }),
}));

export default useClassStore;
