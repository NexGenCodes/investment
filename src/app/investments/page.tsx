import InvestmentCard from "@/components/investmentCard";
import InvestmentPlans from "@/constants/investmentPlan";
import { auth } from "@/lib/auth";
import { GetInvestments } from "@/lib/db";
import { getInvestmentByPlanName, isPlanActive } from "@/lib/utils";

export default async function InvestmentsPage() {
  const session = await auth();
  const investments = session?.user?.email
    ? await GetInvestments(session.user.email)
    : null;

  const isPlanDisabled = (planName: string, duration: number) => {
    if (!investments) return false;
    const investment = getInvestmentByPlanName(investments, planName);
    return investment ? isPlanActive(investment.createdAt, duration) : false;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-[70px] text-center min-h-screen flex flex-col pb-8">
      <div className="flex flex-col items-center text-center px-6 md:px-16 space-y-8 mt-14">
        {/* Title & Description */}
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg leading-tight">
            <span>Invest in Solar Innovation</span> <br />
            <span>Own a piece of the future</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-300 mt-4 italic">
            Choose a solar equipment part to invest in and earn up to 50%
            returns as we manufacture and sell it globally.
          </p>
        </div>

        {/* Plan Cards Section */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-8">
            Our Plan Cards
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow mx-2">
        {InvestmentPlans.map((investment) => (
          <InvestmentCard
            key={investment.name}
            data={investment}
            disabled={isPlanDisabled(investment.name, investment.duration)}
          />
        ))}
      </div>
      <div>
        {/* Tax Disclaimer Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg mx-2">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Understanding Your Returns
          </h2>
          <p className="text-gray-300">
            All investment returns are subject to a 10% withholding tax as
            required by Nigerian law. This tax is deducted before your returns
            are paid out, ensuring compliance with local regulations. For
            example, if your investment earns a 50% return, your net return
            after tax will be 45%. We handle all tax filings and deductions on
            your behalf, so you can focus on earning returns.
          </p>
        </div>
        {/* Contact Option */}
        <div className="mt-8 text-center">
          <p className="text-gray-300">Have questions?</p>
          <button className="text-blue-500 hover:underline">Contact Us</button>
        </div>
      </div>
    </div>
  );
}
