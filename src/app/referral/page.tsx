import "../../style/globals.css";
import { whatPeopleSay } from "@/constants/testimony";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GetUserFromDb } from "@/lib/db";
import Link from "next/link";

export default async function SolarReferralPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/auth/login");
  const user = await GetUserFromDb({
    email,
  });
  if (!user) redirect("/auth/login");

  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto text-center bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen mt-28">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Refer & Earn with SunVault Investments
        </h1>

        <p className="text-lg mt-2 text-gray-200">
          Invite friends and earn up to{" "}
          <b className="text-green-600">₦50,000</b> per successful investment!
        </p>

        {/* How It Works Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200">How It Works</h2>
          <div className="mt-4 space-y-4 text-left">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-200">
                  Share Your Referral Link
                </h3>
                <p className="text-sm text-gray-400">
                  Copy your unique referral link and share it with friends,
                  family, or on social media.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-200">
                  Your Friends Sign Up
                </h3>
                <p className="text-sm text-gray-400">
                  When your friends sign up using your referral link, they get
                  started with Solar Invest.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-200">
                  They Make an Investment
                </h3>
                <p className="text-sm text-gray-400">
                  Once your friends make their first investment, you earn a
                  reward.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-200">Earn Rewards</h3>
                <p className="text-sm text-gray-400">
                  You earn <b className="text-green-400">₦1000</b> for every
                  successful referral. The more you refer, the more you earn!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Access Referral Code Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200">
            Access Your Referral Code
          </h2>
          <p className="text-sm mt-2 text-gray-400">
            You can find your referral code on your
            <Link
              href="/dashboard"
              className="text-blue-400 hover:text-yellow-400 hover:underline px-1"
            >
              portfolio page{" "}
            </Link>
            Use it to invite friends and start earning rewards!
          </p>
        </div>

        {/* total referrals */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200">
            Total Referrals
          </h2>
          <p className="text-sm mt-2 text-gray-400">
            you have referred{" "}
            <b className="text-green-400">
              {user?.referrals?.length || 0} friends
            </b>
          </p>
          <p className="text-sm mt-2 text-gray-400">
            You have earned{" "}
            <b className="text-green-400">
              ₦
              {user.referrals.filter((ref) => ref.balance || 0 > 0).length *
                1000}
            </b>{" "}
            in total.
          </p>
        </div>

        {/* Milestone Rewards */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200">
            Milestone Rewards
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
              <span className="text-gray-200">5 Referrals</span>
              <span className="font-semibold text-green-400">₦5000 Bonus</span>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
              <span className="text-gray-200">10 Referrals</span>
              <span className="font-semibold text-green-400">
                ₦10,000 Bonus
              </span>
            </div>
            <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
              <span className="text-gray-200">20 Referrals</span>
              <span className="font-semibold text-green-400">
                ₦20,000 Bonus
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200">
            What People Are Saying
          </h2>
          <div className="mt-4 space-y-4">
            {whatPeopleSay.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600"
              >
                <p className="text-gray-200">`{testimonial.message}`</p>
                <p className="text-sm mt-2 text-gray-400">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200">FAQs</h2>
          <div className="mt-4 space-y-3">
            <details className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
              <summary className="cursor-pointer font-semibold text-gray-200">
                How does the referral program work?
              </summary>
              <p className="text-sm mt-2 text-gray-400">
                Share your referral code. When someone invests, you earn
                rewards!
              </p>
            </details>
            <details className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
              <summary className="cursor-pointer font-semibold text-gray-200">
                How much can I earn?
              </summary>
              <p className="text-sm mt-2 text-gray-400">
                You earn{" "}
                <b className="text-green-400">₦1000 per successful investor</b>.
                No limits!
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
