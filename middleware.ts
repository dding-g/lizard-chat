import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "./app/constants/auth";
import { v4 } from "uuid";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!authCookie) {
    const res = NextResponse.redirect(request.url);
    res.cookies.set(AUTH_COOKIE_NAME, v4(), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: Infinity,
    });
    return res;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest).*)",
  ],
};
