import { getToken } from "@/app/utils/cookie";
import axios from "axios";

const satellite = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20_000,
});

/**
 * Membaca cookie accessToken langsung dari browser.
 *
 * Sebelumnya setiap permintaan memanggil getToken(), sebuah server action,
 * sehingga harus bolak-balik ke server hanya untuk membaca cookie. Tepat
 * setelah login, panggilan itu mengantre di belakang navigasi yang sedang
 * berjalan dan membuat halaman tampak kosong sampai di-refresh.
 *
 * Cookie ini memang terbaca JavaScript karena diset tanpa httpOnly, jadi
 * membacanya di sini tidak menambah risiko apa pun yang belum ada.
 */
const readTokenFromBrowser = (): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/);

  return match ? decodeURIComponent(match[1]) : undefined;
};

satellite.interceptors.request.use(
  async (request) => {
    const token = readTokenFromBrowser() ?? (await getToken());

    if (token) request.headers["Authorization"] = `Bearer ${token}`;

    return request;
  },
  async (error) => Promise.reject(error),
);

satellite.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "An unknown error occurred";
      return Promise.reject({ status: false, message: errorMessage });
    }
    return Promise.reject({
      status: false,
      message: "Network error, please try again!",
    });
  },
);

export default satellite;
