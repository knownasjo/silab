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
  lecturerPeriodId?: string;
};

type DashboardActions = {
  getDashboardData: (role: string) => Promise<void>;
  refreshDashboardData: (role: string) => Promise<void>;
  getLecturerSummary: (periodId?: string) => Promise<void>;
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

const loadDashboardData = async (role: string) => {
  if (role === "MAHASISWA") {
    const classes = (await getAllClass()).data ?? [];

    return {
      totalSubject: new Set(classes.map((item) => item.subjectId)).size,
      totalClass: classes.length,
    };
  }

  const [subjects, classes, activations] = await Promise.all([
    getAllSubjects(),
    getAllClass(),
    getActivations(),
  ]);
  const allActivations = activations.data ?? [];
  const totalPaidStudent = allActivations.filter(
    (activation) => activation.status,
  ).length;

  return {
    totalSubject: subjects.data?.length ?? 0,
    totalClass: classes.data?.length ?? 0,
    totalActivation: allActivations.length,
    totalPaidStudent,
    totalUnpaidStudent: allActivations.length - totalPaidStudent,
  };
};

type DashboardStore = DashboardState & DashboardActions;

const useDashboardStore = create<DashboardStore>((set, get) => ({
  ...initialState,

  getDashboardData: async (role) => {
    set({ isLoading: true, error: null });

    try {
      set(await loadDashboardData(role));
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshDashboardData: coalesce(async (role: string) =>
    set({ ...(await loadDashboardData(role)), error: null }),
  ),

  getLecturerSummary: async (periodId) => {
    set({
      isLoading: true,
      error: null,
      lecturerPeriodId: periodId,
      ...(periodId !== get().lecturerPeriodId && { lecturerSummary: null }),
    });

    try {
      const res = await getLecturerDashboard(periodId);

      if (get().lecturerPeriodId === periodId)
        set({ lecturerSummary: res.data ?? null });
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshLecturerSummary: coalesce(async () => {
    const periodId = get().lecturerPeriodId;
    const res = await getLecturerDashboard(periodId);

    if (get().lecturerPeriodId === periodId && res.data)
      set({ lecturerSummary: res.data, error: null });
  }),
}));

export default useDashboardStore;
