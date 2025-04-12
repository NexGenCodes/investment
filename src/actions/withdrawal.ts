"use server";

import { auth } from "@/lib/auth";
import { initiateTransfer, verifyAccount } from "@/lib/bank";
import { CreateTransaction, GetUserFromDb, UpdateUser } from "@/lib/db";
import withdrawalSchema from "@/types/withdrawal";

type Error = {
  errors?: {
    amount?: string[];
    bankCode?: string[];
    accountNumber?: string[];
  };
  message?: string;
  success?: boolean;
};

type FormState = Error | undefined;

export default async function WithdrawalAction(
  state: FormState,
  formData: FormData
) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return {
        success: false,
        message: "You must be logged in to update your profile.",
      };
    }

    const validatedFields = withdrawalSchema.safeParse({
      amount: Number(formData.get("amount")),
      bankCode: formData.get("bankCode"),
      accountNumber: formData.get("accountNumber"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
      };
    }

    const { amount, bankCode, accountNumber } = validatedFields.data;

    // check if user exists
    const user = await GetUserFromDb({ email: email });
    if (!user) {
      return {
        message: "user does not exist ",
        success: false,
      };
    }

    if (user.balance < amount) {
      return { message: "Insufficient balance", success: false };
    }

    await verifyAccount(accountNumber, bankCode);

    await initiateTransfer(amount, bankCode, accountNumber, user.id);

    await UpdateUser(email, {
      balance: user.balance - amount,
    });

    await CreateTransaction({
      amount: -amount,
      type: "WITHDRAWAL",
      userId: user.id,
      status: "PENDING",
      investmentId: null,
    });

    return { message: "Withdrawal initiated successfully", success: true };
  } catch (error) {
    console.error("Withdrawal error:", error);
    return { message: "Failed to process withdrawal", success:false };
  }
}

