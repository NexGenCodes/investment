"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { NavLink } from "@/components/NavLink";
import MobileMenu from "./mobileMenu";
import DropDown from "./dropDown";
import Spinner from "@/components/spinner";
import useScroll from "@/hooks/useScroll";

export default function Navbar() {
  const { isScrolled, resetScroll } = useScroll(50);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const user = session?.user;

  // Reset scroll on navigation
  useEffect(() => {
    resetScroll();
  }, [pathname, resetScroll]);

  // Determine if Navbar should render
  const shouldRender = useMemo(() => {
    const hiddenPaths = ["/dashboard", "/auth/login", "/auth/register"];
    return !hiddenPaths.some((path) => pathname.startsWith(path));
  }, [pathname]);

  // Loading or hidden states
  if (status === "loading") return <Spinner />;
  if (!shouldRender) return null;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <NavLink href="/" activePath={pathname}>
          <Image
            src="/images/img/logo.PNG"
            alt="Logo"
            width={45}
            height={45}
            className="cursor-pointer"
          />
        </NavLink>

        <div className="hidden md:flex space-x-8 text-lg font-medium items-center">
          {user ? (
            <>
              <NavLink href="/" activePath={pathname}>
                Home
              </NavLink>
              <NavLink href="/investments" activePath={pathname}>
                Investments
              </NavLink>
              <NavLink href="/referral" activePath={pathname}>
                Earn More
              </NavLink>
              <DropDown />
            </>
          ) : (
            <>
              <NavLink href="/auth/login" activePath={pathname}>
                Login
              </NavLink>
              <NavLink href="/auth/register" activePath={pathname}>
                Register
              </NavLink>
            </>
          )}
        </div>

        <MobileMenu user={Boolean(user)} />
      </div>
    </nav>
  );
}
