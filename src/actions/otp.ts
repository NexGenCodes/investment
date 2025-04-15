"use server";

import { signIn } from "@/lib/auth";
import { getFromCache, deleteFromCache } from "@/lib/cache";
import { getCookie, deleteCookie } from "@/lib/cookies";
import { CreateUser } from "@/lib/db";
import { Hash } from "@/lib/password";
import { otpSchema, SignUpType } from "@/types/authSchema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Error = {
  errors?: { otp?: string[] };
  message?: string;
};

type FormState = Error | undefined;

type SessionData = {
  userData: SignUpType;
  otp: string;
  userAgent: string;
};

export default async function OtpAction(state: FormState, formData: FormData) {
  const validatedFields = await otpSchema.safeParseAsync({
    otp: formData.get("otp"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const sessionId = await getCookie("otp_session");
  if (!sessionId) {
    return { message: "Session not found. Please try signing up again." };
  }

  const failedAttemptsKey = `failed_attempts_${sessionId}`;
  const failedAttempts = getFromCache<number>(failedAttemptsKey) || 0;
  if (failedAttempts >= 10) {
    deleteFromCache(sessionId);
    deleteFromCache(failedAttemptsKey);
    deleteCookie("otp_session");
    redirect("/auth/register");
  }


  const data = getFromCache<SessionData>(sessionId);
  if (!data) {
    return { message: "Invalid" };
  }


  if (data.otp !== validatedFields.data.otp) {
    return { message: "expired OTP" }
  }

  const userAgent = (await headers()).get("user-agent") || "unknown";
  if (data.userAgent !== userAgent) {
    deleteFromCache(sessionId);
    deleteFromCache(failedAttemptsKey);
    await deleteCookie("otp_session");
    return { message: "Session validation failed. Please try signing up again." };
  }

  const hashedPassword = await Hash(data.userData.password);
  const user = await CreateUser({
    email: data.userData.email,
    password: hashedPassword,
    firstName: data.userData.firstName,
    lastName: data.userData.lastName,
    referralCode: data.userData.referralCode,
  });
  if (!user) {
    return { message: "An error occurred while creating your account." };
  }

  deleteFromCache(sessionId);
  deleteFromCache(failedAttemptsKey);
  deleteFromCache(`last_otp_${sessionId}`);
  await deleteCookie("otp_session");


  await signIn("credentials", {
    redirect: true,
    redirectTo: "/dashboard",
    ...user,
  });

}