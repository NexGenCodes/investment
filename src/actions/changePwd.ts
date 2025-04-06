"use server";

import { auth } from "@/lib/auth";
import { GetUserFromDb, UpdateUser } from "@/lib/db";
import { Hash, Verify } from "@/lib/password";
import { changePwdSchema } from "@/types/authSchema";
import { redirect } from "next/navigation";

type Error = {
  errors?: {
    newPassword?: string[];
    confirmPassword?: string[];
    currentPassword?: string[];
  };
  message?: string;
};

type FormState = Error | undefined;

export default async function UpdatePwd(state: FormState, formData: FormData) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return { message: "You must be logged in to update your profile." };
  }

  console.log({
    confirmPassword: formData.get("confirmPassword"),
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });

  const validatedFields = await changePwdSchema.safeParseAsync({
    confirmPassword: formData.get("confirmPassword"),
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // check if user exists
  const isUserExist = await GetUserFromDb({ email: email });
  if (!isUserExist) {
    return {
      message: "user does not exist ",
    };
  }

  //   check if passwords match
  const isPasswordMatch = await Verify(
    validatedFields.data.currentPassword,
    isUserExist.password
  );
  if (!isPasswordMatch) {
    return {
      message: "password does not match",
    };
  }

  //   encrypt password
  const encryptedPwd = await Hash(validatedFields.data.newPassword);

  //   update user
  const updatedUser = await UpdateUser(email, {
    password: encryptedPwd,
  });
  if (!updatedUser) {
    return {
      message: "An error occurred while updating your profile.",
    };
  }

  redirect("/dashboard");
}
