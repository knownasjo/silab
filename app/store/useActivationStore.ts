import { create } from "zustand";
import { IGetActivationResponseBody } from "../interfaces/activation/activation.interface";
import {
  getAllActivation,
  putUpdatePaymentStatus,
  putUpdateStudentClass,
} from "../services/activation/api";
import { coalesce } from "../utils/coalesce";

type ActivationState = GlobalState & {
  activationData: IGetActivationResponseBody[];
  status: string;
  name: string;
  message: string | null;
};

type ActivationActions = {
  getAllActivations: () => Promise<void>;
  refreshActivations: () => Promise<void>;
  updatePaymentStatus: (
    id: string,
    paymentStatus: boolean,
    classId?: string,
  ) => Promise<void>;
  updateStudentClass: (id: string, classId: string) => Promise<void>;
  setStatusQuery: (query: string | undefined) => void;
  setNameQuery: (query: string) => void;
  reset: () => void;
};

const initialState = {
  isLoading: false,
  error: null,
  activationData: [],
  status: "",
  name: "",
  message: null,
};

const useActivationStore = create<ActivationState & ActivationActions>(
  (set, get) => ({
    ...initialState,

    setStatusQuery: (query) => {
      set({ status: query ?? "" });
    },

    setNameQuery: (query) => {
      set({ name: query });
      get().getAllActivations();
    },

    getAllActivations: async () => {
      const { name } = get();

      set({ isLoading: true, error: null });

      try {
        const res = await getAllActivation(name);

        if (res.data && res.status) {
          set({ activationData: res.data });
        } else {
          set({ error: res.message });
        }
      } catch (error: any) {
        set({ error: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },

    refreshActivations: coalesce(async () => {
      const { name } = get();
      const res = await getAllActivation(name);

      if (get().name === name && res.status && res.data) {
        set({ activationData: res.data });
      }
    }),

    updatePaymentStatus: async (id, paymentStatus, classId) => {
      set({ isLoading: true, error: null, message: null });

      try {
        const res = await putUpdatePaymentStatus(id, paymentStatus, classId);

        if (res.status) {
          set({ message: res.message });
          await get().getAllActivations();
        } else {
          set({ error: res.message });
        }
      } catch (error: any) {
        set({ error: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },

    updateStudentClass: async (id, classId) => {
      set({ isLoading: true, error: null, message: null });

      try {
        const res = await putUpdateStudentClass(id, classId);

        if (res.status) {
          set({ message: res.message });
          await get().getAllActivations();
        } else {
          set({ error: res.message });
        }
      } catch (error: any) {
        set({ error: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },

    reset: () => {
      set({ ...initialState });
    },
  }),
);

export default useActivationStore;
