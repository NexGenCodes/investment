import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CircleNotch } from "phosphor-react";

type TransactionType = "deposit" | "withdraw";
type PaymentMethod = "Bank" | "Crypto" | "Card" | "PayPal";

interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  method: PaymentMethod;
  date: string;
}

interface TransactionForm {
  amount: number;
  method: PaymentMethod;
}

interface DepositWithdrawProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setToastMessage: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      variant: "default" | "destructive";
    } | null>
  >;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TRANSACTION_KEY = "transactions";

const DepositWithdraw: React.FC<DepositWithdrawProps> = ({
  balance,
  setBalance,
  setToastMessage,
  setTransactions,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionForm>();

  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []); // 👈 This makes sure it only runs once on mount
  
  
  const onSubmit: SubmitHandler<TransactionForm> = (data, event) => {
    const form = event?.target as HTMLFormElement;
    const transactionType = form.getAttribute("data-type") as TransactionType;
    const amount = Number(data.amount);

    if (amount <= 0) {
      setToastMessage({
        title: "Invalid Amount",
        description: "Please enter a positive value.",
        variant: "destructive",
      });
      return;
    }

    if (transactionType === "withdraw" && amount > balance) {
      setToastMessage({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newTransaction: Transaction = {
        id: `txn-${Math.random().toString(36).substr(2, 9)}`,
        type: transactionType,
        amount,
        method: data.method,
        date: new Date().toISOString(),
      };

      setTransactions((prev) => {
        const updatedTransactions = [newTransaction, ...prev].slice(0, 5);
        localStorage.setItem(TRANSACTION_KEY, JSON.stringify(updatedTransactions));
        return updatedTransactions;
      });

      setBalance((prev) => (transactionType === "deposit" ? prev + amount : prev - amount));

      reset();

      setToastMessage({
        title: `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} Successful`,
        description: `$${amount.toFixed(2)} has been ${transactionType === "deposit" ? "added to" : "withdrawn from"} your wallet via ${data.method}.`,
        variant: "default",
      });

      setLoading(false);
    }, 1000);
  };

  if (!isClient) return null;

  return (
    <div className="w-full space-y-6">
      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg text-white border border-gray-700 backdrop-blur-md p-6 rounded-2xl">
  <CardHeader>
    <CardTitle className="text-xl font-semibold text-center">
      Wallet Balance
    </CardTitle>
  </CardHeader>
  <CardContent className="text-center">
    <p className="text-5xl sm:text-4xl md:text-3xl font-bold tracking-wide truncate">
      ${balance.toFixed(2)}
    </p>
  </CardContent>
</Card>


      {/* Deposit & Withdraw Tabs */}
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid grid-cols-2 bg-gray-700 p-2 rounded-lg">
          <TabsTrigger
            value="deposit"
            className="px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-gray-800 data-[state=active]:bg-blue-600"
          >
            Deposit
          </TabsTrigger>
          <TabsTrigger
            value="withdraw"
            disabled={balance === 0}
            className="px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-gray-800 data-[state=active]:bg-red-600"
          >
            Withdraw
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <form onSubmit={handleSubmit(onSubmit)} data-type="deposit" className="space-y-4">
            <Input
              type="number"
              placeholder="Enter deposit amount"
              className="bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              {...register("amount", { required: "Amount is required", min: 1 })}
            />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
              {loading ? <CircleNotch className="animate-spin" size={24} /> : "Deposit"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="withdraw">
          <form onSubmit={handleSubmit(onSubmit)} data-type="withdraw" className="space-y-4">
            <Input
              type="number"
              placeholder="Enter withdrawal amount"
              className="bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-red-500"
              {...register("amount", { required: "Amount is required", min: 1 })}
            />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg" disabled={loading || balance === 0}>
              {loading ? <CircleNotch className="animate-spin" size={24} /> : "Withdraw"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepositWithdraw;
