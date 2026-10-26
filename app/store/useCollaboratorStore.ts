import { create } from "zustand";
import {
  IAddCollaboratorRequestBody,
  IGetCollaboratorsResponseBody,
} from "../interfaces/collaborator/collaborator.interface";
import {
  deleteCollaborator,
  getClassCollaborators,
  postCollaborators,
} from "../services/collaborator/api";
import { coalesce } from "../utils/coalesce";

type CollaboratorState = GlobalState & {
  collaboratorsData: IGetCollaboratorsResponseBody[];
  collaboratorsClassId: string | null;
  isLoaded: boolean;
  loadError: string | null;
};

type CollaboratorResult = { ok: boolean; message: string };

type CollaboratorActions = {
  getClassCollaborators: (id: string) => Promise<void>;
  refreshClassCollaborators: (id: string) => Promise<void>;
  addClassCollaborators: (
    body: IAddCollaboratorRequestBody,
  ) => Promise<CollaboratorResult>;
  removeClassCollaborator: (
    classId: string,
    userId: string,
  ) => Promise<CollaboratorResult>;
};

const initialState = {
  isLoading: false,
  error: null,
  collaboratorsData: [],
  collaboratorsClassId: null,
  isLoaded: false,
  loadError: null,
};

const useCollaboratorStore = create<CollaboratorState & CollaboratorActions>(
  (set, get) => ({
    ...initialState,

    addClassCollaborators: async (body) => {
      set({ isLoading: true, error: null });

      try {
        const res = await postCollaborators(body);

        await get().refreshClassCollaborators(body.classId);
        return { ok: res.status, message: res.message };
      } catch (error: any) {
        const message = error?.message ?? "Terjadi kesalahan";

        set({ error: message });
        return { ok: false, message };
      } finally {
        set({ isLoading: false });
      }
    },

    removeClassCollaborator: async (classId, userId) => {
      set({ isLoading: true, error: null });

      try {
        const res = await deleteCollaborator(classId, userId);

        await get().refreshClassCollaborators(classId);
        return { ok: res.status, message: res.message };
      } catch (error: any) {
        const message = error?.message ?? "Terjadi kesalahan";

        set({ error: message });
        return { ok: false, message };
      } finally {
        set({ isLoading: false });
      }
    },

    refreshClassCollaborators: coalesce(async (id: string) => {
      const res = await getClassCollaborators(id);

      if (get().collaboratorsClassId === id && res.status && res.data)
        set({ collaboratorsData: res.data, isLoaded: true, loadError: null });
    }),

    getClassCollaborators: async (id) => {
      if (id !== get().collaboratorsClassId)
        set({ collaboratorsData: [], isLoaded: false });
      set({
        isLoading: true,
        error: null,
        loadError: null,
        collaboratorsClassId: id,
      });

      try {
        const res = await getClassCollaborators(id);

        if (get().collaboratorsClassId !== id) return;

        if (res.status && res.data) {
          set({ collaboratorsData: res.data, isLoaded: true });
        } else {
          set({ loadError: res.message });
        }
      } catch (error: any) {
        if (get().collaboratorsClassId === id)
          set({ loadError: error?.message ?? "Terjadi kesalahan" });
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);

export default useCollaboratorStore;
