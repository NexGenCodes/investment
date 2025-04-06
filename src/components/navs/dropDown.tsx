"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";

// Custom hook for detecting clicks outside the dropdown
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, callback]);
};

export default function DropDown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Define ref with HTMLDivElement | null explicitly
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Memoize links to avoid unnecessary re-renders
  const links = useMemo(
    () => [
      { href: "/dashboard", label: "📊 Portfolio" },
      { href: "/dashboard/referral", label: "🎁 Referral" },
      { href: "/dashboard/wallet", label: "💰 Wallet" },
      { href: "/dashboard/settings", label: "⚙️ Settings" },
    ],
    []
  );

  // Close dropdown when clicking outside
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevent Next.js from auto redirecting
    window.location.href = "/auth/login"; // Force a full page reload
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center text-white hover:text-[rgb(255,215,0)] transition-all duration-300 p-2 rounded-lg"
      >
        <FaUserCircle className="mr-2 text-xl sm:text-2xl" />
        <span className="hidden sm:inline font-medium">Portfolio</span>
        <span className="ml-2">&#9662;</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-40 sm:w-52 bg-gray-900 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg overflow-hidden bg-opacity-90">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  replace
                  className="block px-4 py-2 sm:py-3 text-white hover:bg-green-500/20 transition"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 sm:py-3 text-red-600 hover:bg-red-600/20 transition"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
