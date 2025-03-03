"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../context/AuthContex";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Scroll effect for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on dashboard/login/register pages
  if (pathname.startsWith("/dashboard") || pathname === "/login" || pathname === "/register") return null;

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
              <Link href="/" className="hover:text-[#FFD700] transition">Home</Link>
              <Link href="/investments" className="hover:text-[#FFD700] transition">Investments</Link>
              <Link href="/dashboard" className="hover:text-[#FFD700] transition">Dashboard</Link>
              <button 
                onClick={logout} 
                className="hover:text-red-400 transition focus:outline-none focus:ring-2 focus:ring-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-green-400 transition">Login</Link>
              <Link href="/register" className="hover:text-green-400 transition">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Menu - Sliding Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-[#121212e0] shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 p-2 text-white hover:text-red-600"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={32} />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center mt-16 space-y-6 text-lg font-semibold text-white">
          {user ? (
            <>
              <Link href="/" className="hover:text-[#FFD700] transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/investments" className="hover:text-[#FFD700] transition" onClick={() => setIsMenuOpen(false)}>Investments</Link>
              <Link href="/dashboard" className="hover:text-[#FFD700] transition" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <button 
                className="text-lg hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 px-3 py-1 rounded"
                onClick={() => { logout(); setIsMenuOpen(false); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-green-400 transition" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link href="/register" className="hover:text-green-400 transition" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
