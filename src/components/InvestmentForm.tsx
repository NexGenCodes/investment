import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ExportButtons from "@/components/ExportButtons";

// Define interfaces
interface InvestmentFormInputs {
  amount: number;
  stock: string;
  riskLevel: "Low" | "Medium" | "High";
}

interface Transaction {
  id: string;
  stock: string;
  amount: number;
  date: string;
  updatedBalance: number;
}

interface Props {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  onClose: () => void;
}

export default function InvestmentForm({
  walletBalance,
  setWalletBalance,
  setTransactions,
  transactions,
  onClose,
}: Props) {
  const [selectedInvestment, setSelectedInvestment] = useState<Transaction | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvestmentFormInputs>();

  const onSubmit: SubmitHandler<InvestmentFormInputs> = (data) => {
    if (data.amount > walletBalance) {
      setMessage({ type: "error", text: "Insufficient balance!" });
      return;
    }

    setSelectedInvestment({
      id: `txn-${Date.now()}`,
      stock: data.stock,
      amount: data.amount,
      date: new Date().toISOString(),
      updatedBalance: walletBalance - data.amount,
    });

    reset();
  };

  const confirmInvestment = () => {
    if (!selectedInvestment) return;

    if (walletBalance < selectedInvestment.amount) {
      setMessage({ type: "error", text: "Insufficient balance to confirm investment." });
      return;
    }

    const newTransaction: Transaction = {
      ...selectedInvestment,
      updatedBalance: walletBalance - selectedInvestment.amount,
    };

    // Update wallet balance
    setWalletBalance((prev) => prev - selectedInvestment.amount);

    // Update transactions
    setTransactions((prev) => [...prev, newTransaction]);

    // Show success message
    setMessage({ type: "success", text: "Investment successful!" });

    // Close the modal after 2 seconds
    setTimeout(() => {
      onClose(); // Close the modal
    }, 2000);
  };

  return (
    <div className="p-6">
      <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-lg font-bold text-gray-900">
          Wallet Balance: ₦{walletBalance.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900">Stock</label>
          <input
            {...register("stock", { required: "Stock is required" })}
            className="mt-1 p-2 w-full border rounded text-gray-900 bg-white"
          />
          {errors.stock && <p className="text-red-600 text-sm font-medium">{errors.stock.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Amount (₦)</label>
          <input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be greater than 0" },
              max: { value: walletBalance, message: "Insufficient balance" },
            })}
            className="mt-1 p-2 w-full border rounded text-gray-900 bg-white"
          />
          {errors.amount && <p className="text-red-600 text-sm font-medium">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">Risk Level</label>
          <select
            {...register("riskLevel", { required: "Select a risk level" })}
            className="mt-1 p-2 w-full border rounded text-gray-900 bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.riskLevel && <p className="text-red-600 text-sm font-medium">{errors.riskLevel.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Invest Now
        </button>
      </form>

      <ExportButtons transactions={transactions} />

      {/* Confirmation Section */}
      {selectedInvestment && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">Confirm Investment</h3>
          <div className="mt-2 text-black">
            <p>Stock: {selectedInvestment.stock}</p>
            <p>Amount: ₦{selectedInvestment.amount}</p>
            <p>Updated Balance: ₦{selectedInvestment.updatedBalance.toFixed(2)}</p>
          </div>
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-white ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message.text} {/* Ensure the message text is displayed here */}
            </div>
          )}
          <div className="mt-4">
            <button
              className="bg-blue-100 px-4 py-2 text-blue-900 rounded-md hover:bg-blue-200"
              onClick={confirmInvestment}
            >
              Confirm
            </button>
            <button
              className="ml-3 bg-red-100 px-4 py-2 text-red-900 rounded-md hover:bg-red-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}