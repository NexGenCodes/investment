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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const debouncedHandleScroll = () => handleScroll();

    // Reset scroll state on page change
    setIsScrolled(false);
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [pathname]); // Depend on pathname

  const shouldRenderNavbar = useMemo(() => {
    return !(
      pathname.startsWith("/dashboard") ||
      pathname === "/auth/login" ||
      pathname === "/auth/register"
    );
  }, [pathname]);

  if (!shouldRenderNavbar) return null;
  if (status === "loading") return null;

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#121212e0] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-full mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        <Link href="/" replace>
          <Image
            src="/images/img/logo.PNG"
            alt="Logo"
            width={45}
            height={45}
            className="cursor-pointer"
          />
        </Link>

        <div className="hidden md:flex space-x-8 text-lg font-medium text-white items-center">
          {user ? (
            <>
              <Link
                href="/"
                className={`hover:text-[#FFD700] transition ${
                  pathname === "/" ? "text-[#FFD700]" : ""
                }`}
                replace
              >
                Home
              </Link>
              <Link
                href="/investments"
                className={`hover:text-[#FFD700] transition ${
                  pathname === "/investments" ? "text-[#FFD700]" : ""
                }`}
                replace
              >
                Investments
              </Link>
              <Link
                href="/referral"
                className={`hover:text-[#FFD700] transition ${
                  pathname === "/referral" ? "text-[#FFD700]" : ""
                }`}
                replace
              >
                Earn More
              </Link>
              <DropDown />
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`hover:text-green-400 transition ${
                  pathname === "/auth/login" ? "text-green-400" : ""
                }`}
                replace
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className={`hover:text-green-400 transition ${
                  pathname === "/auth/register" ? "text-green-400" : ""
                }`}
                replace
              >
                Register
              </Link>
            </>
          )}
        </div>

        <MobileMenu user={Boolean(user)} />
      </div>
    </nav>
  );
}
