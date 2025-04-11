"use client";

import { ArrowDownRight } from "lucide-react";
import Modal from "./ui/Modal";
import InputField from "./ui/input";
import { useActionState, useCallback, useEffect, useState } from "react";
import { getBanks } from "@/lib/bank";
import toast from "react-hot-toast";
import WithdrawalAction from "@/actions/widrawal";
import SelectInput from "./ui/select";

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
    getBanks().then((data) => {
      if (Array.isArray(data)) {
        setBanks(data);
      } else {
        toast.error("Failed to load banks");
      }
    });
  }, []);

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
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 font-medium text-sm lg:text-md text-white transition-colors hover:bg-blue-600"
      >
        <ArrowDownRight className="h-3 w-3 md:h-5 md:w-5" />
        Withdraw
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
          {error?.message && (
            <p className="text-red-500 text-xs ml-2 my-3">{error.message}</p>
          )}
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
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
