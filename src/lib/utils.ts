import otpGenerator from "otp-generator";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names safely, handling conditional class names.
 * - Uses `clsx` for conditional class joining.
 * - Uses `twMerge` to resolve Tailwind class conflicts.
 *
 * @param inputs - Class names, conditionally applied.
 * @returns A properly merged string of class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function otp(length: number = 4) {
  const otp = otpGenerator.generate(length, {
    digits: true,
    specialChars: false,
    lowerCaseAlphabets:false,
    upperCaseAlphabets:false,
  });
  return otp;
}
