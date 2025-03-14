"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Plus,
} from "lucide-react";

interface Transaction {
  id: number;
  type: "Deposit" | "Withdrawal";
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
  time: string;
  paymentMethod: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  lastFour: string;
  expiryDate?: string;
  isDefault: boolean;
}

const Wallet = () => {
  const [balance, setBalance] = useState(1530411); // Amount in Naira (₦)
  const [availableFunds, setAvailableFunds] = useState(300000); // Amount in Naira (₦)
  const [investedAmount, setInvestedAmount] = useState(1230411); // Amount in Naira (₦)
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState<Toast | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    accountNumber: "",
    routingNumber: "",
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      lastFour: "4242",
      expiryDate: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "bank",
      lastFour: "1234",
      isDefault: false,
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "Deposit",
      amount: 500000,
      status: "Completed",
      date: "2024-02-28",
      time: "14:30",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: 2,
      type: "Withdrawal",
      amount: 200000,
      status: "Pending",
      date: "2024-02-27",
      time: "09:15",
      paymentMethod: "Bank Account •••• 1234",
    },
    {
      id: 3,
      type: "Deposit",
      amount: 300000,
      status: "Completed",
      date: "2024-02-26",
      time: "11:45",
      paymentMethod: "Visa •••• 4242",
    },
  ]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      showToast("error", "Please enter a valid amount");
      return;
    }

    if (!selectedPaymentMethod) {
      showToast("error", "Please select a payment method");
      return;
    }

    const selectedMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentMethod
    );
    const paymentMethodDisplay = selectedMethod
      ? selectedMethod.type === "card"
        ? `Card •••• ${selectedMethod.lastFour}`
        : `Bank Account •••• ${selectedMethod.lastFour}`
      : "No payment method selected";

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "Deposit",
      amount: depositAmount,
      status: "Completed",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      paymentMethod: paymentMethodDisplay,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setBalance((prev) => prev + depositAmount);
    setAvailableFunds((prev) => prev + depositAmount);
    setInvestedAmount((prev) => prev + depositAmount * 0.8);
    setAmount("");
    setSelectedPaymentMethod("");
    setShowDepositModal(false);
    showToast(
      "success",
      `Successfully deposited ₦${depositAmount.toLocaleString()}`
    );
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      showToast("error", "Please enter a valid amount");
      return;
    }

    if (withdrawAmount > availableFunds) {
      showToast("error", "Insufficient funds");
      return;
    }

    if (!selectedPaymentMethod) {
      showToast("error", "Please select a payment method");
      return;
    }

    const selectedMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentMethod
    );
    const paymentMethodDisplay = selectedMethod
      ? selectedMethod.type === "card"
        ? `Card •••• ${selectedMethod.lastFour}`
        : `Bank Account •••• ${selectedMethod.lastFour}`
      : "No payment method selected";

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "Withdrawal",
      amount: withdrawAmount,
      status: "Completed",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      paymentMethod: paymentMethodDisplay,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setBalance((prev) => prev - withdrawAmount);
    setAvailableFunds((prev) => prev - withdrawAmount);
    setInvestedAmount((prev) => Math.max(0, prev - withdrawAmount * 0.2));
    setAmount("");
    setSelectedPaymentMethod("");
    setShowWithdrawModal(false);
    showToast(
      "success",
      `Successfully withdrew ₦${withdrawAmount.toLocaleString()}`
    );
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.type === "card") {
      if (
        !newPaymentMethod.cardNumber ||
        !newPaymentMethod.expiryDate ||
        !newPaymentMethod.cvv
      ) {
        showToast("error", "Please fill in all card details");
        return;
      }

      const lastFour = newPaymentMethod.cardNumber.slice(-4);
      const newCard: PaymentMethod = {
        id: Date.now().toString(),
        type: "card",
        lastFour,
        expiryDate: newPaymentMethod.expiryDate,
        isDefault: paymentMethods.length === 0,
      };

      setPaymentMethods((prev) => [...prev, newCard]);
    } else {
      if (!newPaymentMethod.accountNumber || !newPaymentMethod.routingNumber) {
        showToast("error", "Please fill in all bank account details");
        return;
      }

      const lastFour = newPaymentMethod.accountNumber.slice(-4);
      const newBank: PaymentMethod = {
        id: Date.now().toString(),
        type: "bank",
        lastFour,
        isDefault: paymentMethods.length === 0,
      };

      setPaymentMethods((prev) => [...prev, newBank]);
    }

    setShowAddPaymentModal(false);
    setNewPaymentMethod({
      type: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      accountNumber: "",
      routingNumber: "",
    });
    showToast("success", "Payment method added successfully");
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    showToast("success", "Default payment method updated");
  };

  const handleRemovePaymentMethod = (id: string) => {
    const methodToRemove = paymentMethods.find((method) => method.id === id);
    if (methodToRemove?.isDefault && paymentMethods.length > 1) {
      showToast(
        "error",
        "Cannot remove default payment method. Please set another method as default first."
      );
      return;
    }

    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    showToast("success", "Payment method removed");
  };

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto relative">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white z-50`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-white hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold text-white mb-6">Wallet</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Total Balance</p>
          <h3 className="text-3xl font-bold text-white">
            ₦{balance.toLocaleString()}
          </h3>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Available Funds</p>
          <h3 className="text-3xl font-bold text-white">
            ₦{availableFunds.toLocaleString()}
          </h3>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Invested Amount</p>
          <h3 className="text-3xl font-bold text-white">
            ₦{investedAmount.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => setShowDepositModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg font-medium"
        >
          <ArrowUpRight className="w-5 h-5" />
          Deposit Funds
        </button>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-gray-700 hover:bg-gray-600 text-white py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg font-medium"
        >
          <ArrowDownRight className="w-5 h-5" />
          Withdraw Funds
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">
              Transaction History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left pb-4">Type</th>
                    <th className="text-right pb-4">Amount</th>
                    <th className="text-right pb-4 hidden sm:table-cell">
                      Payment Method
                    </th>
                    <th className="text-right pb-4">Status</th>
                    <th className="text-right pb-4 hidden sm:table-cell">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-t border-gray-700"
                    >
                      <td className="py-4">
                        <div className="flex items-center">
                          {transaction.type === "Deposit" ? (
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
                      <td className="text-right text-gray-300 hidden sm:table-cell">
                        {transaction.paymentMethod}
                      </td>
                      <td className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : transaction.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="text-right text-gray-300 hidden sm:table-cell">
                        <div>{transaction.date}</div>
                        <div className="text-sm text-gray-400">
                          {transaction.time}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Payment Methods</h3>
              <button
                onClick={() => setShowAddPaymentModal(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center">
                    {method.type === "card" ? (
                      <CreditCard className="w-5 h-5 text-blue-400 mr-3" />
                    ) : (
                      <Building2 className="w-5 h-5 text-green-400 mr-3" />
                    )}
                    <div>
                      <p className="text-white">
                        {method.type === "card" ? "Card" : "Bank Account"} ••••{" "}
                        {method.lastFour}
                        {method.isDefault && (
                          <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </p>
                      {method.type === "card" && method.expiryDate && (
                        <p className="text-sm text-gray-400">
                          Expires {method.expiryDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefaultPaymentMethod(method.id)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {paymentMethods.length === 0 && (
                <p className="text-gray-400 text-center py-4">
                  No payment methods added
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Deposit Funds
              </h3>
              <button
                onClick={() => {
                  setShowDepositModal(false);
                  setAmount("");
                  setSelectedPaymentMethod("");
                }}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount to Deposit
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedPaymentMethod === method.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        {method.type === "card" ? (
                          <CreditCard className="w-5 h-5 mr-3" />
                        ) : (
                          <Building2 className="w-5 h-5 mr-3" />
                        )}
                        <span>
                          {method.type === "card" ? "Card" : "Bank Account"}{" "}
                          •••• {method.lastFour}
                        </span>
                      </div>
                      {method.isDefault && (
                        <span className="text-xs bg-blue-600/20 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleDeposit}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Confirm Deposit
                </button>
                <button
                  onClick={() => {
                    setShowDepositModal(false);
                    setAmount("");
                    setSelectedPaymentMethod("");
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Withdraw Funds
              </h3>
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  setAmount("");
                  setSelectedPaymentMethod("");
                }}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount to Withdraw
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  min="0"
                  max={availableFunds}
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Withdraw To
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedPaymentMethod === method.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        {method.type === "card" ? (
                          <CreditCard className="w-5 h-5 mr-3" />
                        ) : (
                          <Building2 className="w-5 h-5 mr-3" />
                        )}
                        <span>
                          {method.type === "card" ? "Card" : "Bank Account"}{" "}
                          •••• {method.lastFour}
                        </span>
                      </div>
                      {method.isDefault && (
                        <span className="text-xs bg-blue-600/20 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Confirm Withdrawal
                </button>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setAmount("");
                    setSelectedPaymentMethod("");
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Add Payment Method
              </h3>
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Payment Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      setNewPaymentMethod((prev) => ({ ...prev, type: "card" }))
                    }
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                      newPaymentMethod.type === "card"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Card</span>
                  </button>
                  <button
                    onClick={() =>
                      setNewPaymentMethod((prev) => ({ ...prev, type: "bank" }))
                    }
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                      newPaymentMethod.type === "bank"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>Bank Account</span>
                  </button>
                </div>
              </div>

              {newPaymentMethod.type === "card" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newPaymentMethod.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 16) {
                          setNewPaymentMethod((prev) => ({
                            ...prev,
                            cardNumber: value,
                          }));
                        }
                      }}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter card number"
                      maxLength={16}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={newPaymentMethod.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length > 2) {
                            value = value.slice(0, 2) + "/" + value.slice(2, 4);
                          }
                          if (value.length <= 5) {
                            setNewPaymentMethod((prev) => ({
                              ...prev,
                              expiryDate: value,
                            }));
                          }
                        }}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={newPaymentMethod.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 3) {
                            setNewPaymentMethod((prev) => ({
                              ...prev,
                              cvv: value,
                            }));
                          }
                        }}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="CVV"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={newPaymentMethod.accountNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 12) {
                          setNewPaymentMethod((prev) => ({
                            ...prev,
                            accountNumber: value,
                          }));
                        }
                      }}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account number"
                      maxLength={12}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      value={newPaymentMethod.routingNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 9) {
                          setNewPaymentMethod((prev) => ({
                            ...prev,
                            routingNumber: value,
                          }));
                        }
                      }}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter routing number"
                      maxLength={9}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddPaymentMethod}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Add Payment Method
                </button>
                <button
                  onClick={() => {
                    setShowAddPaymentModal(false);
                    setNewPaymentMethod({
                      type: "card",
                      cardNumber: "",
                      expiryDate: "",
                      cvv: "",
                      accountNumber: "",
                      routingNumber: "",
                    });
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
