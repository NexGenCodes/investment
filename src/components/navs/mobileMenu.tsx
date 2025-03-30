import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  user: boolean;
}

export default function MobileMenu({ user }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <div>
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <Menu size={32} />
        </button>
      </div>

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
              <Link
                href="/"
                className="hover:text-[#FFD700] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/investments"
                className="hover:text-[#FFD700] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Investments
              </Link>
              <Link
                href="/referral"
                className="hover:text-[#FFD700] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Earn More
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-[#FFD700] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hover:text-green-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="hover:text-green-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
