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
import { NextResponse } from "next/server";
import { Hash } from "@/lib/password";

const OTP_LENGTH = 6;
const OTP_EXPIRATION = 300;

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
  const isUserExist = await GetUserFromDb({ email });
  if (isUserExist) {
    return { error: "User already exists", errors: undefined };
  }

  // Rate limit signup attempts
  const limit = await rateLimit(`rate:signup:${email}`, 5, 60);
  if (!limit) {
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
  const userAgent = (await headers()).get("user-agent") || "unknown";
  const sessionData = encrypt({
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

  const isCached = setToCache(
    `signup:${sessionId}`,
    sessionData,
    OTP_EXPIRATION
  );

  if (!isCached) {
    return {
      error: "An error occurred while creating your account cache",
      errors: undefined,
    };
  }

  // Send OTP
  const isSent = await sendOtp(email, otpCode);
  if (!isSent) {
    return {
      error: "An error occurred while sending your OTP",
      errors: undefined,
    };
  }

  const response = NextResponse.redirect("/auth/otp");
  response.headers.set("x-session-id", sessionId);
}
