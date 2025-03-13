"use client"
import React, { useState } from 'react';
import { CreditCard, Building2, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'Deposit' | 'Withdrawal';
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  time: string;
}

interface Toast {
  type: 'success' | 'error';
  message: string;
}

const Wallet = () => {
  const [balance, setBalance] = useState(15304.11);
  const [availableFunds, setAvailableFunds] = useState(3000.00);
  const [investedAmount, setInvestedAmount] = useState(12304.11);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [toast, setToast] = useState<Toast | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'Deposit', amount: 5000, status: 'Completed', date: '2024-02-28', time: '14:30' },
    { id: 2, type: 'Withdrawal', amount: 2000, status: 'Pending', date: '2024-02-27', time: '09:15' },
    { id: 3, type: 'Deposit', amount: 3000, status: 'Completed', date: '2024-02-26', time: '11:45' },
  ]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      showToast('error', 'Please enter a valid amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'Deposit',
      amount: depositAmount,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + depositAmount);
    setAvailableFunds(prev => prev + depositAmount);
    // Update invested amount based on the new deposit
    setInvestedAmount(prev => prev + (depositAmount * 0.8)); // Assume 80% of deposit goes to investments
    setAmount('');
    setShowDepositModal(false);
    showToast('success', `Successfully deposited $${depositAmount.toLocaleString()}`);
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      showToast('error', 'Please enter a valid amount');
      return;
    }

    if (withdrawAmount > availableFunds) {
      showToast('error', 'Insufficient funds');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'Withdrawal',
      amount: withdrawAmount,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev - withdrawAmount);
    setAvailableFunds(prev => prev - withdrawAmount);
    // Update invested amount based on the withdrawal
    setInvestedAmount(prev => Math.max(0, prev - (withdrawAmount * 0.2))); // Assume 20% of withdrawal comes from investments
    setAmount('');
    setShowWithdrawModal(false);
    showToast('success', `Successfully withdrew $${withdrawAmount.toLocaleString()}`);
  };

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto relative mt-14">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white z-50`}
        >
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-white hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold text-white mb-6">Wallet</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Total Balance</p>
          <h3 className="text-3xl font-bold text-white">${balance.toLocaleString()}</h3>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Available Funds</p>
          <h3 className="text-3xl font-bold text-white">${availableFunds.toLocaleString()}</h3>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <p className="text-gray-400 mb-2">Invested Amount</p>
          <h3 className="text-3xl font-bold text-white">${investedAmount.toLocaleString()}</h3>
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
            <h3 className="text-white font-semibold mb-6">Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left pb-4">Type</th>
                    <th className="text-right pb-4">Amount</th>
                    <th className="text-right pb-4">Status</th>
                    <th className="text-right pb-4">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t border-gray-700">
                      <td className="py-4">
                        <div className="flex items-center">
                          {transaction.type === 'Deposit' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400 mr-2" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-400 mr-2" />
                          )}
                          <span className="text-white">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="text-right text-white">${transaction.amount.toLocaleString()}</td>
                      <td className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400'
                            : transaction.status === 'Pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="text-right text-gray-300">
                        <div>{transaction.date}</div>
                        <div className="text-sm text-gray-400">{transaction.time}</div>
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
            <h3 className="text-white font-semibold mb-4">Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <p className="text-white">•••• 4242</p>
                  <p className="text-sm text-gray-400">Expires 12/25</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                <Building2 className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <p className="text-white">Bank Account</p>
                  <p className="text-sm text-gray-400">•••• 1234</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Deposit Funds</h3>
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
              <div className="flex gap-4">
                <button
                  onClick={handleDeposit}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setShowDepositModal(false);
                    setAmount('');
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
            <h3 className="text-xl font-semibold text-white mb-4">Withdraw Funds</h3>
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
              <div className="flex gap-4">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setAmount('');
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