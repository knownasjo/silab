import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    // Cookie accessToken hilang setiap 15 menit, tetapi sesi masih berlaku
    // selama refresh token ada; token baru diminta pada permintaan berikutnya.
    const hasSession = Boolean(
      req.cookies.get("accessToken")?.value ||
        req.cookies.get("refreshToken")?.value,
    );

    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthPage = pathname === "/auth";

    if (isProtectedRoute && !hasSession) {
      if (!isAuthPage) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }

    if (isAuthPage && hasSession) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
