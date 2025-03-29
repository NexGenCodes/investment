"use client";

import Link from "next/link";
import Signin from "@/actions/login";
import { useActionState } from "react";
import Input from "./input";

export default function LoginForm() {
  const [error, Action, isPending] = useActionState(Signin, undefined);

  return (
    <form
      action={Action}
      className="space-y-4 max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-md"
    >
      <h1 className="text-4xl font-bold mb-8 text-[rgb(255,215,0)] text-center">
        Login
      </h1>
      <Input
        name={"email"}
        error={{ errors: error?.errors?.email, message: error?.message }}
        placeholder="email"
      />
      <Input
        name={"password"}
        error={{ errors: error?.errors?.password, message: error?.message }}
        placeholder="password"
      />
      {error && <p className="text-red-500 text-xs ml-2">{error.message}</p>}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-[rgb(30,58,138)] to-[rgb(17,24,39)] text-white font-semibold shadow-lg hover:from-[rgb(17,24,39)] hover:to-[rgb(30,58,138)] 
      focus:ring-[rgb(255,215,0)] focus:outline-none transition-all duration-300"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
      <p className="text-center text-gray-400 mt-4">
        Join us today!{" "}
        <Link
          href="/auth/register"
          className="text-[rgb(0,68,255)] hover:underline hover:text-[rgb(255,215,0)]"
        >
          Sign up now.
        </Link>
      </p>
    </form>
  );
}
