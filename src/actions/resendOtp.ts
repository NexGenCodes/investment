"use server";

import { headers } from "next/headers";
import { sendOtp } from "@/email/email";
import { setToCache, getFromCache } from "@/lib/cache";
import { decrypt, encrypt } from "@/lib/encrypt";
import { rateLimit } from "@/lib/rateLimit";
import { otp } from "@/lib/utils";
import { SignUpType } from "@/types/authSchema";

type FormState =
  | {
      error?: string;
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

const OTP_LENGTH = 6;
const OTP_EXPIRATION = 300; // 5 minutes

export default async function resendOtpAction(): Promise<FormState> {
  const headersList = await headers();
  const sessionId = headersList.get("x-session-id");
  if (!sessionId) {
    return { error: "Session not found. Please try signing up again." };
  }

  // Rate limit resend attempts (3 attempts/5 minutes/sessionId)
  const limit = await rateLimit(`rate:resend_otp:${sessionId}`, 3, 300); // 3 attempts in 5 minutes
  if (limit) {
    return {
      error:
        "You have exceeded the maximum number of OTP resend attempts. Please try again later.",
    };
  }

  // Get session data from cache
  const sessionData = getFromCache<SessionData>(`signup:${sessionId}`);
  if (!sessionData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
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
    };
  }
  // Generate new OTP
  const newOtp = otp(OTP_LENGTH);

  if (!newOtp) {
    return { error: "An error occurred while generating your OTP." };
  }

  // Update session data with new OTP
  const updatedSessionData = await encrypt({
    userData: decryptedData.userData,
    otp: newOtp,
    userAgent: decryptedData.userAgent,
  });
  if (!updatedSessionData) {
    return { error: "An error occurred while updating your session." };
  }
  const isCached = setToCache(
    `signup:${sessionId}`,
    updatedSessionData,
    OTP_EXPIRATION
  );
  if (!isCached) {
    return { error: "An error occurred while updating your session." };
  }

  // Store last OTP send time
  const lastOtpSet = setToCache(
    `last_otp_${sessionId}`,
    Date.now(),
    OTP_EXPIRATION
  );
  if (!lastOtpSet) {
    return { error: "An error occurred while storing the last OTP send time." };
  }

  // Send new OTP
  const isSent = await sendOtp(decryptedData.userData.email, newOtp);
  if (!isSent) {
    return { error: "An error occurred while sending your OTP." };
  }
  return { success: true };
}
