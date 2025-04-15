import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function otp(digits: number = 6): string {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
}

export function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3
) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};
export const isPlanActive = (startDate: Date, duration: number): boolean => {
  const end = new Date(startDate);
  end.setMonth(end.getMonth() + duration);
  const today = new Date();
  return today < end;
};

export function getInvestmentByPlanName<T extends { planName: string }>(
  investments: T[],
  planName: string
): T | undefined {
  return investments.find((investment) => investment.planName === planName);
}
