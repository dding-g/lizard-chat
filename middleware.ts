import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "./app/constants/auth";
import { v4 } from "uuid";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.cookies.set(AUTH_COOKIE_NAME, v4(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: Infinity,
  });

  return response;
}
