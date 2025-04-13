"use client";

import { formatCurrency } from "@/lib/utils";
import { Investment } from "@prisma/client";
import { ArrowUpIcon } from "lucide-react";

interface Props {
  data: Investment;
}

export default function PortfolioPerformance({ data }: Props) {
  const endDate = new Date(data.createdAt);
  endDate.setDate(endDate.getDate() + data.duration * 7);

  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Plan Name */}
        <h2 className="text-xl font-semibold text-white">{data.planName}</h2>

        {/* Daily Amount */}
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-green-500 flex items-center gap-1">
            {formatCurrency(data.dailyAmount)}
            <ArrowUpIcon className="w-5 h-5" />
          </h1>
          <span className="text-sm text-gray-400">/ day</span>
        </div>

        {/* Duration */}
        <p className="text-white text-sm">
          Duration: <span className="font-medium">{data.duration} Weeks</span>
        </p>

        {/* End Date */}
        <p className="text-gray-400 text-sm">
          Ends on:{" "}
          <span className="font-medium">{endDate.toLocaleDateString()}</span>
        </p>

        {/* Total Expected Return */}
        <div className="w-full bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-400">Expected Return</p>
          <h3 className="text-lg font-bold text-green-400">
            {formatCurrency(data.expectedReturn)}
          </h3>
        </div>
      </div>
    </div>
  );
}
