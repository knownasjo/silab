import { create } from "zustand";
import {
  IAddAnnouncementRequestBody,
  IGetAllAnnouncementsResponseBody,
} from "../interfaces/announcement/announcement.interface";
import {
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  postAnnouncement,
  putAnnouncement,
} from "../services/announcement/api";
import { coalesce } from "../utils/coalesce";

type AnnouncementState = GlobalState & {
  announcementsData: IGetAllAnnouncementsResponseBody[];
  announcementData: IGetAllAnnouncementsResponseBody | null;
  loadError: string | null;
};

type AnnouncementActions = {
  addAnnouncement: (
    body: IAddAnnouncementRequestBody,
  ) => Promise<{ ok: boolean; message: string }>;
  updateAnnouncement: (
    id: string,
    body: IAddAnnouncementRequestBody,
  ) => Promise<boolean>;
  removeAnnouncement: (id: string) => Promise<boolean>;
  getAllAnnouncements: () => Promise<void>;
  getAnnouncementById: (id: string) => Promise<void>;
  refreshAllAnnouncements: () => Promise<void>;
  refreshAnnouncementById: (id: string) => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  announcementsData: [],
  announcementData: null,
  loadError: null,
};

const useAnnouncementStore = create<AnnouncementState & AnnouncementActions>(
  (set, get) => ({
    ...initialState,

    addAnnouncement: async (body) => {
      try {
        const res = await postAnnouncement(body);

        return { ok: res.status, message: res.message };
      } catch (error: any) {
        return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
      }
    },

    updateAnnouncement: async (id, body) => {
      set({ isLoading: true, error: null });

      try {
        const res = await putAnnouncement(id, body);

        if (res.status) {
          await get().getAllAnnouncements();
          return true;
        }

        set({ error: res.message });
        return false;
      } catch (error: any) {
        set({ error: error?.message ?? "Terjadi kesalahan" });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    removeAnnouncement: async (id) => {
      set({ isLoading: true, error: null });

      try {
        const res = await deleteAnnouncement(id);

        if (res.status) {
          await get().getAllAnnouncements();
          return true;
        }

        set({ error: res.message });
        return false;
      } catch (error: any) {
        set({ error: error?.message ?? "Terjadi kesalahan" });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    getAllAnnouncements: async () => {
      set({ isLoading: true, loadError: null });

      try {
        const res = await getAllAnnouncements();

        if (res.status && res.data) {
          set({ announcementsData: res.data });
        } else {
          set({ loadError: res.message });
        }
      } catch (error: any) {
        set({ loadError: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },

    refreshAllAnnouncements: coalesce(async () => {
      const res = await getAllAnnouncements();

      if (res.status && res.data)
        set({ announcementsData: res.data, loadError: null });
    }),

    refreshAnnouncementById: coalesce(async (id: string) => {
      const res = await getAnnouncementById(id);
      const current = get().announcementData;

      if ((!current || current.id === id) && res.status && res.data) {
        set({ announcementData: res.data, loadError: null });
      }
    }),

    getAnnouncementById: async (id) => {
      set({ isLoading: true, loadError: null, announcementData: null });

      try {
        const res = await getAnnouncementById(id);

        if (res.status && res.data) {
          set({ announcementData: res.data });
        } else {
          set({ loadError: res.message });
        }
      } catch (error: any) {
        set({ loadError: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);

export default useAnnouncementStore;
