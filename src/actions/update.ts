"use server";

import { auth } from "@/lib/auth";
import { GetUserFromDb, UpdateUser } from "@/lib/db";
import { updateSchema } from "@/types/authSchema";
import { redirect } from "next/navigation";

type Error = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    nationality?: string[];
  };
  message?: string;
};

type FormState = Error | undefined;

export default async function Update(state: FormState, formData: FormData) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return { message: "You must be logged in to update your profile." };
  }

  const validatedFields = await updateSchema.safeParseAsync({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    nationality: formData.get("nationality"),
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

  //   update user
  const updatedUser = await UpdateUser(email, validatedFields.data);
  if (!updatedUser) {
    return {
      message: "An error occurred while updating your profile.",
    };
  }

  redirect("/auth/dashboard");
}
