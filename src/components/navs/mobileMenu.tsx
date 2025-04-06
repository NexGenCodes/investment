"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

interface Props {
  user: boolean;
}

export default function MobileMenu({ user }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle closing the menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  // Memoize links to avoid unnecessary re-renders
  const links = useMemo(
    () =>
      user
        ? [
            { href: "/", label: "Home" },
            { href: "/investments", label: "Investments" },
            { href: "/referral", label: "Earn More" },
            { href: "/dashboard", label: "Portfolio" },
          ]
        : [
            { href: "/auth/login", label: "Login" },
            { href: "/auth/register", label: "Register" },
          ],
    [user]
  );

  return (
    <div className="block md:hidden">
      <div>
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded p-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen} // Use boolean value for aria-expanded
        >
          <Menu size={32} />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-[#121212e0] shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 text-white hover:text-red-600"
          onClick={closeMenu}
        >
          <X size={32} />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center mt-16 space-y-6 text-lg font-semibold text-white">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#FFD700] transition"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
