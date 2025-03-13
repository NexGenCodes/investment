"use client";
import { useState, useEffect } from "react";
import { Bell, Trophy} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

interface Notification {
  message: string;
  time: string;
}

interface Testimonial {
  name: string;
  message: string;
}

export default function SolarReferralPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [leaderboard] = useState([
    { name: "Alice Green", earnings: 500 },
    { name: "David Lee", earnings: 450 },
    { name: "Chris Brown", earnings: 300 },
  ]);
  const [dashboard] = useState({ earnings: 250, referrals: 5 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [testimonials] = useState<Testimonial[]>([
    {
      name: "Alice Green",
      message: "I earned $500 in just a month by referring friends. It's so easy!",
    },
    {
      name: "David Lee",
      message: "The referral program is a game-changer. Highly recommend it!",
    },
  ]);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      setNotifications((prev) => [
        ...prev,
        { message: "John Smith just joined using your referral!", time: new Date().toLocaleTimeString() },
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Trigger confetti when a milestone is reached
    if (dashboard.referrals === 5 || dashboard.referrals === 10) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [dashboard.referrals]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-center bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen mt-28">
      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Refer & Earn with SunVault Investments
      </h1>
      <p className="text-lg mt-2 text-gray-200">
        Invite friends and earn up to <b className="text-green-600">$500</b> per successful investment!
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
              <h3 className="font-semibold text-gray-200">Share Your Referral Link</h3>
              <p className="text-sm text-gray-400">
                Copy your unique referral link and share it with friends, family, or on social media.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-200">Your Friends Sign Up</h3>
              <p className="text-sm text-gray-400">
                When your friends sign up using your referral link, they get started with Solar Invest.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-400 font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-200">They Make an Investment</h3>
              <p className="text-sm text-gray-400">
                Once your friends make their first investment, you earn a reward.
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
                You earn <b className="text-green-400">$100</b> for every successful referral. The more you refer, the more you earn!
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* Access Referral Code Section */}
       <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">Access Your Referral Code</h2>
        <p className="text-sm mt-2 text-gray-400">
          You can find your referral code on your portfolio page. Use it to invite friends and start earning rewards!
        </p>
      </div>

      {/* Milestone Rewards */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">Milestone Rewards</h2>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
            <span className="text-gray-200">5 Referrals</span>
            <span className="font-semibold text-green-400">$100 Bonus</span>
          </div>
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
            <span className="text-gray-200">10 Referrals</span>
            <span className="font-semibold text-green-400">$250 Bonus</span>
          </div>
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all">
            <span className="text-gray-200">20 Referrals</span>
            <span className="font-semibold text-green-400">$500 Bonus</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200 flex items-center">
          Leaderboard <Trophy className="ml-2 w-6 h-6 text-yellow-400" />
        </h2>
        <ul className="mt-4 space-y-2">
          {leaderboard.map((user, index) => (
            <li
              key={index}
              className={`flex justify-between items-center bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all ${index === 0 ? "border-2 border-yellow-400" : ""}`}
            >
              <span className="text-gray-200">
                {index + 1}. {user.name} {index === 0 && "👑"}
              </span>
              <span className="font-semibold text-green-400">${user.earnings}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200 flex items-center">
          Real-time Notifications <Bell className="ml-2 w-6 h-6 text-red-400" />
        </h2>
        <div className="mt-4 bg-yellow-900 p-4 rounded-lg h-40 overflow-auto">
          <AnimatePresence>
            {notifications.map((notif, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b border-yellow-800 py-2"
              >
                <p className="text-gray-200">{notif.message}</p>
                <small className="text-gray-400">{notif.time}</small>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">What People Are Saying</h2>
        <div className="mt-4 space-y-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-all"
            >
              <p className="text-gray-200">`{testimonial.message}`</p>
              <p className="text-sm mt-2 text-gray-400">- {testimonial.name}</p>
            </motion.div>
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
    </div>
  );
}