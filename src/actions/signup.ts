"use server";

import { sendOtp } from "@/email/email";
import { setToCache } from "@/lib/cache";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";
import { GetUserFromDb } from "@/lib/db";
import { otp } from "@/lib/utils";
import { signUpSchema } from "@/types/authSchema";
import { redirect } from "next/navigation";

type Error = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    nationality?: string[];
    referralCode?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
};

type FormState = Error | undefined;

export default async function Signup(state: FormState, formData: FormData) {
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

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // check if user exists
  const isUserExist = await GetUserFromDb({
    email: validatedFields.data.email,
  });
  if (isUserExist) {
    return {
      message: "user exist already",
    };
  }
  // create otp for user
  const otpCode = otp(4);
  // check if cookie exists before setting
  if (await getCookie("otp_email")) {
    await deleteCookie("otp_email");
  }
  // save to cache
  const isCached = setToCache(otpCode, validatedFields.data);
  if (!isCached) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  await setCookie("otp_email", validatedFields.data.email);
  // send otp to user
  const isSent = await sendOtp(validatedFields.data.email, otpCode);

  if (!isSent) {
    return {
      message: "An error occurred while sending your OTP.",
    };
  }

  redirect("/auth/otp");
}
