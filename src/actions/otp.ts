"use server";

import { AppError } from "@/lib/appError";
import { signIn } from "@/lib/auth";
import { getFromCache, deleteFromCache, setToCache } from "@/lib/cache";
import { CreateUser } from "@/lib/db";
import { decrypt } from "@/lib/encrypt";
import { Hash } from "@/lib/password";
import { rateLimit } from "@/lib/rateLimit";
import { otpSchema, SignUpType } from "@/types/authSchema";
import { headers } from "next/headers";

type FormState =
  | {
      error?: string;
      errors?: { otp?: string[] };
      success?: boolean;
    }
  | undefined;

type SessionData = {
  iv: string;
  encrypted: string;
};

type EncryptedData = {
  userData: SignUpType;
  otp: string;
  userAgent: string;
};

export default async function OtpAction(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = await otpSchema.safeParseAsync({
    otp: formData.get("otp"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const sessionId = (await headers()).get("X-Session-Id");
  if (!sessionId) {
    return { error: "Session not found. Please try signing up again." };
  }

  // Rate limit OTP attempts (5 attempts/minute/sessionId)
  const rateLimitKey = `rate:otp:${sessionId}`;
  try {
    await rateLimit(rateLimitKey, 5, 60);
  } catch (error) {
    if (error instanceof AppError) {
      return { error: "Too many attempts. Please try again later." };
    }
    throw error;
  }

  const sessionData = getFromCache<SessionData>(`signup:${sessionId}`);
  if (!sessionData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
    };
  }

  // Decrypt session data
  let decryptedData: EncryptedData;
  try {
    decryptedData = decrypt(
      sessionData.encrypted,
      sessionData.iv
    ) as EncryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return { error: "Invalid session data. Please try signing up again." };
  }

  // Validate OTP
  if (decryptedData.otp !== validatedFields.data.otp) {
    // Increment failed attempts
    const failedAttemptsKey = `failed_attempts_${sessionId}`;
    const failedAttempts = (getFromCache<number>(failedAttemptsKey) || 0) + 1;
    setToCache(failedAttemptsKey, failedAttempts, 300); // 5-minute TTL
    if (failedAttempts >= 5) {
      deleteFromCache(`signup:${sessionId}`);
      deleteFromCache(failedAttemptsKey);
      deleteFromCache(`last_otp_${sessionId}`);
      return {
        error: "Too many incorrect attempts. Please try signing up again.",
      };
    }
    return { error: "Invalid OTP. Please try again." };
  }

  // Optional: Relaxed user agent validation
  const userAgent = (await headers()).get("user-agent") || "unknown";
  if (decryptedData.userAgent !== userAgent) {
    console.warn("User agent mismatch:", {
      stored: decryptedData.userAgent,
      current: userAgent,
    });
    // Optionally skip this check or log for monitoring
  }

  // Create user
  const hashedPassword = await Hash(decryptedData.userData.password);
  const user = await CreateUser({
    email: decryptedData.userData.email,
    password: hashedPassword,
    firstName: decryptedData.userData.firstName,
    lastName: decryptedData.userData.lastName,
    nationality: decryptedData.userData.nationality,
    referralCode: decryptedData.userData.referralCode,
  });

  if (!user) {
    // Clean up cache on failure
    deleteFromCache(`signup:${sessionId}`);
    deleteFromCache(`failed_attempts_${sessionId}`);
    deleteFromCache(`last_otp_${sessionId}`);
    return { error: "An error occurred while creating your account." };
  }

  // Clean up cache
  deleteFromCache(`signup:${sessionId}`);
  deleteFromCache(`failed_attempts_${sessionId}`);
  deleteFromCache(`last_otp_${sessionId}`);

  await signIn("credentials", {
    redirect: true,
    redirectTo: "/dashboard",
    ...user,
  });
}
