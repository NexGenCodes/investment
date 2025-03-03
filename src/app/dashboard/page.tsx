"use client";

import { useState } from "react";
import Chart from "@/components/Chart"; // Importing the Chart component

export default function PortfolioOverview() {
  const [portfolioBalance] = useState(12500.75); // Example balance
  const [recentTransactions] = useState([
    { id: 1, type: "Deposit", amount: 500, date: "2025-02-20" },
    { id: 2, type: "Withdraw", amount: 200, date: "2025-02-18" },
    { id: 3, type: "Deposit", amount: 3000, date: "2025-02-15" },
  ]);

  return (
    <div className="bg-backgroundStart dark:bg-backgroundEnd min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Portfolio Balance Overview */}
        <div
          className="bg-gradient-to-r from-primaryAccent via-secondaryAccent to-primaryAccent 
             p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl flex flex-col 
             md:flex-row justify-between items-center transform transition-all 
             duration-300 hover:scale-[1.03] group mt-10"
        >
          {/* Left Content (Title + Subtitle) */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Portfolio Overview
            </h2>
            <p className="mt-2 text-lg text-gray-300 text-opacity-80">
              Total Portfolio Balance
            </p>
          </div>

          {/* Portfolio Balance Amount */}
          <p
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mt-4 md:mt-0 
                group-hover:scale-105 transition-transform duration-300"
          >
            ${portfolioBalance.toFixed(2)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Investment Performance Chart (Line) */}
          <div className="rounded-lg p-6 flex flex-col h-full">
            <div className="w-full h-full mt-4 flex justify-center items-center">
              <Chart type="line" title="Investment Performance" />
            </div>
          </div>

          {/* Investment Distribution Chart (Pie) */}
          <div className="rounded-lg p-6 flex flex-col h-full">
            <div className="w-full h-full mt-4 flex justify-center items-center">
              <div className="w-full h-full flex justify-center items-center ">
                <Chart type="pie" title="Investment Distribution" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8 p-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            Recent Transactions
          </h3>
          <table className="min-w-full mt-4 table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Type
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Amount
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b dark:border-gray-600"
                >
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-white">
                    {transaction.type}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-white">
                    ${transaction.amount}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 dark:text-white">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
