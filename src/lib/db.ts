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
  throw new Error(`Failed to generate unique referral code after ${maxAttempts} attempts`);
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
    throw new Error("Invalid or missing 'where' parameter");
  }
  if (!where.id && !where.email && !where.referralCode) {
    throw new Error("At least one unique field (id, email, or referralCode) is required");
  }

  try {
    return await prisma.user.findUnique({
      where,
      include: { referrals: { select: { id: true, email: true } } }, // Optimize include
    });
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
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
      throw new Error("Failed to generate a unique referral code.");
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
    throw new Error(`Failed to create user: ${error}`);
  }
}

export async function UpdateUser(email: string, userData: UpdateUser) {
  if (!email) throw new Error("Email is required to update user");

  try {
    return await prisma.user.update({
      where: { email },
      data: userData,
    });
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  }
}

export async function CreateInvestment(data: CreateInvestment) {
  try {
    return await prisma.investment.create({ data });
  } catch (error) {
    throw new Error(`Failed to create investment: ${error}`);
  }
}

export async function GetInvestments(email: string) {
  if (!email) throw new Error("Email is required to fetch investments");

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { investments: true },
    });
    return user?.investments ?? [];
  } catch (error) {
    throw new Error(`Failed to fetch investments: ${error}`);
  }
}

export async function GetInvestment(id: string) {
  if (!id) throw new Error("Investment ID is required");

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
    throw new Error(`Failed to fetch investment: ${error}`);
  }
}

export async function GetTransactions(email: string) {
  if (!email) throw new Error("Email is required to fetch transactions");

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { transactions: true },
    });
    return user?.transactions;
  } catch (error) {
    throw new Error(`Failed to fetch transactions: ${error}`);
  }
}

export async function CreateTransaction(data: CreateTransaction) {
  try {
    return await prisma.transaction.create({ data });
  } catch (error) {
    throw new Error(`Failed to create transaction: ${error}`);
  }
}
