import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    transactions: [
      { description: "Deposit from Bank", amount: 500, date: "2025-02-25" },
      { description: "Withdraw to PayPal", amount: -200, date: "2025-02-23" },
      { description: "Solar Investment", amount: -300, date: "2025-02-20" },
    ],
  });
}
