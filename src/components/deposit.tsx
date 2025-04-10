"use client";

import { User } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import Modal from "./ui/Modal";
import { useCallback, useState } from "react";
import InputField from "./ui/input";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Flutterwave from "@/lib/flutterwave";

interface Props {
  user: User | null;
}

export default function Deposit({ user }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = Flutterwave({ user, amount });
  const handleDeposit = useFlutterwave(config);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const inputAmount = Number(e.currentTarget.amount.value);

      if (!inputAmount) {
        setError("Please enter an amount");
        return;
      }
      if (inputAmount <= 1000) {
        setError("Amount must be greater than 1000");
        return;
      }

      setError(undefined);
      setIsSubmitting(true);
      setAmount(inputAmount);

      handleDeposit({
        callback: (response) => {
          setIsSubmitting(false);
          if (response.status === "successful") {
            console.log(`Deposited ${inputAmount} successfully`);
            setIsModalOpen(false);
            setAmount(0); // Reset amount on success
          } else {
            setError("Payment failed. Please try again.");
          }
          closePaymentModal();
        },
        onClose: () => {
          setIsSubmitting(false);
          setIsModalOpen(false);
          closePaymentModal();
        },
      });
    },
    [handleDeposit]
  );

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => {
      if (prev) {
        // Closing modal
        setError(undefined);
        setIsSubmitting(false);
        setAmount(0);
      }
      return !prev;
    });
  }, []);

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={toggleModal}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition-colors flex items-center gap-2 text-md font-medium"
      >
        <ArrowUpRight className="w-5 h-5" />
        Deposit
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal} title="Deposit funds">
        <form className="bg-gray-800 p-6 rounded-xl w-full max-w-md" onSubmit={handleSubmit}>
          <InputField
            name="amount"
            placeholder="Enter amount"
            label="Amount"
            type="number"
            errors={error ? [error] : undefined}
            required
            min={1001}
            disabled={isSubmitting}
          />
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Deposit"}
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="bg-red-700 hover:bg-red-500 text-white py-2 px-3 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}