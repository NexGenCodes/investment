"use client";

import { User } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import Modal from "./ui/Modal";
import InputField from "./ui/input";
import Flutterwave from "@/lib/flutterwave";
import toast from "react-hot-toast";
import deposit from "@/actions/deposit";
import { cn } from "@/lib/utils";

interface DepositProps {
  user: User | null;
}

const MIN_DEPOSIT_AMOUNT = 1000;

export default function Deposit({ user }: DepositProps) {
  const [isPending, setPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  const paymentConfig = useMemo(
    () => Flutterwave({ user, amount: depositAmount ?? MIN_DEPOSIT_AMOUNT }),
    [user, depositAmount]
  );
  const initiatePayment = useFlutterwave(paymentConfig);

  useEffect(() => {
    if (!depositAmount) return;
    initiatePayment({
      callback: async (response) => {
        try {
          if (response.status === "successful") {
            const { message } = await deposit(depositAmount);
            if (message === "Deposit successful") {
              toast.success(message);
            } else {
              toast.error(message);
            }
          } else {
            toast.error("Payment failed. Please try again.");
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred during deposit.");
        }
        setPending(false);
        setDepositAmount(null);
        closePaymentModal();
      },
      onClose: () => {
        setPending(false);
        setDepositAmount(null);
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

    if (amount < MIN_DEPOSIT_AMOUNT) {
      setError(`Amount must be greater than or equal to ${MIN_DEPOSIT_AMOUNT}`);
      return;
    }

    setError(undefined);
    setIsModalOpen(false);
    setPending(true);
    setDepositAmount(amount);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setError(undefined);
    setDepositAmount(null);
    setPending(false);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <button
        disabled={isPending}
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-sm lg:text-md text-white transition-colors",
          isPending
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        )}
        aria-label="Open deposit funds modal"
      >
        <ArrowUpRight className="h-3 w-3 md:h-5 md:w-5" />
        Deposit
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Deposit Funds">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-xl bg-gray-800 p-6"
        >
          <InputField
            name="amount"
            placeholder={`Enter amount (min ${MIN_DEPOSIT_AMOUNT})`}
            label="Amount"
            type="number"
            errors={error ? [error] : undefined}
            aria-describedby={error ? "amount-error" : undefined}
            required
            min={MIN_DEPOSIT_AMOUNT}
            step={1}
          />
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              disabled={isPending}
              aria-label="Deposit funds"
              className={cn(
                "flex-1 rounded-lg py-2 text-white transition-colors",
                isPending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              )}
            >
              {isPending ? "Processing..." : "Deposit"}
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
