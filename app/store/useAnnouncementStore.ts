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

type AnnouncementState = GlobalState & {
  announcementsData: IGetAllAnnouncementsResponseBody[];
  announcementData: IGetAllAnnouncementsResponseBody | null;
  message: string | null;
};

type AnnouncementActions = {
  addAnnouncement: (body: IAddAnnouncementRequestBody) => Promise<boolean>;
  updateAnnouncement: (
    id: string,
    body: IAddAnnouncementRequestBody,
  ) => Promise<boolean>;
  removeAnnouncement: (id: string) => Promise<boolean>;
  getAllAnnouncements: () => Promise<void>;
  getAnnouncementById: (id: string) => Promise<void>;
};

const initialState = {
  isLoading: false,
  error: null,
  announcementsData: [],
  announcementData: null,
  message: null,
};

const useAnnouncementStore = create<AnnouncementState & AnnouncementActions>(
  (set, get) => ({
    ...initialState,

    addAnnouncement: async (body) => {
      set({ isLoading: true, error: null, message: null });

      try {
        const res = await postAnnouncement(body);

        if (res.status) {
          set({ message: res.message });
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

    updateAnnouncement: async (id, body) => {
      set({ isLoading: true, error: null, message: null });

      try {
        const res = await putAnnouncement(id, body);

        if (res.status) {
          set({ message: res.message });
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
      set({ isLoading: true, error: null, message: null });

      try {
        const res = await deleteAnnouncement(id);

        if (res.status) {
          set({ message: res.message });
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
      set({ isLoading: true, error: null });

      try {
        const res = await getAllAnnouncements();

        if (res.status && res.data) {
          set({ announcementsData: res.data });
        } else {
          set({ error: res.message });
        }
      } catch (error: any) {
        set({ error: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },

    getAnnouncementById: async (id) => {
      set({ isLoading: true, error: null });

      try {
        const res = await getAnnouncementById(id);

        if (res.status && res.data) {
          set({ announcementData: res.data });
        } else {
          set({ error: res.message });
        }
      } catch (error: any) {
        set({ error: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);

export default useAnnouncementStore;
