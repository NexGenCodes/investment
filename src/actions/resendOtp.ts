"use server";

import { sendOtp } from "@/email/email";
import { setToCache, getFromCache } from "@/lib/cache";
import { decrypt, encrypt } from "@/lib/encrypt";
import { rateLimit } from "@/lib/rateLimit";
import { otp } from "@/lib/utils";
import { resendOtpSchema, SignUpType } from "@/types/authSchema";

type FormState =
  | {
      error?: string;
      success?: boolean;
      errors?: { sessionId?: string[] };
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

export default async function resendOtpAction(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  console.log(formData.get("sessionId"));
  const validatedFields = await resendOtpSchema.safeParseAsync({
    sessionId: formData.get("sessionId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: undefined,
      success: undefined,
    };
  }
  // Rate limit resend attempts (3 attempts/5 minutes/sessionId)
  const limit = await rateLimit(
    `rate:resend_otp:${validatedFields.data.sessionId}`,
    3,
    300
  ); // 3 attempts in 5 minutes
  if (limit) {
    return {
      error:
        "You have exceeded the maximum number of OTP resend attempts. Please try again later.",
      errors: undefined,
      success: undefined,
    };
  }

  // Get session data from cache
  const sessionData = getFromCache<SessionData>(
    `signup:${validatedFields.data.sessionId}`
  );
  if (!sessionData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
      errors: undefined,
      success: undefined,
    };
  }

  // Decrypt session data
  const decryptedData = (await decrypt(
    sessionData.encrypted,
    sessionData.iv
  )) as EncryptedData | null;
  if (!decryptedData) {
    return {
      error: "Session expired or invalid. Please try signing up again.",
      errors: undefined,
      success: undefined,
    };
  }
  // Generate new OTP
  const newOtp = otp(OTP_LENGTH);

  if (!newOtp) {
    return {
      error: "An error occurred while generating your OTP.",
      errors: undefined,
      success: undefined,
    };
  }

  // Update session data with new OTP
  const updatedSessionData = await encrypt({
    userData: decryptedData.userData,
    otp: newOtp,
    userAgent: decryptedData.userAgent,
  });
  if (!updatedSessionData) {
    return {
      error: "An error occurred while updating your session.",
      errors: undefined,
      success: undefined,
    };
  }
  const isCached = setToCache(
    `signup:${validatedFields.data.sessionId}`,
    updatedSessionData,
    OTP_EXPIRATION
  );
  if (!isCached) {
    return {
      error: "An error occurred while updating your session.",
      errors: undefined,
      success: undefined,
    };
  }

  // Store last OTP send time
  const lastOtpSet = setToCache(
    `last_otp_${validatedFields.data.sessionId}`,
    Date.now(),
    OTP_EXPIRATION
  );
  if (!lastOtpSet) {
    return {
      error: "An error occurred while storing the last OTP send time.",
      errors: undefined,
      success: undefined,
    };
  }

  // Send new OTP
  const isSent = await sendOtp(decryptedData.userData.email, newOtp);
  if (!isSent) {
    return {
      error: "An error occurred while sending your OTP.",
      errors: undefined,
      success: undefined,
    };
  }
  return { success: true, errors: undefined, error: undefined };
}
