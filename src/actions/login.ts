"use server";

import { signIn } from "@/lib/auth";
import { GetUserFromDb } from "@/lib/db";
import { Verify } from "@/lib/password";
import { signInSchema } from "@/types/authSchema";

// ...

type Errors = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

type FormState = Errors | undefined;

export default async function Signin(State: FormState, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await GetUserFromDb({ email });
  if (!user) {
    return {
      message: "user does not exist ",
    };
  }

  const pwdMatch = await Verify(password, user.password);

  if (!pwdMatch) {
    return {
      message: "password does not match",
    };
  }

  await signIn("credentials", {
    redirect: true,
    redirectTo: "/dashboard",
    ...user
  });
}
