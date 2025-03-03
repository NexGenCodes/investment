import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    investments: [
      { name: "Solar Panel Investment", amount: 500, expectedReturn: 5 },
      { name: "Wind Energy Investment", amount: 300, expectedReturn: 4 },
      { name: "Energy Storage Investment", amount: 200, expectedReturn: 3 },
    ],
  });
}
