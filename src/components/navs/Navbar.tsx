"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DropDown from "./dropDown";
import MobileMenu from "./mobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  // Scroll effect for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on login/register pages
  if (
    pathname.startsWith("/dashboard") ||
    pathname === "/auth/login" ||
    pathname === "/auth/register"
  )
    return null;

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#121212e0] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/img/logo.PNG"
            alt="Logo"
            width={45}
            height={45}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg font-medium text-white">
          {user ? (
            <>
              <Link href="/" className="hover:text-[#FFD700] transition">
                Home
              </Link>
              <Link
                href="/investments"
                className="hover:text-[#FFD700] transition"
              >
                Investments
              </Link>
              <Link
                href="/referral"
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
                className="hover:text-green-400 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="hover:text-green-400 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        <MobileMenu user={user ? true : false} />
      </div>
    </nav>
  );
}
