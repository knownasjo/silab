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

      if (res.status && res.data) set({ collaboratorsData: res.data });
    }),

    getClassCollaborators: async (id) => {
      set({ isLoading: true, error: null });

      try {
        const res = await getClassCollaborators(id);

        if (res.status && res.data) {
          set({ collaboratorsData: res.data });
        } else {
          set({ error: res.message });
        }
      } catch {
        console.log(get().error);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);

export default useCollaboratorStore;
