import { create } from "zustand";
import {
  IActivityQuery,
  IActivityResponseBody,
} from "../interfaces/activity/activity.interface";
import { getActivities } from "../services/activity/api";

type ActivityState = GlobalState & {
  activitiesData: IActivityResponseBody[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  isLoaded: boolean;
  loadError: string | null;
};

type ActivityActions = {
  getActivities: (query: IActivityQuery) => Promise<void>;
  reset: () => void;
};

const initialState = {
  isLoading: false,
  error: null,
  activitiesData: [],
  page: 1,
  pageSize: 50,
  total: 0,
  totalPages: 0,
  isLoaded: false,
  loadError: null,
};

let latestRequest = 0;

const useActivityStore = create<ActivityState & ActivityActions>((set) => ({
  ...initialState,

  getActivities: async (query) => {
    const request = ++latestRequest;

    set({ isLoading: true, loadError: null });

    try {
      const res = await getActivities(query);

      if (request !== latestRequest) return;

      if (res.status && res.data) {
        set({
          activitiesData: res.data.items,
          page: res.data.page,
          pageSize: res.data.pageSize,
          total: res.data.total,
          totalPages: res.data.totalPages,
          isLoaded: true,
        });
      } else {
        set({ activitiesData: [], total: 0, loadError: res.message });
      }
    } catch (error: any) {
      if (request === latestRequest)
        set({
          activitiesData: [],
          total: 0,
          loadError: error?.message ?? "Terjadi kesalahan",
        });
    } finally {
      if (request === latestRequest) set({ isLoading: false });
    }
  },

  reset: () => {
    latestRequest += 1;
    set({ ...initialState });
  },
}));

export default useActivityStore;
