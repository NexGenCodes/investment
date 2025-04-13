"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import WithdrawalAction from "@/actions/withdrawal";
import { ArrowDownRight } from "lucide-react";
import { getBanks } from "@/lib/bank";
import SelectInput from "./ui/select";
import InputField from "./ui/input";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Modal from "./ui/Modal";

interface Bank {
  value: string;
  label: string;
}

export default function Withdrawal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [state, Action, isPending] = useActionState(
    WithdrawalAction,
    undefined
  );

  useEffect(() => {
    if (!isModalOpen) return;
    getBanks().then((data) => {
      if (Array.isArray(data)) {
        setBanks(data);
      } else {
        toast.error("Failed to load banks");
      }
    });
  }, [isModalOpen]);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      setIsModalOpen(false);
      toast.success(state.message || "Withdrawal successful");
    }
    if (state.success === false) {
      toast.error(state.message || "Withdrawal failed");
    }
  }, [state]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <button
        disabled={isPending}
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors sm:px-4 sm:py-2 sm:text-md lg:rounded-xl",
          isPending
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        )}
        aria-label="Open withdrawal  modal"
      >
        <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="sm:inline hidden">Withdraw</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Withdraw Funds">
        <form action={Action} className="w-full rounded-xl bg-gray-800 p-6">
          <InputField
            name="amount"
            placeholder="Enter amount"
            label="Amount"
            type="number"
            errors={state ? state.errors?.amount : undefined}
            required
            min={1000}
            step={1}
          />
          <SelectInput
            name="bank"
            list={banks}
            errors={state ? state.errors?.bankCode : undefined}
          />
          <InputField
            name="accountNumber"
            placeholder="Enter account number"
            label="Account Number"
            type="text"
            errors={state ? state.errors?.accountNumber : undefined}
            required
            maxLength={10}
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
              {isPending ? "Processing..." : "Withdraw"}
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
