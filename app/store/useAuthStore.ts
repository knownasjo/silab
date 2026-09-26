import { create } from "zustand";
import {
  IChangePasswordRequestBody,
  ILoginRequestBody,
  IMeResponseBody,
} from "../interfaces/auth/auth.interface";
import {
  changeMyPassword,
  getMe,
  postLogin,
  updateMe,
} from "../services/auth/api";
import { getAllClass } from "../services/class/api";
import { deleteToken, setRefreshToken, setToken } from "../utils/cookie";

type AuthState = GlobalState & {
  userData: IMeResponseBody | null;
};

type AccountFeedback = { ok: boolean; message: string };

type AuthActions = {
  login: (body: ILoginRequestBody) => Promise<boolean>;
  me: () => Promise<void>;
  updateProfile: (fullname: string) => Promise<AccountFeedback>;
  changePassword: (
    body: IChangePasswordRequestBody,
  ) => Promise<AccountFeedback>;
  logout: () => Promise<void>;
  reset: () => void;
};

const initialAuthState = {
  isLoading: false,
  error: null,
  userData: null,
};

const useAuthStore = create<AuthState & AuthActions>((set) => ({
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

  updateProfile: async (fullname) => {
    try {
      const res = await updateMe(fullname);

      if (res.data) set({ userData: res.data });

      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },

  changePassword: async (body) => {
    try {
      const res = await changeMyPassword(body);

      if (res.data) {
        await setToken(res.data.accessToken);
        await setRefreshToken(res.data.refreshToken);
      }

      return { ok: true, message: res.message };
    } catch (error: any) {
      return { ok: false, message: error?.message ?? "Terjadi kesalahan" };
    }
  },

  reset: async () => {
    set({ ...initialAuthState });
  },
}));

export default useAuthStore;
