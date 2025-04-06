import TransactionHistory from "@/components/TransactionHistory";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GetTransactions, GetUserFromDb } from "@/lib/db";
import Funding from "@/components/funding";

export default async function Wallet() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/auth/login");
  const user = await GetUserFromDb({
    email,
  });
  if (!user) redirect("/auth/login");
  const transactions = await GetTransactions(email);

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto mt-14">
      <h2 className="text-2xl font-bold text-white mb-6">Wallet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Total Balance</p>
          <h3 className="text-3xl font-bold text-white">₦{user.balance}</h3>
        </div>
      </div>

      <Funding />
      <TransactionHistory
        transactions={transactions?.splice(0, 5)}
      />
    </div>
  );
}
