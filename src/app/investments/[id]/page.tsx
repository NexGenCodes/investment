"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Import Chart dynamically with a loading fallback
const CandleChart = dynamic(() => import("@/components/CandelChart"), {
  ssr: false, // Prevents SSR-related hydration issues
  loading: () => <p className="text-white text-center">Loading Chart...</p>,
});

type Investment = {
  id: string;
  name: string;
  expectedReturns: number;
  riskLevel: string;
  imageUrl: string;
  description: string;
};

// Risk Level Colors
const riskColors: Record<string, string> = {
  Low: "bg-[rgb(255,215,0)] text-gray-900",
  Medium: "bg-[rgb(30,58,138)] text-white",
  High: "bg-red-500 text-white",
};

// Investment Data
const investments: Investment[] = [
  {
    id: "1",
    name: "First Solar",
    expectedReturns: 12,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar.jpg",
    description:
      "A leader in solar panel manufacturing with sustainable solutions.",
  },
  {
    id: "2",
    name: "Enphase Energy",
    expectedReturns: 18,
    riskLevel: "Medium",
    imageUrl: "/images/investments/solar1.jpg",
    description: "Specializes in advanced solar inverters and energy storage.",
  },
  {
    id: "3",
    name: "SunPower Corporation",
    expectedReturns: 15,
    riskLevel: "High",
    imageUrl: "/images/investments/solar2.jpg",
    description:
      "Provides high-efficiency solar panels for residential and commercial use.",
  },
  {
    id: "4",
    name: "SolarEdge Technologies",
    expectedReturns: 10,
    riskLevel: "Low",
    imageUrl: "/images/investments/solar3.jpg",
    description:
      "Develops smart energy solutions for efficient power conversion.",
  },
  {
    id: "5",
    name: "Brookfield Renewable",
    expectedReturns: 20,
    riskLevel: "Medium",
    imageUrl: "/images/investments/solar4.jpg",
    description: "Invests in solar and wind farms for a greener future.",
  },
  {
    id: "6",
    name: "Tesla Solar",
    expectedReturns: 25,
    riskLevel: "High",
    imageUrl: "/images/investments/solar5.jpg",
    description:
      "Pioneering solar technology with energy-efficient solar roofs and storage.",
  },
];

export default function InvestmentDetails() {
  const { id: investmentId } = useParams<{ id: string }>(); // Explicitly type useParams
  const [investment, setInvestment] = useState<Investment | null>(null);

  useEffect(() => {
    if (investmentId) {
      const selectedInvestment = investments.find(
        (inv) => inv.id === investmentId
      );
      setInvestment(selectedInvestment || null);
    }
  }, [investmentId]);

  if (!investmentId || !investment) {
    return (
      <p className="text-[rgb(229,231,235)] text-center mt-10">
        Investment not found.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 text-[rgb(229,231,235)] pt-[70px] md:pt-[90px] overflow-hidden">
      {/* Back Link */}
      <Link
        href="/investments"
        className="text-[rgb(30,58,138)] hover:underline"
      >
        ← Back to Investments
      </Link>

      {/* Investment Details */}
      <div className="mt-6 bg-[rgb(17,24,39)]/80 rounded-xl p-6 border border-[rgb(225,215,0)]">
        <h1 className="text-3xl font-bold mb-4">{investment.name}</h1>

        {/* Investment Image */}
        <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4">
          <Image
            src={investment.imageUrl}
            alt={investment.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <p className="text-[rgb(229,231,235)] mb-2">{investment.description}</p>
        <p className="text-[rgb(229,231,235)]">
          Expected Returns:{" "}
          <span className="font-semibold">{investment.expectedReturns}%</span>
        </p>

        {/* Risk Level */}
        <p className="text-[rgb(229,231,235)] flex items-center mt-2">
          Risk Level:
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ml-2 ${riskColors[investment.riskLevel]}`}
          >
            {investment.riskLevel}
          </span>
        </p>
      </div>

      <div className="mt-8 bg-[rgb(17,24,39)]/80 rounded-xl p-6 border border-[rgb(225,215,0)]">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Live Investment Chart
        </h2>
        <div className="relative w-full h-[80vh] sm:h-[60vh]">
          {/* Fills 80% of Screen on Mobile */}
          <CandleChart />
        </div>
      </div>
    </div>
  );
}
