import { cookies } from "next/headers";

export async function setCookie(
  name: string,
  value: string,
  maxAge: number = 300
) {
  const cookie = await cookies();
  cookie.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
  });
  return true;
}

export async function getCookie(name: string) {
  const cookie = await cookies();
  return cookie.get(name)?.value || null;
}

export async function deleteCookie(name: string) {
  const cookie = await cookies();
  cookie.delete(name);
  return true;
}
