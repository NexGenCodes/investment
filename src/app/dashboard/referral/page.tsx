import ReferralSection from "@/components/referral";
import { auth } from "@/lib/auth";
import { GetUserFromDb } from "@/lib/db";
import { Share2 } from "lucide-react";

export default async function SolarReferralPage() {
  const message = encodeURIComponent("Join this amazing platform!");
  const urlToShare = encodeURIComponent("https://yourwebsite.com");

  const session = await auth();
  const email = session?.user?.email;
  const user = await GetUserFromDb({
    email: email || "",
  });

  return (
    <div className="p-6 text-center bg-gradient-to-b from-gray-900 to-gray-900 ">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Welcome,{" "}
        <p className="first-letter:uppercase inline-block ">
          {user?.firstName}
        </p>
      </h1>
      <p className="text-base md:text-lg mt-2 text-gray-200">
        Invite friends and earn up to <b className="text-green-600">₦1000</b>{" "}
        per successful investment!
      </p>

      <div className="my-8 p-3 flex flex-col space-y-6">
        <ReferralSection referralCode={user?.referralCode} />

        {/* Social Share Buttons */}
        <div className="mt-6 flex  flex-row justify-center space-y-0 space-x-4">
          <a
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all"
            href={`https://wa.me/?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Share2 className="w-4 h-4 mr-2" /> WhatsApp
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <Share2 className="w-4 h-4 mr-2" /> Facebook
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(
              "Check this out!"
            )}&body=${encodeURIComponent(
              `I found this amazing platform. Have a look: ${urlToShare}`
            )}`}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-gray-600 hover:to-gray-700 transition-all"
          >
            <Share2 className="w-4 h-4 mr-2" /> Email
          </a>
        </div>
        <div className="mt-8">
          <div className="mt-4 bg-gradient-to-r from-blue-700 to-blue-500 p-4 rounded-lg flex flex-col text-gray-200 text-center">
            <span>
              Total Earnings:{" "}
              <b className="text-blue-300">
                ₦{" "}
                {user &&
                  user.referrals.filter((ref) => ref.balance || 0 > 0).length *
                    1000}
              </b>
            </span>
            <span>
              Referrals:{" "}
              <b className="text-blue-300">{user?.referrals.length}</b>
            </span>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mt-8 bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700 w-full">
        <h2 className="text-lg md:text-xl font-semibold text-gray-200">FAQs</h2>
        <div className="mt-4 space-y-3">
          <details className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
            <summary className="cursor-pointer font-semibold text-gray-200">
              How does the referral program work?
            </summary>
            <p className="text-sm mt-2 text-gray-400">
              Share your referral code. When someone invests, you earn rewards!
            </p>
          </details>
          <details className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
            <summary className="cursor-pointer font-semibold text-gray-200">
              How much can I earn?
            </summary>
            <p className="text-sm mt-2 text-gray-400">
              You earn{" "}
              <b className="text-green-400">₦100,000 per successful investor</b>
              . No limits!
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
