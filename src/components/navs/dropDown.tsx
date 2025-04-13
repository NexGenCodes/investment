"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { NavLink } from "@/components/NavLink";

interface LinkItem {
  href: string;
  label: string;
}

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const focusable = dropdownRef.current.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      (focusable[0] as HTMLElement)?.focus();
    }
  }, [isOpen]);

  const links = useMemo<LinkItem[]>(
    () => [
      { href: "/dashboard", label: "📊 Portfolio" },
      { href: "/dashboard/referral", label: "🎁 Referral" },
      { href: "/dashboard/wallet", label: "💰 Wallet" },
      { href: "/dashboard/settings", label: "⚙️ Settings" },
    ],
    []
  );

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center text-white hover:text-yellow-400 transition-all duration-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <FaUserCircle className="mr-2 text-xl sm:text-2xl" />
        <span className="hidden sm:inline font-medium">Portfolio</span>
        <span className="ml-2">▾</span>
      </button>

      {isOpen && (
        <nav className="absolute right-0 mt-3 w-52 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg z-50">
          <ul className="space-y-2 p-2">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  activePath={pathname}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 hover:bg-green-500/20"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/20 transition-colors duration-300"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
