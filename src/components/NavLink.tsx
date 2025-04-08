"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  activePath: string;
  onClick?: () => void;
  className?: string;
}

export const NavLink = ({
  href,
  children,
  activePath,
  onClick,
  className = "",
}: NavLinkProps) => (
  <Link
    href={href}
    className={`transition-colors duration-300 ${className} ${
      activePath === href
        ? "text-yellow-400"
        : "text-white hover:text-yellow-400"
    }`}
    onClick={onClick}
    replace
  >
    {children}
  </Link>
);