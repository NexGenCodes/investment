"use server";

import { sendOtp } from "@/email/email";
import { AppError } from "@/lib/appError";
import { setToCache, getFromCache } from "@/lib/cache";
import { decrypt, encrypt } from "@/lib/encrypt";
import { rateLimit } from "@/lib/rateLimit";
import { otp } from "@/lib/utils";
import { SignUpType } from "@/types/authSchema";
import { headers } from "next/headers";

type FormState = {
  error?: string;
  success?: boolean;
};

type SessionData = {
  iv: string;
  encrypted: string;
};

type EncryptedData = {
  userData: SignUpType;
  otp: string;
  userAgent: string;
};

const OTP_LENGTH = 6;
const OTP_EXPIRATION = 300; // 5 minutes

export default async function resendOtpAction(): Promise<FormState> {
  const sessionId = (await headers()).get("X-Session-Id");
  if (!sessionId) {
    return { error: "Session not found. Please try signing up again." };
  }

  // Rate limit resend attempts (3 attempts/5 minutes/sessionId)
  const rateLimitKey = `rate:resend_otp:${sessionId}`;
  try {
    await rateLimit(rateLimitKey, 3, 300); // 3 attempts in 5 minutes
  } catch (error) {
    if (error instanceof AppError) {
      return { error: "Too many resend attempts. Please try again later." };
    }
    throw error;
  }

  // Get session data from cache
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

  // Generate new OTP
  const newOtp = otp(OTP_LENGTH);

  // Update session data with new OTP
  const updatedSessionData = encrypt({
    userData: decryptedData.userData,
    otp: newOtp,
    userAgent: decryptedData.userAgent,
  });
  const isCached = setToCache(
    `signup:${sessionId}`,
    updatedSessionData,
    OTP_EXPIRATION
  );
  if (!isCached) {
    return { error: "An error occurred while updating your session." };
  }

  // Store last OTP send time
  setToCache(`last_otp_${sessionId}`, Date.now(), OTP_EXPIRATION);

  // Send new OTP
  const isSent = await sendOtp(decryptedData.userData.email, newOtp);
  if (!isSent) {
    return { error: "An error occurred while sending your OTP." };
  }
  return { success: true };
}
