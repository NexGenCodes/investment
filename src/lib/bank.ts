"use server";

import {
  accountVerificationSchema,
  bankSchema,
  transferResponseSchema,
} from "@/types/withdrawal";
import { fetchWithRetry } from "./utils";

export async function verifyAccount(accountNumber: string, bankCode: string) {
  const response = await fetchWithRetry(
    "https://api.flutterwave.com/v3/accounts/resolve",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_number: accountNumber,
        bank_code: bankCode,
      }),
    }
  );

  const data = await response?.json();
  const parsed = accountVerificationSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid account verification response");
  }
  if (parsed.data.status !== "success") {
    throw new Error("Account verification failed");
  }
  return parsed.data.data;
}

export async function initiateTransfer(
  amount: number,
  bankCode: string,
  accountNumber: string,
  userId: string
) {
  const response = await fetchWithRetry(
    "https://api.flutterwave.com/v3/transfers",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_bank: bankCode,
        account_number: accountNumber,
        amount,
        currency: "NGN",
        reference: `WDR-${Date.now()}-${userId}`,
        narration: "Wallet Withdrawal",
      }),
    }
  );

  const data = await response?.json();
  const parsed = transferResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid transfer response");
  }
  if (parsed.data.status !== "success") {
    throw new Error("Failed to initiate transfer");
  }
  return parsed.data.data;
}

export async function getBanks(): Promise<
  { value: string; label: string }[] | { error: string }
> {
  try {
    const response = await fetchWithRetry(
      "https://api.flutterwave.com/v3/banks/NG",
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const data = await response?.json();
    const parsed = bankSchema.safeParse(data.data);
    if (!parsed.success || data.status !== "success") {
      return { error: "Failed to fetch banks" };
    }

    return parsed.data.map((bank) => ({
      value: bank.code,
      label: bank.name,
    }));
  } catch (error) {
    console.error("Error fetching banks:", error);
    return { error: "Failed to fetch banks" };
  }
}
