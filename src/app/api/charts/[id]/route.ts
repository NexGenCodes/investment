import { NextRequest, NextResponse } from "next/server";

interface CandleData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Mock Data (Replace with DB Query Later)
const mockChartData: Record<string, CandleData[]> = {
  "1": [
    { timestamp: "2024-02-25T10:00:00Z", open: 150, high: 155, low: 148, close: 152, volume: 1200 },
    { timestamp: "2024-02-26T10:00:00Z", open: 152, high: 158, low: 151, close: 156, volume: 1300 },
    { timestamp: "2024-02-27T10:00:00Z", open: 156, high: 160, low: 154, close: 159, volume: 1400 },
  ],
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("API Request received. Params:", params); // Debug log

    if (!params || !params.id) {
      return NextResponse.json({ error: "No investment ID provided" }, { status: 400 });
    }

    const id = String(await params.id); // Ensure it's awaited if necessary
    console.log("Requested ID:", id);

    if (!mockChartData[id]) {
      console.error("ID not found:", id);
      return NextResponse.json({ error: "Investment data not found" }, { status: 404 });
    }

    return NextResponse.json({ values: mockChartData[id] });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
