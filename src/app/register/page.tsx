"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContex";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [referralCode, setReferralCode] = useState(""); // New state for referral code
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success message state
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Reset success message on new attempt

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Registering user", { name, email, password, nationality, referralCode });
      await login(email, password);

      // ✅ Show success message
      setSuccessMessage("Registration successful! Redirecting to dashboard...");
      
      // ✅ Redirect after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 px-4 pt-20 pb-10">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Create an Account
        </h2>

        {/* ✅ Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center mb-4 animate-fade">
            {successMessage}
          </p>
        )}

        {/* ❌ Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-black/30 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/30 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/30 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-black/30 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-400"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm text-gray-300 mb-1">
              Nationality
            </label>
            <select
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full p-3 bg-black/60 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              required
            >
              <option value="">Select your nationality</option>
              <option value="Nigeria">Nigeria</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="India">India</option>
              <option value="India">Others</option>
            </select>
          </div>

          <div>
            <label htmlFor="referralCode" className="block text-sm text-gray-300 mb-1">
              Referral Code (optional)
            </label>
            <input
              type="text"
              id="referralCode"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full p-3 bg-black/30 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-400"
              placeholder="Enter referral code (optional)"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-800 to-gray-900 text-white font-semibold shadow-lg hover:from-gray-900 hover:to-blue-800 focus:ring-yellow-400 focus:outline-none transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-yellow-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}