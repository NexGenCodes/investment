"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { NavLink } from "@/components/NavLink";

interface MobileMenuProps {
  user: boolean;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useOutsideClick(menuRef, () => setIsOpen(false));

  // Memoized links based on user state
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

  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirect: false });
    setIsOpen(false);
    window.location.href = "/";
  };

  // Focus management
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      (focusable[0] as HTMLElement)?.focus();
    }
  }, [isOpen]);

  return (
    <div className="md:hidden block relative">
      <button
        onClick={() => setIsOpen(true)}
        className="text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="Open menu"
      >
        <Menu size={32} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 "
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={menuRef}
            className="fixed top-0 right-0 w-64  bg-gray-900/90 shadow-xl transform transition-transform duration-300 z-10000 translate-x-0 h-screen overflow-y-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
            <nav className="mt-16 space-y-6 text-lg font-semibold flex flex-col items-center px-4">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  activePath={pathname}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
