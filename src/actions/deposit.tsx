// app/actions/deposit.ts
"use server";

import { auth } from "@/lib/auth";
import { CreateTransaction, GetUserFromDb, UpdateUser } from "@/lib/db";

export default async function deposit(amount: number) {
  const session = await auth();
  if (!session?.user?.email) return { message: "Authentication required." };

  const user = await GetUserFromDb({ email: session.user.email });
  if (!user) return { message: "User not found." };

  const updated = await UpdateUser(user.email, {
    balance: user.balance + amount,
  });

  const createTransaction = await CreateTransaction({
    amount,
    userId: user.id,
    type: "DEPOSIT",
    status: "COMPLETED",
  });
  if (!createTransaction) return { message: "Failed to create transaction." };

  return {
    message: updated ? "Deposit successful" : "Failed to update balance",
  };
}
