"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell } from "lucide-react";

interface Notification {
  message: string;
  time: string;
}

export default function ReferredUser() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      setNotifications((prev) => [
        ...prev,
        {
          message: "Kayden William just joined using your referral!",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    //    Notifications Section
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
  );
}
