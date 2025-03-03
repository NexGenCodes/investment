// src/lib/utils.ts

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
