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
    <div className="bg-gray-900 p-6 min-h-screen ">
      {/* Welcome Message */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white ">
          Welcome back,{" "}
          <span className="text-green-500 first-letter:uppercase">
            {user?.firstName?.toUpperCase()}
          </span>
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Here is an overview of your portfolio.
        </p>
      </div>

      {/* Portfolio Performance Section */}
      <div className="mb-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {investments?.map((d) => (
            <PortfolioPerformance key={d.id} data={d} />
          ))}
        </div>
      </div>

      {/* Portfolio Overview and Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio Overview */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
          <PortfolioOverView />
        </div>

        {/* Watchlist */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <WatchList />
        </div>
      </div>
    </div>
  );
}
