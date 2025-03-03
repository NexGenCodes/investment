"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContex";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 pt-20 min-h-screen flex flex-col items-center justify-center rounded-2xl ">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-md"
      >
        <div>
          <h1 className="text-4xl font-bold mb-8 text-[rgb(255,215,0)] text-center">
            Login
          </h1>
          <label htmlFor="email" className="block text-sm text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[rgb(255,215,0)] focus:ring-[rgb(255,215,0)] outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-white mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[rgb(255,215,0)] focus:ring-[rgb(255,215,0)] outline-none"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[rgb(30,58,138)] to-[rgb(17,24,39)] text-white font-semibold shadow-lg hover:from-[rgb(17,24,39)] hover:to-[rgb(30,58,138)] 
            focus:ring-[rgb(255,215,0)] focus:outline-none transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-center text-gray-400 mt-4">
        Join us today!{" "}
        <Link
          href="/register"
          className="text-[rgb(0,68,255)] hover:underline  hover:text-[rgb(255,215,0)] "
        >
          Sign up now.
        </Link>
      </p>
    </main>
  );
}
