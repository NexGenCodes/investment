import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function DropDown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    signOut({ redirect: true, redirectTo: "/auth/login" });
  };

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center text-white hover:text-[rgb(255,215,0)] transition-all duration-300 p-2 rounded-lg"
      >
        <FaUserCircle className="mr-2 text-xl sm:text-2xl" />
        <span className="hidden sm:inline font-medium">Portfolio</span>
        <span className="ml-2">&#9662;</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-40 sm:w-52 bg-gray-900 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg overflow-hidden bg-opacity-90">
          <Link
            href="/dashboard"
            className="block px-4 py-2 sm:py-3 text-white hover:bg-green-500/20 transition"
          >
            📊 Portfolio
          </Link>
          <Link
            href="/dashboard/referral"
            className="block px-4 py-2 sm:py-3 text-white hover:bg-green-500/20 transition"
          >
            🎁 Referral
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
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 sm:py-3 text-red-600 hover:bg-red-600/20 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}
