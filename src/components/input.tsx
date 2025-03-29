"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type CombinedError = {
  errors?: string[];
  message?: string;
};

interface InputProps {
  name: string;
  error?: CombinedError;
  placeholder?: string;
  className?: string;
  required?: boolean;
}



export default function Input(props: InputProps) {
  const [inputValue, setInputValue] = useState<string|undefined>("");
  const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);

  const togglePwdVisibility = () => {
    setIsPwdVisible(!isPwdVisible);
  };

  function hasPwd(inputName: string) {
    const lower = inputName.toLowerCase();
    return lower.includes("password") || lower.includes("confirmPassword");
  }

  const { name: inputName, error, placeholder, className , required} = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor={inputName} className="block text-white mb-1 ml-2 text-xs">
        {inputName.charAt(0).toUpperCase() + inputName.slice(1)}
      </label>

      <div
        className={cn(
          "rounded-lg  flex border justify-end items-center border-gray-700 bg-gray-900 ",
          "focus-within:border-[rgb(255,215,0)] focus-within:ring-[rgb(255,215,0)]",
          error?.errors &&
            "mb-2 focus-within:border-red-500 focus-within:ring-red-500 border-red-500 ring-red-500",
          error?.message && "border-red-500 ring-red-500 outline-none",
          className && className
        )}
      >
        <input
          type={
            hasPwd(inputName)
              ? isPwdVisible
                ? "text"
                : "password"
              : inputName.includes("email")
              ? "email"
              : "text"
          }
          name={inputName}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-3 text-sm bg-gray-900 rounded-lg outline-none  placeholder-gray-400"
          required={required}
        />

        {hasPwd(inputName) && (
          <div
            onClick={togglePwdVisibility}
            className="  text-gray-500 cursor-pointer"
          >
            {isPwdVisible ? (
              <Eye className="h-5 w-5 mr-2" />
            ) : (
              <EyeOff className="h-5 w-5 mr-2" />
            )}
          </div>
        )}
      </div>

      {error?.errors?.map((val, index) => (
        <p key={index} className="text-red-500 text-xs m-1">
          {val}
        </p>
      ))}
    </div>
  );
}
