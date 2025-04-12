import { Transaction } from "@prisma/client";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  transactions?: Transaction[];
}

export default function TransactionHistory({ transactions }: Props) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 text-center">
        <h3 className="text-white font-semibold mb-4">Transaction History</h3>
        <p className="text-gray-400">No transactions available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-6">Transaction History</h3>
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm flex justify-between items-center border-b border-gray-700">
              <th className="pb-4" scope="col">
                Type
              </th>
              <th className="pb-4" scope="col">
                Amount
              </th>
              <th className="pb-4" scope="col">
                Status
              </th>
              <th className="pb-4" scope="col">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t border-gray-700 hover:bg-gray-700/50 flex items-center justify-between"
              >
                <td className="py-4">
                  <div className="flex items-center justify-center">
                    {transaction.type === "DEPOSIT" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400 mr-2" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400 mr-2" />
                    )}
                    <span className="text-white">{transaction.type}</span>
                  </div>
                </td>
                <td className="text-white ml-5">
                  ₦{transaction.amount.toLocaleString()}
                </td>
                <td className="text-white ml-12">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === "COMPLETED"
                        ? "bg-green-500/20 text-green-400"
                        : transaction.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="text-sm text-gray-500 ">
                  {transaction.createdAt.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {transaction.type === "DEPOSIT" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400 mr-2" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400 mr-2" />
                )}
                <span className="text-white font-medium">
                  {transaction.type}
                </span>
              </div>
              <span className="text-white font-medium">
                ₦{transaction.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  transaction.status === "COMPLETED"
                    ? "bg-green-500/20 text-green-400"
                    : transaction.status === "PENDING"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {transaction.status}
              </span>
              <span>{transaction.createdAt.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
