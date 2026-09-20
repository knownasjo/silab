import { create } from "zustand";
import {
  ILoginRequestBody,
  IMeResponseBody,
} from "../interfaces/auth/auth.interface";
import { getMe, postLogin } from "../services/auth/api";
import { deleteToken, setToken } from "../utils/cookie";

type AuthState = GlobalState & {
  userData: IMeResponseBody | null;
};

type AuthActions = {
  login: (body: ILoginRequestBody) => Promise<boolean>;
  me: () => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
};

const initialAuthState = {
  isLoading: false,
  error: null,
  userData: null,
};

const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialAuthState,

  login: async (body) => {
    set({ isLoading: true, error: null });

    try {
      const res = await postLogin(body);

      if (res.status && res.data) {
        await setToken(res.data.accessToken);
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

  logout: async () => {
    await deleteToken();
    set({ ...initialAuthState });
  },

  me: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await getMe();

      if (res.status && res.data) {
        set({ userData: res.data });
      } else {
        set({ error: res.message });
      }
    } catch (error: any) {
      set({ error: error?.message ?? "Terjadi kesalahan" });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: async () => {
    set({ ...initialAuthState });
  },
}));

export default useAuthStore;
