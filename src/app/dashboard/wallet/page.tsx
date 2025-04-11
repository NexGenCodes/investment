import Deposit from "@/components/deposit";
import TransactionHistory from "@/components/TransactionHistory";
import Withdrawal from "@/components/withdrawal";
import { auth } from "@/lib/auth";
import { GetTransactions, GetUserFromDb } from "@/lib/db";

export default async function Wallet() {
  const session = await auth();
  const email = session?.user?.email;
  const user = await GetUserFromDb({
    email: email || "",
  });
  const transactions = await GetTransactions(email || "");

  return (
    <div className=" bg-gray-900 p-6 ">
      <div className="flex items-center justify-between my-3 ">
        <h2 className="text-2xl font-bold text-white">Wallet</h2>
        <div className="flex items-center justify-between space-x-4">
          <Deposit user={user} />
          <Withdrawal />
        </div>
      </div>
      <div className="my-4">
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Total Balance</p>
          <h3 className="text-3xl font-bold text-white">₦{user?.balance}</h3>
        </div>
      </div>
      <TransactionHistory transactions={transactions?.splice(0, 5)} />
    </div>
  );
}
