"use server";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { sendOtp } from "@/email/email";
import { getFromCache, setToCache } from "@/lib/cache";
import { GetUserFromDb } from "@/lib/db";
import { encrypt } from "@/lib/encrypt";
import { otp } from "@/lib/utils";
import { signUpSchema } from "@/types/authSchema";
import { headers } from "next/headers";
import { AppError } from "@/lib/appError";
import { rateLimit } from "@/lib/rateLimit";
import { ZodError } from "zod";

const OTP_LENGTH = 6;
const OTP_EXPIRATION = 300;

type FormState = {
  error?: string;
  success?: boolean;
  sessionId?: string;
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
};

export default async function Signup(
  _prevState: FormState,
  formData: FormData
) {
  try {
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
      };
    }

    const { email } = validatedFields.data;

    // Check if user exists
    const isUserExist = await GetUserFromDb({ email });
    if (isUserExist) {
      return { error: "User already exists" };
    }

    // Rate limit signup attempts
    await rateLimit(`rate:signup:${email}`, 5, 60);

    // Generate unique session ID
    let sessionId = randomUUID();
    while (getFromCache(`signup:${sessionId}`)) {
      sessionId = randomUUID();
    }

    // Generate OTP
    const otpCode = otp(OTP_LENGTH);

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    // Store user data in cache
    const userAgent = (await headers()).get("user-agent") || "unknown";
    const sessionData = encrypt({
      userData: { ...validatedFields.data, password: hashedPassword },
      otp: otpCode,
      userAgent,
    });
    const isCached = setToCache(
      `signup:${sessionId}`,
      sessionData,
      OTP_EXPIRATION
    );

    if (!isCached) {
      return { error: "An error occurred while creating your account cache" };
    }

    // Send OTP
    const isSent = await sendOtp(email, otpCode);
    if (!isSent) {
      return { error: "An error occurred while sending your OTP" };
    }

    return { success: true, sessionId };
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof ZodError) return { error: "Invalid input data" };
    if (error instanceof AppError) return { error: error.message };
    return { error: "Failed to process signup. Please try again." };
  }
}
