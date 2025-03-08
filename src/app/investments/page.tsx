"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Constants for repeated values
const COLORS = {
  gold: "rgb(255,215,0)",
  gray: "rgb(229,231,235)",
  white: "rgb(255,255,255)",
};

const riskColors: { [key: string]: string } = {
  Low: `bg-[${COLORS.gold}] text-gray-900`,
};

interface Investment {
  id: string;
  name: string;
  riskLevel: string;
  imageUrl: string;
  description: string;
  duration: string;
  grossReturn: number;
  netReturn: number;
}

const investments: Investment[] = [
  {
    id: "1",
    name: "First Solar Plan",
    riskLevel: "Low",
    imageUrl: "/images/investments/solar.jpg",
    description:
      "Invest in the production of high-quality solar panel frames, the backbone of every solar system.",
    duration: "4 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
  {
    id: "2",
    name: "Photovoltaic Cell Plan",
    riskLevel: "Low",
    imageUrl: "/images/investments/solar1.jpg",
    description: "Fund the production of photovoltaic cells, the heart of solar panels that convert sunlight into energy.",
    duration: "6 Weeks",
    grossReturn: 45,
    netReturn: 40.5,
  },
  {
    id: "3",
    name: "Inverter System Plan",
    riskLevel: "Low",
    imageUrl: "/images/investments/solar2.jpg",
    description:
      "Invest in solar inverters, the brains of the solar system that convert DC power to AC.",
    duration: "8 Weeks",
    grossReturn: 45,
    netReturn: 40.5,
  },
  {
    id: "4",
    name: "Mounting Structure Plan",
    riskLevel: "Low",
    imageUrl: "/images/investments/solar3.jpg",
    description:
      "Support the manufacturing of durable mounting structures that secure solar panels in place",
    duration: "12 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
  {
    id: "5",
    name: "Energy Storage Battery Plan",
    riskLevel: "Low",
    imageUrl: "/images/investments/solar4.jpg",
    description: "Fund the production of advanced energy storage batteries, essential for storing solar power.",
    duration: "14 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
  {
    id: "6",
    name: "NextEra Energy, Inc. (NEE)",
    riskLevel: "Low",
    imageUrl: "/images/investments/solar5.jpg",
    description:
      "NextEra Energy, Inc. is a global leader in renewable energy, specializing in solar and wind power generation.",
    duration: "16 Weeks",
    grossReturn: 50,
    netReturn: 45,
  },
];

// Reusable InvestmentCard Component
interface InvestmentCardProps {
  investment: Investment;
}

const InvestmentCard = ({ investment }: InvestmentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden p-5 transition-transform duration-300 hover:scale-105 flex flex-col justify-between h-full"
    >
      <div className="w-full h-48 relative rounded-xl overflow-hidden">
        <Image
          src={investment.imageUrl}
          alt={investment.name}
          layout="fill"
          objectFit="cover"
          className="transition duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5 text-center flex flex-col flex-grow">
        <h2 className="text-lg md:text-2xl font-bold text-white mb-2">
          {investment.name}
        </h2>
        <p className="text-gray-300 text-sm mb-2 italic">
          {investment.description}
        </p>
        <p className="text-gray-300 text-sm flex items-center">
          Risk Level:
          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold ml-2 ${
              riskColors[investment.riskLevel]
            }`}
          >
            {investment.riskLevel}
          </span>
        </p>
        <Link href={`/investments/${investment.id}`}>
          <button className="mt-4 px-6 py-2 bg-[rgb(255,215,0)] text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-200 hover:text-gray-900 transition duration-300 shadow-md">
            View More
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function InvestmentsPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-[70px] text-center min-h-screen flex flex-col pb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
        Invest in Solar Innovation – Own a Piece of the Future
      </h1>
      <p className="text-sm md:text-base text-gray-300 mb-8 px-4 italic">
        Choose a solar equipment part to invest in and earn up to 50% returns as
        we manufacture and sell it globally.
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
        Our Plan Cards{" "}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
        {investments.map((investment) => (
          <InvestmentCard key={investment.id} investment={investment} />
        ))}
      </div>
    </div>
  );
}
