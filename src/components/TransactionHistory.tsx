import { Transaction } from "@prisma/client";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  transactions?: Transaction[];
}

export default function TransactionHistory({ transactions }: Props) {
  if (!transactions) return null;
  return (
      <div className="bg-gray-800 rounded-xl p-6 ">
        <h3 className="text-white font-semibold mb-6">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className=" pb-4">Type</th>
                <th className=" pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 hidden md:table-cell">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-gray-700">
                  <td className="py-4">
                    <div className="flex items-center">
                      {transaction.type === "DEPOSIT" ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400 mr-2" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400 mr-2" />
                      )}
                      <span className="text-white">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="text-right text-white">
                    ₦{transaction.amount.toLocaleString()}
                  </td>

                  <td className="text-right">
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
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {transaction.createdAt.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
