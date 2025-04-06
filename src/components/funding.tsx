"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function Funding() {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg font-medium">
        <ArrowUpRight className="w-5 h-5" />
        Deposit Funds
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 text-white py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg font-medium">
        <ArrowDownRight className="w-5 h-5" />
        Withdraw Funds
      </button>
    </div>
  );
}
