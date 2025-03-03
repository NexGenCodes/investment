"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Search } from "lucide-react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    className?: string;
    icon?: "search" | "password";
  }
>(({ label, className, icon, type, id, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = icon === "password" && type === "password";
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="relative space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon === "search" && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        <input
          ref={ref}
          id={inputId}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={cn(
            "w-full px-3 py-2 border rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-[#00b894]",
            icon === "search" && "pl-10",
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";
