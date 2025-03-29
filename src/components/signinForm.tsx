"use client";

import Signup from "@/actions/signup";
import Link from "next/link";
import { useActionState } from "react";
import Input from "./input";
import SelectInput from "./select";
import Countries from "@/constants/countries";

export default function SigninForm() {
  const [error, Action, isPending] = useActionState(Signup, undefined);

  return (
    <div className="w-full max-w-md px-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-yellow-400 text-center my-3">
        Create an Account
      </h2>
      <form action={Action} className="space-y-4">
        <Input
          name="firstName"
          error={{ errors: error?.errors?.firstName, message: error?.message }}
          placeholder="Enter your firstName"
        />
        <Input
          name="lastName"
          error={{ errors: error?.errors?.lastName, message: error?.message }}
          placeholder="Enter your lastName"
        />
        <Input
          name="email"
          error={{ errors: error?.errors?.email, message: error?.message }}
          placeholder="Enter your email"
        />
        <SelectInput
          name="nationality"
          list={Countries}
          error={{
            errors: error?.errors?.nationality,
            message: error?.message,
          }}
        />
        <Input
          name="password"
          error={{ errors: error?.errors?.password, message: error?.message }}
          placeholder="Enter your password"
        />
        <Input
          name="confirmPassword"
          error={{
            errors: error?.errors?.confirmPassword,
            message: error?.message,
          }}
          placeholder="Confirm your password"
        />
        <Input
          name="referralCode"
          error={{
            errors: error?.errors?.referralCode,
            message: error?.message,
          }}
          placeholder="Enter referral code (optional)"
          required={false}
        />

        {error?.message && (
          <p className="text-red-500 text-xs ml-2">{error.message}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-800 to-gray-900 text-white font-semibold shadow-lg hover:from-gray-900 hover:to-blue-800 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
          disabled={isPending}
        >
          {isPending ? "signing up..." : "sign up"}{" "}
        </button>
      </form>
      <p className="text-center text-gray-400 my-4">
        Already have an account?
        <Link
          href="/auth/login"
          className="text-blue-400 hover:text-yellow-400 hover:underline px-1"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
