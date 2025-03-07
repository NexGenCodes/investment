import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export default function ExportButtons({ transactions }: Props) {
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Stock", "Amount", "Date", "Updated Balance"]],
      body: transactions.map((txn) => [
        txn.stock,
        `₦${txn.amount}`,
        new Date(txn.date).toLocaleString(), // Format date
        `₦${txn.updatedBalance.toFixed(2)}`,
      ]),
    });
    doc.save("transactions.pdf");
  };

  return (
    <div className="mt-4">
      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Export PDF
      </button>
    </div>
  );
}
