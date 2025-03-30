import { ArrowUpRight } from "lucide-react";
import { auth } from "@/lib/auth"; // Import auth function
import WatchList from "@/components/watchList";
import MockData from "@/constants/mockdata";
import PortfolioOverView from "@/components/pOverView";
import SearchForm from "@/components/search";
import PortfolioPerformance from "@/components/pPerformance";
import { redirect } from "next/navigation";
import { GetUserFromDb } from "@/lib/db";

const Dashboard = async () => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/auth/login");
  const user = await GetUserFromDb({
    email,
  });
  if (!user) redirect("/auth/login");

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto mt-14">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-400">Here is an overview of your portfolio.</p>
      </div>

      {/* search */}
      <SearchForm />
      <div className="mb-8">
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 mb-2">Total Holding</p>
              <h2 className="text-4xl font-bold text-white">
                ₦{MockData.totalHolding.toLocaleString("en-NG")}
              </h2>
              <p className="text-green-400 flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +₦{MockData.return.toLocaleString("en-NG")}
              </p>
            </div>
          </div>

          <PortfolioPerformance />
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
};

export default Dashboard;
