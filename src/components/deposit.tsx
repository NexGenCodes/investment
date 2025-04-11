"use client";

import { User } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Modal from "./ui/Modal";
import InputField from "./ui/input";
import Flutterwave from "@/lib/flutterwave";
import toast from "react-hot-toast";

interface DepositProps {
  user: User | null;
}

export default function Deposit({ user }: DepositProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [depositAmount, setDepositAmount] = useState<number>(0);

  const paymentConfig = Flutterwave({ user, amount: depositAmount });
  const initiatePayment = useFlutterwave(paymentConfig);

  useEffect(() => {
    if (depositAmount === 0) return;
    if (depositAmount < 1000) {
      setError("Amount must be greater than or equal to 1000");
      setIsModalOpen(true);
      setDepositAmount(0);
      return;
    }
    initiatePayment({
      callback: (response) => {
        if (response.status === "successful") {
          console.log(`Successfully deposited ${depositAmount}`);
          toast.success("Deposit successful");
        } else {
          setError("Payment failed. Please try again.");
          toast.error("Payment failed. Please try again.");
        }
        setDepositAmount(0);
        closePaymentModal();
      },
      onClose: () => {
        setDepositAmount(0);
        setError(undefined);
        closePaymentModal();
      },
    });
  }, [depositAmount, initiatePayment]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = Number(e.currentTarget.amount.value);

    if (Number.isNaN(amount) || amount === 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amount < 1000) {
      setError("Amount must be greater than or equal to 1000");
      return;
    }

    setError(undefined);
    setIsModalOpen(false);
    setDepositAmount(amount);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setError(undefined);
    setDepositAmount(0);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 font-medium text-md text-white transition-colors hover:bg-blue-600"
      >
        <ArrowUpRight className="h-5 w-5" />
        Deposit
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Deposit Funds">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-xl bg-gray-800 p-6"
        >
          <InputField
            name="amount"
            placeholder="Enter amount"
            label="Amount"
            type="number"
            errors={error ? [error] : undefined}
            required
            min={1000}
            step={1}
          />
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Deposit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg bg-red-700 px-3 py-2 text-white transition-colors hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
