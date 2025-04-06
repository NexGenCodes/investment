"use server";

import { signIn } from "@/lib/auth";
import { getFromCache } from "@/lib/cache";
import { deleteCookie } from "@/lib/cookies";
import { CreateUser } from "@/lib/db";
import { Hash } from "@/lib/password";
import { otpSchema, SignUpType } from "@/types/authSchema";

type Error = {
  errors?: {
    otp?: string[];
  };
  message?: string;
};

type FormState = Error | undefined;

export default async function OtpAction(state: FormState, formData: FormData) {
  const validatedFields = await otpSchema.safeParseAsync({
    otp: formData.get("otp"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //   check if otp is valid
  const data = getFromCache<SignUpType>(validatedFields.data.otp);
  if (!data) {
    return {
      message: "invalid otp",
    };
  }
  // hash password
  const hashedPassword = await Hash(data.password);

  // create user
  const user = await CreateUser({
    email: data.email,
    password: hashedPassword,
    firstName: data.firstName,
    lastName: data.lastName,
    nationality: data.nationality,
    referralCode: data.referralCode,
  });
  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  await deleteCookie("otp_email");

  await signIn("credentials", {
    redirect: true,
    redirectTo: "/dashboard",
    ...user,
  });
}
