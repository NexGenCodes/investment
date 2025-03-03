"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const riskColors: { [key: string]: string } = {
  Low: "bg-[rgb(255,215,0)] text-gray-900",
  Medium: "bg-[rgb(30,58,138)] text-white",
  High: "bg-red-500 text-white",
};

const investments = [
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

export default function InvestmentsPage() {
  const [sortBy, setSortBy] = useState("name");

  const sortedInvestments = [...investments].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "riskLevel") return a.riskLevel.localeCompare(b.riskLevel);
    if (sortBy === "expectedReturns")
      return b.expectedReturns - a.expectedReturns;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 pt-[70px] md:pt-[90px]">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">
        Investment Opportunities
      </h1>

      {/* Sort Dropdown */}
      <div className="mb-8 flex justify-center items-center gap-4 bg-[rgb(17,24,39)] p-4 rounded-xl border border-gray-700 shadow-lg">
        <label
          htmlFor="sort"
          className="text-[rgb(229,231,235)] font-semibold text-2xl"
        >
          Sort By:
        </label>
        <div className="relative">
          <select
            id="sort"
            className="appearance-none p-3 pr-10 bg-[rgb(255,208,0)] text-black border-none outline-none border-gray-600 rounded-lg 
      focus:ring-2 focus:ring-[rgb(255,215,0)] transition cursor-pointer shadow-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="riskLevel">Risk Level</option>
            <option value="expectedReturns">Expected Returns</option>
          </select>
          {/* Dropdown Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown size={20} className="text-black" />
          </div>
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedInvestments.map((investment) => (
          <div
            key={investment.id}
            className="bg-[rgb(17,24,39)]/50 rounded-2xl shadow-xl border border-gray-700 overflow-hidden p-5 
            hover:scale-105 hover:border-[rgb(255,215,0)] transition-transform duration-300 backdrop-blur-lg"
          >
            {/* Image */}
            <div className="w-full h-48 relative rounded-xl overflow-hidden">
              <Image
                src={investment.imageUrl}
                alt={investment.name}
                layout="fill"
                objectFit="cover"
                className="transition duration-500 hover:scale-110"
              />
            </div>

            {/* Investment Details */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-white mb-1">
                {investment.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">
                {investment.description}
              </p>
              <p className="text-gray-400 text-sm">
                Expected Returns:{" "}
                <span className="font-semibold text-[rgb(255,215,0)]">
                  {investment.expectedReturns}%
                </span>
              </p>
              <p className="text-gray-400 text-sm mb-4 flex items-center">
                Risk Level:
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ml-2 ${
                    riskColors[investment.riskLevel]
                  }`}
                >
                  {investment.riskLevel}
                </span>
              </p>

              {/* View More Button */}
              <Link href={`/investments/${investment.id}`}>
                <button
                  className="w-full py-3 bg-[rgb(255,215,0)] text-gray-900 rounded-lg font-semibold text-lg 
                hover:bg-[rgb(229,231,235)] hover:text-gray-900 transition duration-300"
                >
                  View More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
