"use server";
import prisma from "./prisma";
import { randomBytes } from "crypto";
import { Prisma } from "@prisma/client";
import { SignUpType, UpdateType } from "@/types/authSchema";

type CreateUser = Omit<SignUpType, "confirmPassword">;
type UpdateUser = UpdateType & { password?: string; balance?: number };

type CreateInvestment = Omit<
  Prisma.InvestmentUncheckedCreateInput,
  "id" | "createdAt"
>;

type CreateTransaction = Omit<Prisma.TransactionUncheckedCreateInput, "id">;

async function generateReferralCode(length: number = 8) {
  const maxAttempts = 3;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const referralCode = randomBytes(length)
      .toString("hex")
      .slice(0, length)
      .toUpperCase();
    const existing = await prisma.user.findUnique({
      where: { referralCode },
      select: { id: true }, // Select minimal data
    });
    if (!existing) return referralCode;
  }
  console.log(`Failed to generate unique referral code after ${maxAttempts} attempts`);
}

async function getReferredById(referralCode?: string) {
  if (!referralCode) return null;
  const user = await prisma.user.findUnique({
    where: { referralCode },
    select: { id: true }, // Select only necessary field
  });
  return user?.id ?? null;
}

export async function GetUserFromDb(where: Prisma.UserWhereUniqueInput) {
  if (!where || typeof where !== "object" || !Object.keys(where).length) {
    console.error("Invalid or missing 'where' parameter");
    return null
  }
  if (!where.id && !where.email && !where.referralCode) {
    console.error("At least one unique field (id, email, or referralCode) is required");
    return null
  }

  try {
    return await prisma.user.findUnique({
      where,
      include: { referrals: { select: { id: true, email: true } } }, // Optimize include
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null
  }
}

export async function CreateUser(userData: CreateUser) {
  try {
    const { referralCode: inputReferralCode, ...restData } = userData;
    const [generatedReferralCode, referredById] = await Promise.all([
      generateReferralCode(),
      getReferredById(inputReferralCode),
    ]);

    if (!generatedReferralCode) {
      console.error("Failed to generate a unique referral code.");
      return null;
    }

    return await prisma.user.create({
      data: {
        ...restData,
        referralCode: generatedReferralCode,
        referredById,
        emailVerified: new Date(),
      },
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    return null;
  }
}
export async function UpdateUser(email: string, userData: UpdateUser) {
  if (!email) return null

  try {
    return await prisma.user.update({
      where: { email },
      data: userData,
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    return null;
  }
}

export async function CreateInvestment(data: CreateInvestment) {
  try {
    return await prisma.investment.create({ data });
  } catch (error) {
    console.error("Failed to create investment:", error);
    return null;
  }
}

export async function GetInvestments(email: string) {
  if (!email) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { investments: true },
    });
    return user?.investments ?? [];
  } catch (error) {
    console.error("Failed to fetch investments:", error);
    return null;
  }
}

export async function GetInvestment(id: string) {
  if (!id) return null;

  try {
    return await prisma.investment.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, referrals: { select: { id: true, email: true } } },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch investment:", error);
    return null;
  }
}

export async function GetTransactions(email: string) {
  if (!email) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { transactions: true },
    });
    return user?.transactions;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return null;
  }
}


export async function CreateTransaction(data: CreateTransaction) {
  try {
    return await prisma.transaction.create({ data });
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return null
  }
}
