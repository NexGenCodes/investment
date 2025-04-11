import ReferralSection from "@/components/referral";
import sharePlatforms from "@/constants/share";
import { auth } from "@/lib/auth";
import { GetUserFromDb } from "@/lib/db";
import { Share2 } from "lucide-react";
import { Session } from "next-auth";

export default async function SolarReferralPage() {
  // Fetch session and user
  const session = (await auth()) as Session | null;
  const user = session?.user?.email
    ? await GetUserFromDb({ email: session.user.email })
    : null;

  // Define share data
  const referralCode: string = user?.referralCode ?? "N/A";
  const baseUrl: string =
    process.env.NEXT_PUBLIC_BASE_URL || "https://yourwebsite.com";

  return (
    <div className=" bg-gradient-to-b from-gray-900 to-gray-900 p-4 sm:p-6 text-center text-gray-200">
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Welcome,{" "}
        <span className="first-letter:uppercase">{user?.firstName}</span>
      </h1>
      <p className="mt-2 text-base sm:text-lg">
        Invite friends and earn <span className="text-green-500">₦1,000</span>{" "}
        per successful investment!
      </p>

      {/* Referral and Share Section */}
      <div className="my-8 space-y-6 mt-16">
        <ReferralSection referralCode={referralCode} />

        {/* Social Share Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {sharePlatforms.map(
            ({ name, href, getMessage, gradient, ariaLabel }) => {
              const message = encodeURIComponent(
                getMessage({ referralCode, baseUrl })
              );
              const url = encodeURIComponent(`${baseUrl}?ref=${referralCode}`);
              return (
                <a
                  key={name}
                  href={href({ message, url })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className={`flex min-w-[120px] items-center justify-center rounded-lg bg-gradient-to-r ${gradient} px-4 py-2 text-sm sm:text-base text-white transition-all flex-none`}
                >
                  <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  {name}
                </a>
              );
            }
          )}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mx-auto mt-[20%] w-full rounded-xl border border-gray-700 bg-gray-800 p-4  shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold">FAQs</h2>
        <div className="mt-4 space-y-4">
          <details className="rounded-lg bg-gray-700 p-3 transition-colors hover:bg-gray-600">
            <summary className="cursor-pointer font-medium">
              How does the referral program work?
            </summary>
            <p className="mt-2 text-sm text-gray-400">
              Share your referral code. Earn rewards when someone invests!
            </p>
          </details>
          <details className="rounded-lg bg-gray-700 p-3 transition-colors hover:bg-gray-600">
            <summary className="cursor-pointer font-medium">
              How much can I earn?
            </summary>
            <p className="mt-2 text-sm text-gray-400">
              Earn <span className="text-green-400">₦1,000</span> per successful
              investor. No limits!
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Refer Friends & Earn Rewards",
  description: "Invite friends to earn ₦1,000 per investment!",
};
