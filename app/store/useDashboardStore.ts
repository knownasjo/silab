import { create } from "zustand";
import { getActivations, getAllSubjects } from "../services/subject/api";
import { getAllClass } from "../services/class/api";
import { getLecturerDashboard } from "../services/dashboard/api";
import { ILecturerDashboardResponseBody } from "../interfaces/dashboard/dashboard.interface";
import { coalesce } from "../utils/coalesce";

type DashboardState = GlobalState & {
  totalSubject: number | null;
  totalClass: number | null;
  totalActivation: number | null;
  totalPaidStudent: number | null;
  totalUnpaidStudent: number | null;
  lecturerSummary: ILecturerDashboardResponseBody | null;
};

type DashboardActions = {
  getDashboardData: () => Promise<void>;
  refreshDashboardData: () => Promise<void>;
  getLecturerSummary: () => Promise<void>;
  refreshLecturerSummary: () => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  totalSubject: null,
  totalClass: null,
  totalActivation: null,
  totalPaidStudent: null,
  totalUnpaidStudent: null,
  lecturerSummary: null,
};

const loadDashboardData = async () => {
  const [subjects, classes, allActivations, paid, unpaid] = await Promise.all([
    getAllSubjects(),
    getAllClass(),
    getActivations(),
    getActivations("true"),
    getActivations("false"),
  ]);

  return {
    totalSubject: subjects.data?.length ?? 0,
    totalClass: classes.data?.length ?? 0,
    totalActivation: allActivations.data?.length ?? 0,
    totalPaidStudent: paid.data?.length ?? 0,
    totalUnpaidStudent: unpaid.data?.length ?? 0,
  };
};

const useDashboardStore = create<DashboardState & DashboardActions>((set) => ({
  ...initialState,

  getDashboardData: async () => {
    set({ isLoading: true, error: null });

    try {
      set(await loadDashboardData());
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshDashboardData: coalesce(async () => set(await loadDashboardData())),

  getLecturerSummary: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await getLecturerDashboard();

      set({ lecturerSummary: res.data ?? null });
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshLecturerSummary: coalesce(async () => {
    const res = await getLecturerDashboard();

    if (res.data) set({ lecturerSummary: res.data });
  }),
}));

export default useDashboardStore;
