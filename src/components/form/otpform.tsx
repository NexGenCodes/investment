"use client";

import { useActionState } from "react";
import InputField from "../ui/input";
import OtpAction from "@/actions/otp";
import Link from "next/link";

export default function OtpForm() {
  const [error, Action, isPending] = useActionState(OtpAction, undefined);

  return (
    <form
      action={Action}
      className="space-y-4 max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-md"
    >
      <h1 className="text-4xl font-bold mb-8 text-[rgb(255,215,0)] text-center">
        enter your otp
      </h1>
      <InputField
        label="otp"
        name="otp"
        placeholder="enter otp"
        required
        errors={error?.errors?.otp}
      />

      {error && <p className="text-red-500 text-xs ml-2">{error.message}</p>}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-[rgb(30,58,138)] to-[rgb(17,24,39)] text-white font-semibold shadow-lg hover:from-[rgb(17,24,39)] hover:to-[rgb(30,58,138)] 
      focus:ring-[rgb(255,215,0)] focus:outline-none transition-all duration-300"
        disabled={isPending}
      >
        {isPending ? "verifying..." : "verify"}
      </button>
      <p className="text-center text-gray-400 my-4">
        if you did not receive the email, please
        <Link
          href="/auth/register"
          className="text-blue-400 hover:text-yellow-400 hover:underline px-1"
        >
          resend
        </Link>
      </p>
    </form>
  );
}
