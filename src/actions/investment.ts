"use server";

import { auth } from "@/lib/auth";
import { CreateInvestment, GetUserFromDb } from "@/lib/db";
import { InvestmentPlan } from "@/types/investment";
import { redirect } from "next/navigation";

type Errors = {
  success?: boolean;
  message?: string;
};

type FormState = Errors | undefined;

// Client-side validation
const validateData = (data: InvestmentPlan): string | null => {
  if (!data || typeof data !== "object") return "Invalid investment data";
  if (!data.name || typeof data.name !== "string")
    return "Plan name is required";
  if (!data.duration || typeof data.duration !== "number")
    return "duration is required";
  if (!data.investment || typeof data.investment !== "number")
    return "amount is required";
  if (!data.returnAmount || typeof data.returnAmount !== "number")
    return "return amount is required";
  return null;
};

export default async function createInvestment(
  state: FormState,
  data: InvestmentPlan
) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return { success: false, message: "Authentication required" };
  }

  const user = await GetUserFromDb({ email });
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const validationError = validateData(data);
  if (validationError) {
    return {
      success: false,
      message: validationError || "",
    };
  }

  if (user.balance < data.investment) {
    return {
      success: false,
      message: "You don't have enough balance to invest",
    };
  }

  const investment = await CreateInvestment({
    duration: data.duration,
    userId: user.id,
    planName: data.name,
    amount: data.investment,
    expectedReturn: data.returnAmount,
    dailyAmount: 0.0,
  });

  if (!investment) {
    return { success: false, message: "Investment creation failed" };
  }

  redirect("/dashboard");
}
