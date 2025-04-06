"use client";

import { Investment } from "@prisma/client";
import { ArrowUpIcon } from "lucide-react";

interface Props {
  data: Investment
}

export default function PortfolioPerformance({ data }: Props) {
  const endDate = new Date(data.createdAt);
  endDate.setDate(endDate.getDate() + data.duration * 7);
  return (
    <div className="w-full rounded-xl bg-gray-800 p-6 shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-md font-bold text-green-500 flex items-center gap-1">
          ₦{data.amount.toLocaleString("en-NG")}
          <ArrowUpIcon className="w-4 h-4 " />
        </h1>

        <p className="text-white">{data.duration} Weeks</p>
        <p className="text-gray-400 text-sm">
          end: {endDate.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
