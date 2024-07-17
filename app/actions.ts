import { cookies } from "next/headers";
import { v4 } from "uuid";
import { AUTH_COOKIE_NAME } from "./constants/auth";

async function create() {
  cookies().set(AUTH_COOKIE_NAME, v4(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: Infinity,
  });
}
