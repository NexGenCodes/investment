import { auth } from "@/lib/auth";
import WatchList from "@/components/watchList";
import PortfolioOverView from "@/components/pOverView";
import PortfolioPerformance from "@/components/pPerformance";
import { GetInvestments, GetUserFromDb } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user?.email
    ? await GetUserFromDb({ email: session.user.email })
    : null;

  if (!user) return redirect("/");

  const investments = await GetInvestments(user.email);

  return (
    <div className=" bg-gray-900 p-6 ">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white ">
          Welcome back
          <p className="text-green-500 first-letter:uppercase inline-block px-2">
            {user?.firstName}
          </p>
        </h1>
        <p className="text-gray-400">Here is an overview of your portfolio.</p>
      </div>
      <div className="mb-8">
        <div className="p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4">
          {investments?.map((d) => (
            <PortfolioPerformance key={d.id} data={d} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview - Full Width on Small Screens */}
          <PortfolioOverView />
          {/* Watchlist - Adjusted for Mobile */}
          <WatchList />
        </div>
      </div>
    </div>
  );
}
