import { generateDailyInvestmentValue } from "@/lib/investment";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const investments = await prisma.investment.findMany();
  if (!investments) {
    return new NextResponse("No investments found", { status: 404 });
  }
  investments.forEach(async (investment) => {
    const dailyValue = generateDailyInvestmentValue({
      amount: investment.amount.toNumber(),
      returns: investment.expectedReturn.toNumber(),
    });
    await prisma.investment.update({
      where: {
        id: investment.id,
      },
      data: {
        dailyAmount: investment.dailyAmount.toNumber() + dailyValue,
      },
    });
  });

  return NextResponse.json({ success: true, message: "Cron job executed." });
}
