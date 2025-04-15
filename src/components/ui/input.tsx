"use client";

import { cn } from "@/lib/utils";
import { useId, useState, useEffect } from "react";
import { Eye, EyeOff, Search } from "lucide-react";
import React from "react";

interface InputProps {
  defaultValue?: string;
  errors?: string[];
  placeholder?: string;
  className?: string;
  label?: string;
  icon?: "search" | "password";
}

const InputField = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> &
    InputProps
>(
  (
    { label, className, icon, type, id, errors, defaultValue, ...props },
    ref
  ) => {
    const [showPwd, setShowPwd] = useState(false);
    const [inputValue, setInputValue] = useState(defaultValue || "");
    const generatedId = `input-${useId()}`;
    const inputId = id || generatedId;
    const isPwd = icon === "password" && (type === "password" || !type);

    useEffect(() => {
      setInputValue(defaultValue || "");
    }, [defaultValue]);

    return (
      <div className="relative space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs text-white first-letter:text-md"
          >
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type={isPwd ? (showPwd ? "text" : "password") : type}
            aria-invalid={!!errors?.length}
            aria-describedby={errors?.length ? `${inputId}-error` : undefined}
            className={cn(
              "w-full p-3 border rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-[rgb(255,215,0)] border-gray-700 outline-none focus:border-[rgb(255,215,0)]",
              icon === "search" && "pl-10",
              errors &&
                "mb-2 focus:border-red-500 focus:ring-red-500 border-red-500 ring-red-500",
              className
            )}
            {...props}
          />
          {isPwd && (
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {errors && (
          <div id={`${inputId}-error`} className="space-y-1">
            {errors.map((val, index) => (
              <p key={index} className="text-red-500 text-xs m-1">
                {val}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
