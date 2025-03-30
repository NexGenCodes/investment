import prisma from "./prisma";
import { randomBytes } from "crypto";
import { Prisma } from "@prisma/client";
import { SignUpType, UpdateType } from "@/types/authSchema";

type CreateUser = Omit<SignUpType, "confirmPassword">;
type UpdateUser = UpdateType & { password: string };

async function generateReferralCode(length: number = 8) {
  let attempts = 0; // Initialize attempt counter

  while (attempts < 3) {
    attempts++; // Increment attempts on each try

    // Generate a random referral code
    const referralCode = randomBytes(length)
      .toString("hex")
      .slice(0, length)
      .toUpperCase();

    // Check if the referral code already exists in the database
    const existingReferralCode = await prisma.user.findUnique({
      where: { referralCode },
    });

    if (!existingReferralCode) {
      return referralCode; // Return the unique code if it does not exist in the database
    }
  }
  throw new Error("Failed to generate a unique referral code after 3 attempts");
}

async function getReferredById(referralCode?: string) {
  if (!referralCode) {
    return null;
  }
  const referredBy = await prisma.user.findUnique({
    where: { referralCode },
  });
  if (!referredBy) {
    return null;
  }
  return referredBy?.id;
}

export async function GetUserFromDb(where: Prisma.UserWhereUniqueInput) {
  try {
    const user = await prisma.user.findUnique({
      where,
      include: {
        referrals: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function CreateUser(userData: CreateUser) {
  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        referralCode: await generateReferralCode(),
        referredById: await getReferredById(userData.referralCode),
        emailVerified: new Date(),
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to create user:", error);
    return null;
  }
}

export async function UpdateUser(email: string, userData: UpdateUser) {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        ...userData,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to update user:", error);
    return null;
  }
}
