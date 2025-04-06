"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DropDown from "./dropDown";
import MobileMenu from "./mobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const user = session?.user;

  // Scroll effect for navbar background change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const debouncedHandleScroll = () => {
      handleScroll();
    };

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

  // Skip rendering on specific paths
  const shouldRenderNavbar = useMemo(() => {
    return !(
      pathname.startsWith("/dashboard") ||
      pathname === "/auth/login" ||
      pathname === "/auth/register"
    );
  }, [pathname]);

  if (!shouldRenderNavbar) return null;

  // Show loading state if session is still being fetched
  if (status === "loading") return null;

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#121212e0] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-full mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" replace>
          <Image
            src="/images/img/logo.PNG"
            alt="Logo"
            width={45}
            height={45}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg font-medium text-white items-center">
          {user ? (
            <>
              <Link
                href="/"
                className="hover:text-[#FFD700] transition"
                replace
              >
                Home
              </Link>
              <Link
                href="/investments"
                className="hover:text-[#FFD700] transition"
                replace
              >
                Investments
              </Link>
              <Link
                href="/referral"
                replace
                className="hover:text-[#FFD700] transition"
              >
                Earn More
              </Link>
              <DropDown />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                replace
                className="hover:text-green-400 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                replace
                className="hover:text-green-400 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <MobileMenu user={Boolean(user)} />
      </div>
    </nav>
  );
}
