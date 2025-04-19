"use server";

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
      errors?: { otp?: string[]; session?: string[] };
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
  // Validate OTP input
  const validatedFields = await otpSchema.safeParseAsync({
    otp: formData.get("otp"),
    session: formData.get("sessionId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: undefined,
    };
  }

  // Rate limit OTP attempts
  const rateLimitKey = `rate:otp:${validatedFields.data.sessionId}`;
  const isRateLimited = await rateLimit(rateLimitKey, 5, 60);
  if (!isRateLimited) {
    return {
      error: "Too many attempts. Please try again later.",
      errors: undefined,
    };
  }

  // Retrieve session data from cache
  const sessionData = getFromCache<SessionData>(
    `signup:${validatedFields.data.sessionId}`
  );
  if (!sessionData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
      errors: undefined,
    };
  }

  // Decrypt session data
  const decryptedData = await decrypt(
    sessionData.encrypted,
    sessionData.iv
  ) as EncryptedData | null;
  if (!decryptedData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
      errors: undefined,
    };
  }

  // Validate OTP
  if (decryptedData.otp !== validatedFields.data.otp) {
    const failedAttemptsKey = `failed_attempts_${validatedFields.data.sessionId}`;
    const failedAttempts = (getFromCache<number>(failedAttemptsKey) || 0) + 1;

    setToCache(failedAttemptsKey, failedAttempts, 300); // 5-minute TTL

    if (failedAttempts >= 5) {
      cleanUpCache(validatedFields.data.sessionId, failedAttemptsKey);
      return {
        error: "Too many incorrect attempts. Please try signing up again.",

        errors: undefined,
      };
    }

    return { error: "Invalid OTP. Please try again." };
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
    cleanUpCache(validatedFields.data.sessionId);
    return {
      error: "An error occurred while creating your account.",
      errors: undefined,
    };
  }

  // Clean up cache and sign in user
  cleanUpCache(validatedFields.data.sessionId);
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
