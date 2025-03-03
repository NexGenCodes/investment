"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastProvider, ToastViewport, Toast } from "@/components/ui/toast";
import DepositWithdraw from "@/components/DepositWithdraw";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  method: "Bank" | "Crypto" | "Card" | "PayPal";
  date: string;
}

const TRANSACTION_KEY = "transactions";

export default function WalletPage() {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    description: string;
    variant: "default" | "destructive";
  } | null>(null);

  useEffect(() => {
    const storedTransactions = localStorage.getItem(TRANSACTION_KEY);
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const updateTransactions = (
    newTransactions: Transaction[] | ((prev: Transaction[]) => Transaction[])
  ) => {
    setTransactions((prevTransactions) => {
      const updatedTransactions =
        typeof newTransactions === "function"
          ? newTransactions(prevTransactions)
          : newTransactions;

      localStorage.setItem(
        TRANSACTION_KEY,
        JSON.stringify(updatedTransactions)
      );
      return updatedTransactions;
    });
  };

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-backgroundStart dark:bg-backgroundEnd text-foreground px-4 md:px-8 py-6 overflow-x-hidden">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white pt-10">💰 Wallet</h1>
          <p className="text-mutedText">Manage your funds seamlessly</p>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Deposit and Withdraw */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 shadow-xl p-6 rounded-2xl backdrop-blur-lg bg-opacity-90 dark:bg-opacity-80 overflow-hidden">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <DepositWithdraw
                balance={balance}
                setBalance={setBalance}
                setToastMessage={setToastMessage}
                setTransactions={updateTransactions}
              />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 shadow-xl p-6 rounded-2xl backdrop-blur-lg bg-opacity-90 dark:bg-opacity-80 overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Recent Transactions
            </h2>
            <ul className="space-y-3">
              <AnimatePresence>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <motion.li
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold ${
                            transaction.type === "deposit"
                              ? "bg-success-accent"
                              : "bg-green-500"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}
                        </span>
                        <div>
                          <p className="text-gray-700 dark:text-white font-medium">
                            ${transaction.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-mutedText">
                            {transaction.method}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-mutedText">
                        {transaction.date}
                      </p>
                    </motion.li>
                  ))
                ) : (
                  <p className="text-sm text-mutedText text-center">
                    No transactions yet
                  </p>
                )}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* Toast Notifications */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm">
            <Toast
              title={toastMessage.title}
              description={toastMessage.description}
              variant={toastMessage.variant}
              onDismiss={() => setToastMessage(null)}
            />
            <ToastViewport />
          </div>
        )}
      </div>
    </ToastProvider>
  );
}
