import { generateDailyInvestmentValue } from "@/lib/investment";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


interface FailedUpdate {
  investmentId: string;
  reason: unknown;
}

export async function GET(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const investments = await prisma.investment.findMany();
  if (!investments || investments.length === 0) {
    return NextResponse.json({ success: true, message: "No investments to process." });
  }

  const batchSize = 50; // Limit the number of concurrent updates
  const failedUpdates: FailedUpdate[] = [];

  for (let i = 0; i < investments.length; i += batchSize) {
    const batch = investments.slice(i, i + batchSize);

    // Process the current batch in parallel using Promise.allSettled
    const results = await Promise.allSettled(
      batch.map((investment) => {
        const dailyValue = generateDailyInvestmentValue({
          amount: investment.amount,
          returns: investment.expectedReturn,
        });

        return prisma.investment.update({
          where: { id: investment.id },
          data: { dailyAmount: investment.dailyAmount + dailyValue },
        });
      })
    );

    // Collect failed updates for logging or debugging
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        failedUpdates.push({
          investmentId: batch[index].id,
          reason: result.reason,
        });
      }
    });
  }

  if (failedUpdates.length > 0) {
    console.error("Failed updates:", failedUpdates);
  }

  return NextResponse.json({
    success: true,
    message: "Cron job executed successfully.",
    failedUpdates: failedUpdates.length,
  });
}
