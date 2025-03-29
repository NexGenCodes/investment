import { cookies } from "next/headers";

/** ✅ Set a secure HTTP-only cookie */
export async function setCookie(
  name: string,
  value: string,
  maxAge: number = 80
) {
  const cookie = await cookies();
  cookie.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge,
  });
  return true;
}

/** ✅ Get a cookie */
export async function getCookie(name: string) {
  const cookie = await cookies();
  return cookie.get(name)?.value || null;
}

/** ✅ Delete a cookie */
export async function deleteCookie(name: string) {
  const cookie = await cookies();
  cookie.delete(name);
  return true;
}
