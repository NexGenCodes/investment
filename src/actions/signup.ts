"use server";
import { randomUUID } from "crypto";
import { sendOtp } from "@/email/email";
import { getFromCache, setToCache } from "@/lib/cache";
import { GetUserFromDb } from "@/lib/db";
import { encrypt } from "@/lib/encrypt";
import { otp } from "@/lib/utils";
import { signUpSchema } from "@/types/authSchema";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rateLimit";
import { Hash } from "@/lib/password";
import { redirect } from "next/navigation";
import { OTP_LENGTH, OTP_TTL, RATE_LIMIT } from "@/constants/globals";

type FormState =
  | {
      error?: string;
      errors?: {
        firstName?: string[];
        lastName?: string[];
        nationality?: string[];
        referralCode?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        state?: string[];
      };
    }
  | undefined;

export default async function Signup(_State: FormState, formData: FormData) {
  const headerList = await headers();
  const validatedFields = await signUpSchema.safeParseAsync({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    nationality: formData.get("nationality"),
    referralCode:
      formData.get("referralCode") === ""
        ? undefined
        : formData.get("referralCode"),
    confirmPassword: formData.get("confirmPassword"),
    state: formData.get("state"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: undefined,
    };
  }

  const { email } = validatedFields.data;

  // Check if user exists
  if (await GetUserFromDb({ email })) {
    return {
      error: "User already exists",
      errors: undefined,
    };
  }

  // Rate limit signup attempts
  if (!(await rateLimit(`rate:signup:${email}`, 5, RATE_LIMIT))) {
    return {
      error: "Too many signup attempts. Please try again later.",
      errors: undefined,
    };
  }

  // Generate unique session ID
  let sessionId = randomUUID();
  while (getFromCache(`signup:${sessionId}`)) {
    sessionId = randomUUID();
  }

  // Generate OTP
  const otpCode = otp(OTP_LENGTH);
  if (!otpCode) {
    return {
      error: "An error occurred while generating your OTP",
      errors: undefined,
    };
  }

  // Hash password
  const hashedPassword = await Hash(validatedFields.data.password);

  // Store user data in cache
  const userAgent = headerList.get("user-agent") || "unknown";
  const sessionData = await encrypt({
    userData: { ...validatedFields.data, password: hashedPassword },
    otp: otpCode,
    userAgent,
  });

  if (!sessionData) {
    return {
      error: "An error occurred while encrypting your data",
      errors: undefined,
    };
  }

  // set to cache
  const setCache = setToCache(`signup:${sessionId}`, sessionData, OTP_TTL);

  if (!setCache) {
    return {
      error: "An error occurred while creating your account cache",
      errors: undefined,
    };
  }

  // Send OTP
  const setOtp = await sendOtp(email, otpCode);
  if (!setOtp) {
    return {
      error: "An error occurred while sending your OTP",
      errors: undefined,
    };
  }

  // Encrypt sessionId for redirection
  const encryptedSession = await encrypt(sessionId);
  if (!encryptedSession) {
    return {
      error: "An error occurred while encrypting your session ID",
      errors: undefined,
    };
  }

  // Redirect with encrypted sessionId and iv as query params
  redirect(
    `/auth/otp?iv=${encodeURIComponent(
      encryptedSession.iv
    )}&encrypted=${encodeURIComponent(encryptedSession.encrypted)}`
  );
}
