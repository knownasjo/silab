"use server";

import { cookies } from "next/headers";

// Access token diperbarui sedikit sebelum kedaluwarsa, supaya permintaan yang
// sedang berjalan tidak ditolak backend di tengah jalan.
const REFRESH_MARGIN_MS = 30_000;

/** Waktu kedaluwarsa JWT dalam milidetik, atau 0 bila token tidak terbaca. */
function readExpiry(token: string): number {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );

    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

/**
 * Access token yang masih berlaku. Bila cookie-nya sudah habis atau hampir
 * habis, token baru diminta lebih dulu dengan refresh token.
 */
export async function getToken(): Promise<string | undefined> {
  const cookie = await cookies();

  const token = cookie.get("accessToken")?.value;

  if (token && readExpiry(token) - Date.now() > REFRESH_MARGIN_MS) {
    return token;
  }

  return (await refreshAccessToken()) ?? token;
}

/**
 * Menukar refresh token dengan access token baru di backend lalu
 * menyimpannya. Bila backend menolak (sesi lewat 1 hari), semua cookie sesi
 * dihapus supaya pengguna diarahkan ke halaman login.
 */
export async function refreshAccessToken(): Promise<string | undefined> {
  const cookie = await cookies();

  const refreshToken = cookie.get("refreshToken")?.value;

  if (!refreshToken) return undefined;

  let response: Response;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
  } catch {
    // Backend tidak terjangkau: sesi dibiarkan, dicoba lagi pada permintaan
    // berikutnya.
    return undefined;
  }

  if (response.status >= 400 && response.status < 500) {
    await deleteToken();
    return undefined;
  }

  const accessToken = (await response.json().catch(() => null))?.data
    ?.accessToken;

  if (typeof accessToken !== "string") return undefined;

  await setToken(accessToken);
  return accessToken;
}

export async function getUserData(): Promise<{
  role: string;
  fullname: string;
  nim: string;
  email: string;
} | null> {
  const cookie = await cookies();

  const role = cookie.get("role");
  const fullname = cookie.get("fullname");
  const nim = cookie.get("nim");
  const email = cookie.get("email");

  if (role && fullname && email && nim) {
    return {
      role: role.value,
      fullname: fullname.value,
      email: email.value,
      nim: nim.value,
    };
  }

  return null;
}

export async function setToken(token: string): Promise<void> {
  const cookie = await cookies();

  if (token) {
    cookie.set("accessToken", token, {
      expires: new Date(readExpiry(token)),
    });
  }
}

/**
 * Refresh token hanya dibaca di server (lihat refreshAccessToken), jadi
 * cookie-nya httpOnly: JavaScript di halaman tidak bisa membacanya.
 */
export async function setRefreshToken(token: string): Promise<void> {
  const cookie = await cookies();

  if (token) {
    cookie.set("refreshToken", token, {
      expires: new Date(readExpiry(token)),
      httpOnly: true,
      sameSite: "lax",
    });
  }
}

export async function setUserRole(role: string): Promise<void> {
  const cookie = await cookies();

  if (role) {
    cookie.set("role", role);
  }
}

export async function deleteToken(): Promise<void> {
  const cookie = await cookies();

  cookie.delete("accessToken");
  cookie.delete("refreshToken");
  cookie.delete("role");
}
