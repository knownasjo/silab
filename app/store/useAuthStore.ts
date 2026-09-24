import { create } from "zustand";
import {
  ILoginRequestBody,
  IMeResponseBody,
} from "../interfaces/auth/auth.interface";
import { getMe, postLogin } from "../services/auth/api";
import { getAllClass } from "../services/class/api";
import { deleteToken, setRefreshToken, setToken } from "../utils/cookie";

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
        const { accessToken, refreshToken } = res.data;
        const me = await getMe(accessToken);

        if (me.data?.role === "MAHASISWA") {
          const assisted = await getAllClass(accessToken);

          if (!assisted.data?.length) {
            set({ error: "Web hanya untuk laboran, dosen, dan asisten." });
            return false;
          }
        }

        await setToken(accessToken);
        await setRefreshToken(refreshToken);
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
