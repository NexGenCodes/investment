// app/actions/deposit.ts
"use server";

import { auth } from "@/lib/auth";
import { CreateTransaction, GetUserFromDb, UpdateUser } from "@/lib/db";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";

export default async function deposit(
  amount: number,
  response: FlutterWaveResponse
) {
  const session = await auth();
  if (!session?.user?.email)
    return { message: "Authentication required.", successful: false };

  const user = await GetUserFromDb({ email: session.user.email });
  if (!user) return { message: "User not found.", successful: false };

  if (response.status !== "successful") {
    const createTransaction = await CreateTransaction({
      amount,
      userId: user.id,
      type: "DEPOSIT",
      status: "COMPLETED",
      referenceId: response.transaction_id,
      reference: response.tx_ref,
    });
    if (!createTransaction)
      return { message: "Failed to create transaction.", successful: false };

    return {
      message: "Failed to update balance",
      successful: false,
    };
  }

  const updated = await UpdateUser(user.email, {
    balance: user.balance + amount,
  });

  const createTransaction = await CreateTransaction({
    amount,
    userId: user.id,
    type: "DEPOSIT",
    status: "COMPLETED",
  });
  if (!createTransaction)
    return { message: "Failed to create transaction.", successful: false };

  return {
    message: updated ? "Deposit successful" : "Failed to update balance",
    successful: updated ? true : false,
  };
}
