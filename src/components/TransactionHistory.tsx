import { useState } from "react";

interface Transaction {
  id: string;
  stock: string;
  amount: number;
  date: string;
  updatedBalance: number;
}

interface Props {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: Props) {
  const [filters, setFilters] = useState({
    dateRange: "",
    stockType: "",
    amountRange: "",
  });

  const filteredTransactions = transactions.filter((txn) => {
    return (
      (!filters.dateRange || txn.date.includes(filters.dateRange)) &&
      (!filters.stockType || txn.stock === filters.stockType) &&
      (!filters.amountRange || txn.amount <= parseFloat(filters.amountRange))
    );
  });

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          className="p-2 border rounded"
        />
        <select
          onChange={(e) => setFilters({ ...filters, stockType: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Stocks</option>
          <option value="Solar Panel Investment">Solar Panel</option>
          <option value="Wind Energy Investment">Wind Energy</option>
        </select>
        <input
          type="number"
          placeholder="Max Amount"
          onChange={(e) => setFilters({ ...filters, amountRange: e.target.value })}
          className="p-2 border rounded"
        />
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Updated Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((txn) => (
            <tr key={txn.id}>
              <td className="py-2 px-4 border">{txn.stock}</td>
              <td className="py-2 px-4 border">₦{txn.amount}</td>
              <td className="py-2 px-4 border">{new Date(txn.date).toLocaleString()}</td>
              <td className="py-2 px-4 border">₦{txn.updatedBalance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
