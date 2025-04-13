import Deposit from "@/components/deposit";
import TransactionHistory from "@/components/TransactionHistory";
import Withdrawal from "@/components/withdrawal";
import { auth } from "@/lib/auth";
import { GetTransactions, GetUserFromDb } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Wallet() {
  const session = await auth();
  const user = session?.user?.email
    ? await GetUserFromDb({ email: session.user.email })
    : null;

  if (!user) return redirect("/dashboard");
  const transactions = await GetTransactions(user.email);

  return (
    <div className="bg-gray-900 min-h-screen p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between my-6">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">Wallet</h2>
          <div className="flex items-center space-x-4">
            <Deposit user={user} />
            <Withdrawal />
          </div>
        </div>

        {/* Balance Section */}
        <div className="my-6">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 shadow-lg">
            <p className="text-gray-200 mb-2 text-sm md:text-base">Total Balance</p>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              {formatCurrency(user.balance)}
            </h3>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="my-6">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
            Recent Transactions
          </h3>
          <div className="bg-gray-800 rounded-xl p-6 shadow-md">
            <TransactionHistory transactions={transactions?.splice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
}
