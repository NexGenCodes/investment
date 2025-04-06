"use client";

import { IoChevronBackOutline } from "react-icons/io5";
import Link from "next/link";
import DropDown from "./dropDown";

export default function DashboardNavbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg fixed w-full z-10 top-0 left-0 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={"/"}
          className="flex items-center text-white hover:text-[rgb(255,215,0)] transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/50"
        >
          <IoChevronBackOutline className="text-2xl mr-2" />
          <span className="hidden sm:inline font-medium">Home</span>
        </Link>
        <DropDown />
      </div>
    </nav>
  );
}
