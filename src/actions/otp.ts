"use server";

import { OTP_TTL, RATE_LIMIT } from "@/constants/globals";
import { signIn } from "@/lib/auth";
import { getFromCache, deleteFromCache, setToCache } from "@/lib/cache";
import { CreateUser } from "@/lib/db";
import { decrypt } from "@/lib/encrypt";
import { rateLimit } from "@/lib/rateLimit";
import { otpSchema, SignUpType } from "@/types/authSchema";
import { headers } from "next/headers";

type FormState =
  | {
      error?: string;
      errors?: { otp?: string[]; iv?: string[]; encrypted?: string[] };
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

export default async function OtpAction(_State: FormState, formData: FormData) {
  const validatedFields = await otpSchema.safeParseAsync({
    otp: formData.get("otp"),
    iv: formData.get("iv"),
    encrypted: formData.get("encrypted"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: undefined,
    };
  }
  const { otp, iv, encrypted } = validatedFields.data;

  // decrypt
  const sessionId = await decrypt<string>(encrypted, iv);
  if (!sessionId) {
    return {
      errors: undefined,
      error: "invalid token failed to decrypt",
    };
  }

  // Rate limit OTP attempts
  const rateLimitKey = `rate:otp:${sessionId}`;
  const isRateLimited = await rateLimit(rateLimitKey, 5, RATE_LIMIT);
  if (!isRateLimited) {
    return {
      error: "Too many attempts. Please try again later.",
      errors: undefined,
    };
  }

  // Retrieve session data from cache
  const sessionData = getFromCache<SessionData>(`signup:${sessionId}`);
  if (!sessionData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
      errors: undefined,
    };
  }

  // Decrypt session data
  const decryptedData = await decrypt<EncryptedData>(
    sessionData.encrypted,
    sessionData.iv
  );
  if (!decryptedData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
      errors: undefined,
    };
  }

  // Validate OTP
  if (decryptedData.otp !== otp) {
    const failedAttemptsKey = `failed_attempts_${sessionId}`;
    const failedAttempts = (getFromCache<number>(failedAttemptsKey) || 0) + 1;
    setToCache(failedAttemptsKey, failedAttempts, OTP_TTL); // 5-minute TTL

    if (failedAttempts >= 5) {
      cleanUpCache(sessionId as string, failedAttemptsKey);
      return {
        error: "Too many incorrect attempts. Please try signing up again.",
        errors: undefined,
      };
    }

    return { error: "Invalid OTP. Please try again.", errors: undefined };
  }

  // Optional: Validate user agent
  const userAgent = (await headers()).get("user-agent") || "unknown";
  if (decryptedData.userAgent !== userAgent) {
    console.warn("User agent mismatch:", {
      stored: decryptedData.userAgent,
      current: userAgent,
    });
    return {
      error: "User agent mismatch. Please try signing up again.",
      errors: undefined,
    };
  }

  // Create user
  const user = await CreateUser({
    email: decryptedData.userData.email,
    password: decryptedData.userData.password,
    firstName: decryptedData.userData.firstName,
    lastName: decryptedData.userData.lastName,
    nationality: decryptedData.userData.nationality,
    referralCode: decryptedData.userData.referralCode,
  });
  if (!user) {
    cleanUpCache(sessionId as string);
    return {
      error: "An error occurred while creating your account.",
      errors: undefined,
    };
  }

  // Clean up cache and sign in user
  cleanUpCache(sessionId as string);
  await signIn("credentials", {
    redirect: true,
    redirectTo: "/dashboard",
    ...user,
  });
}

// Helper function to clean up cache
function cleanUpCache(sessionId: string, failedAttemptsKey?: string) {
  deleteFromCache(`signup:${sessionId}`);
  deleteFromCache(failedAttemptsKey || `failed_attempts_${sessionId}`);
  deleteFromCache(`last_otp_${sessionId}`);
}
