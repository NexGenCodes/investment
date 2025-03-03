"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContex"; // Import the auth context

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth(); // Get the logout function

  const handleLogout = async () => {
    await logout(); // Perform logout
    router.push("/login"); // Redirect to login page after logging out
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg fixed w-full z-10 top-0 left-0 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-white hover:text-[rgb(255,215,0)] transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/50"
        >
          <IoChevronBackOutline className="text-2xl mr-2" />
          <span className="hidden sm:inline font-medium">Home</span>
        </button>

        {/* Logo */}
        <div className="text-white text-xl sm:text-2xl font-bold tracking-wide">
          SunVault <span className="text-[rgb(255,215,0)]">Investments</span>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-white hover:text-[rgb(255,215,0)] transition-all duration-300 p-2 rounded-lg"
          >
            <FaUserCircle className="mr-2 text-xl sm:text-2xl" />
            <span className="hidden sm:inline font-medium">Account</span>
            <span className="ml-2">&#9662;</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-40 sm:w-52 bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg overflow-hidden">
              <Link
                href="/dashboard"
                className="block px-4 py-2 sm:py-3 text-white hover:bg-green-500/20 transition"
              >
                📊 Portfolio
              </Link>
              <Link
                href="/dashboard/wallet"
                className="block px-4 py-2 sm:py-3 text-white hover:bg-green-500/20 transition"
              >
                💰 Wallet
              </Link>
              <Link
                href="/dashboard/settings"
                className="block px-4 py-2 sm:py-3 text-white hover:bg-green-500/20 transition"
              >
                ⚙️ Settings
              </Link>
              <button
                onClick={handleLogout} // Call handleLogout function
                className="block w-full text-left px-4 py-2 sm:py-3 text-red-600 hover:bg-red-600/20 transition"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
