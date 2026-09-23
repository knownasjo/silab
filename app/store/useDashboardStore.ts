import { create } from "zustand";
import { getActivations, getAllSubjects } from "../services/subject/api";
import { getAllClass } from "../services/class/api";
import { coalesce } from "../utils/coalesce";

type DashboardState = GlobalState & {
  totalSubject: number | null;
  totalClass: number | null;
  totalActivation: number | null;
  totalPaidStudent: number | null;
  totalUnpaidStudent: number | null;
};

type DashboardActions = {
  getDashboardData: () => Promise<void>;
  refreshDashboardData: () => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  totalSubject: null,
  totalClass: null,
  totalActivation: null,
  totalPaidStudent: null,
  totalUnpaidStudent: null,
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
}));

export default useDashboardStore;
