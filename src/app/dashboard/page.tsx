"use client";

import { useState } from "react";
import Chart from "@/components/Chart"; // Importing the Chart component

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function PortfolioOverview() {
  const [portfolioBalance] = useState(12500.75); // Example balance
  const [recentTransactions] = useState([
    { id: 1, type: "Deposit", amount: 500, date: "2025-02-20" },
    { id: 2, type: "Withdraw", amount: 200, date: "2025-02-18" },
    { id: 3, type: "Deposit", amount: 3000, date: "2025-02-15" },
  ]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
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
            {currencyFormatter.format(portfolioBalance)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Investment Performance Chart (Line) */}
          <div className="rounded-lg p-6 flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Investment Performance
            </h3>
            <div className="w-full h-full mt-4 flex justify-center items-center">
              <Chart type="line" title="Investment Performance" />
            </div>
          </div>

          {/* Investment Distribution Chart (Pie) */}
          <div className="rounded-lg p-6 flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Investment Distribution
            </h3>
            <div className="w-full h-full mt-4 flex justify-center items-center">
              <Chart type="pie" title="Investment Distribution" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8 p-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            Recent Transactions
          </h3>

          {recentTransactions.length > 0 ? (
            <table className="min-w-full mt-4 table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="py-2 px-4 text-left text-sm font-medium text-gray-600 dark:text-white"
                  >
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
                      {currencyFormatter.format(transaction.amount)}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700 dark:text-white">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              No recent transactions available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
