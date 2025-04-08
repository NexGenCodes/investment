"use client";

import { IoChevronBackOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/NavLink";
import DropDown from "./dropDown";

export default function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-10 bg-gray-900/90 shadow-lg p-4 backdrop-blur-md ">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <NavLink href="/" activePath={pathname}>
          <div
            className="flex items-center p-2 rounded-lg hover:bg-gray-800/50"
            aria-label="Back to Home"
          >
            <IoChevronBackOutline className="text-2xl mr-2" />
            <span className="hidden sm:inline font-medium">Home</span>
          </div>
        </NavLink>
        <DropDown />
      </div>
    </nav>
  );
}
