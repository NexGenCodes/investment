"use client";

import createInvestment from "@/actions/investment";
import { InvestmentPlan } from "@/types/investment";
import Image from "next/image";
import {
  useActionState,
  useTransition,
  useEffect,
  memo,
  useCallback,
} from "react";
import toast from "react-hot-toast";

const riskColors: Record<InvestmentPlan["riskLevel"], string> = {
  Low: "bg-green-500 text-white",
  Medium: "bg-yellow-500 text-black",
  High: "bg-red-500 text-white",
};

const InvestmentCard = memo(({ data }: { data: InvestmentPlan }) => {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(createInvestment, undefined);

  const handleInvest = useCallback(() => {
    startTransition(() => formAction(data));
  }, [data, formAction]);

  useEffect(() => {
    if (!state) return;

    const toastMethod = state.success ? toast.success : toast.error;
    toastMethod(state.message || "An error occurred");
    console.log(state.success ? "success" : "error");
  }, [state]);

  const riskColorClass = riskColors[data.riskLevel] || "bg-gray-500 text-white";
  const buttonText = isPending ? "Investing..." : `Invest in ${data.name}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-lg transition-transform hover:scale-105">
      <div className="relative h-48 w-full overflow-hidden rounded-xl">
        <Image
          src={data.imageUrl}
          alt={data.name}
          loading="lazy"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col items-center p-5 text-center">
        <h2 className="mb-2 text-lg font-bold text-white md:text-2xl">
          {data.name}
        </h2>
        <p className="mb-2 text-sm italic text-gray-300">{data.description}</p>
        <div className="flex items-center text-sm text-gray-300">
          Risk Level:
          <span
            className={`ml-2 rounded-lg px-3 py-1 text-xs font-semibold ${riskColorClass}`}
          >
            {data.riskLevel}
          </span>
        </div>
        <button
          className="mt-4 rounded-lg bg-[rgb(255,215,0)] px-6 py-2 text-sm font-semibold text-gray-900 shadow-md transition-colors hover:bg-gray-200 disabled:opacity-50"
          onClick={handleInvest}
          disabled={isPending}
          type="button" // Explicitly define button type
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
});

// Add display name for better debugging
InvestmentCard.displayName = "InvestmentCard";

export default InvestmentCard;
