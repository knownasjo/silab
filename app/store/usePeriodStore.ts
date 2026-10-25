import { create } from "zustand";
import {
  AcademicTerm,
  IPeriodResponseBody,
  IStartPeriodRequestBody,
} from "../interfaces/period/period.interface";
import { getPeriods, postPeriod } from "../services/period/api";
import { coalesce } from "../utils/coalesce";

type PeriodState = GlobalState & {
  periodsData: IPeriodResponseBody[];
  isLoaded: boolean;
  selectedPeriodId: string | null;
};

type PeriodResult = { ok: boolean; message: string };

type PeriodActions = {
  getPeriods: () => Promise<void>;
  refreshPeriods: () => Promise<void>;
  selectPeriod: (id: string | null) => void;
  startPeriod: (body: IStartPeriodRequestBody) => Promise<PeriodResult>;
};

const initialState = {
  isLoading: false,
  error: null,
  periodsData: [],
  isLoaded: false,
  selectedPeriodId: null,
};

export const TERM_LABELS: Record<AcademicTerm, string> = {
  GANJIL: "Ganjil",
  GENAP: "Genap",
};

export const nextPeriodOf = (
  period: IPeriodResponseBody,
): IStartPeriodRequestBody => {
  if (period.term === "GANJIL") return { year: period.year, term: "GENAP" };

  const start = Number(period.year.split("/")[1]);

  return { year: `${start}/${start + 1}`, term: "GANJIL" };
};

export const nextPeriodName = (period: IPeriodResponseBody) => {
  const { year, term } = nextPeriodOf(period);

  return `${year} ${TERM_LABELS[term]}`;
};

const keepSelection = (
  periods: IPeriodResponseBody[],
  selectedPeriodId: string | null,
) =>
  periods.some((period) => period.id === selectedPeriodId && !period.isActive)
    ? selectedPeriodId
    : null;

const usePeriodStore = create<PeriodState & PeriodActions>((set, get) => ({
  ...initialState,

  getPeriods: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await getPeriods();
      const periodsData = res.data ?? [];

      set({
        periodsData,
        isLoaded: true,
        selectedPeriodId: keepSelection(periodsData, get().selectedPeriodId),
      });
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshPeriods: coalesce(async () => {
    const res = await getPeriods();

    if (res.data)
      set({
        periodsData: res.data,
        isLoaded: true,
        error: null,
        selectedPeriodId: keepSelection(res.data, get().selectedPeriodId),
      });
  }),

  selectPeriod: (id) => set({ selectedPeriodId: id }),

  startPeriod: async (body) => {
    try {
      const res = await postPeriod(body);

      set({ selectedPeriodId: null });
      await get().refreshPeriods();
      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },
}));

export const usePeriodView = () => {
  const { periodsData, selectedPeriodId } = usePeriodStore();
  const activePeriod = periodsData.find((period) => period.isActive) ?? null;
  const viewedPeriod =
    periodsData.find((period) => period.id === selectedPeriodId) ??
    activePeriod;

  return {
    activePeriod,
    viewedPeriod,
    viewedPeriodId: selectedPeriodId ?? undefined,
    isArchive: !!viewedPeriod && !viewedPeriod.isActive,
  };
};

export default usePeriodStore;
