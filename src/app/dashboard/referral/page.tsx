"use client";
import { useState, useEffect } from "react";
import { Copy, Share2 } from "lucide-react";

interface Notification {
  message: string;
  time: string;
}

interface User {
  id: string;
  name: string;
  referralCode: string;
  earnings: number;
  referrals: number;
  notifications: Notification[];
}

export default function SolarReferralPage() {
  // Simulate a logged-in user (fetch this from your backend in a real app)
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate fetching user data after login
    const fetchUserData = async () => {
      // Replace this with an actual API call to fetch user data
      const userData: User = {
        id: "123",
        name: "Naya Rachel",
        referralCode: "SOLAR123",
        earnings: 250,
        referrals: 5,
        notifications: [
          { message: "User A joined using your referral!", time: "10:00 AM" },
          { message: "User B joined using your referral!", time: "11:30 AM" },
        ],
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const copyToClipboard = () => {
    if (user) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!user) {
    return <div className="p-6 max-w-4xl mx-auto text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-center bg-gradient-to-b from-gray-900 to-gray-900 min-h-screen mt-16">
      {/* Welcome Section */}
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Welcome, {user.name}!
      </h1>
      <p className="text-base md:text-lg mt-2 text-gray-200">
        Invite friends and earn up to <b className="text-green-600">$500</b> per successful investment!
      </p>

      {/* Referral Code Section */}
      <div className="mt-8 bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg md:text-xl font-semibold text-gray-200">Your Referral Code</h2>
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-3 bg-gray-700 p-3 rounded-lg">
          <span className="text-lg md:text-xl font-semibold text-gray-200">{user.referralCode}</span>
          <button
            onClick={copyToClipboard}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:from-blue-700 hover:to-blue-600 transition-all"
          >
            <Copy className="w-4 h-4 mr-2" /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Social Share Buttons */}
      <div className="mt-6 flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-green-600 hover:to-green-700 transition-all">
          <Share2 className="w-4 h-4 mr-2" /> WhatsApp
        </button>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all">
          <Share2 className="w-4 h-4 mr-2" /> Facebook
        </button>
        <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:from-gray-600 hover:to-gray-700 transition-all">
          <Share2 className="w-4 h-4 mr-2" /> Email
        </button>
      </div>

      {/* Dashboard Section */}
      <div className="mt-8 bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-lg md:text-xl font-semibold text-gray-200">Your Dashboard</h2>
        <div className="mt-4 bg-gradient-to-r from-blue-700 to-blue-600 p-4 rounded-lg flex flex-col md:flex-row justify-between text-gray-200">
          <span className="mb-2 md:mb-0">Total Earnings: <b className="text-blue-300">${user.earnings}</b></span>
          <span>Referrals: <b className="text-blue-300">{user.referrals}</b></span>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mt-8 bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-700">
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
              You earn <b className="text-green-400">$100 per successful investor</b>. No limits!
            </p>
          </details>
        </div>
      </div>

      {/* Floating Copy Referral Link Button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={copyToClipboard}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg"
        >
          <Copy className="w-4 h-4 mr-2" /> Copy Referral Link
        </button>
      </div>
    </div>
  );
}