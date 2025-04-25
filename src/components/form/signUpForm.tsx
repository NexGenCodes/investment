"use client";

import Link from "next/link";
import { useActionState } from "react";
import InputField from "../ui/input";
import SelectInput from "../ui/select";
import { countries } from "@/lib/country";
import Signup from "@/actions/signup";

export default function SignUpForm() {
  const [state, Action, isPending] = useActionState(Signup, undefined);

  return (
    <div className="w-full max-w-md px-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-yellow-400 text-center my-3">
        Create an Account
      </h2>
      <form action={Action} className="space-y-4">
        <InputField
          name="firstName"
          label="First Name"
          required
          errors={state?.errors?.firstName}
          placeholder="Enter your firstName"
        />
        <InputField
          name="lastName"
          label="Last Name"
          required
          errors={state?.errors?.lastName}
          placeholder="Enter your lastName"
        />
        <InputField
          name="email"
          type="email"
          label="Email"
          required
          errors={state?.errors?.email}
          placeholder="Enter your email"
        />

        <SelectInput
          name="nationality"
          list={countries}
          errors={state?.errors?.nationality}
        />

        <InputField
          name="password"
          label="Password"
          required
          type="password"
          icon="password"
          errors={state?.errors?.password}
          placeholder="Enter your password"
        />
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          required
          type="password"
          icon="password"
          errors={state?.errors?.confirmPassword}
          placeholder="Confirm your password"
        />
        <InputField
          name="referralCode"
          label="Referral Code"
          required={false}
          type="text"
          errors={state?.errors?.referralCode}
          placeholder="Enter referral code (optional)"
        />

        {state?.error && (
          <p className="text-red-500 text-xs ml-2">{state.error}</p>
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
