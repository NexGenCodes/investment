"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [paymentMethods, setPaymentMethods] = useState<{ id: number, type: string, details: string }[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePaymentAdd = () => {
    if (isClient) {
      setPaymentMethods([
        ...paymentMethods,
        { id: Date.now(), type: "Card", details: "**** **** **** 5678" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundStart dark:bg-backgroundEnd flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground text-center pt-10">⚙️ Settings</h1>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Profile</h2>
            <Input
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleProfileChange}
              className="mb-3 bg-backgroundStart border border-gray-700 text-foreground"
            />
            <Input
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleProfileChange}
              className="mb-3 bg-backgroundStart border border-gray-700 text-foreground"
            />
            <Input
              name="phone"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={handleProfileChange}
              className="mb-3 bg-backgroundStart border border-gray-700 text-foreground"
            />
            <Button  className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Update Profile
            </Button>
          </div>

          {/* Password Update */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Change Password</h2>
            <Input
              type="password"
              name="current"
              placeholder="Current Password"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="mb-3 bg-backgroundStart border border-gray-700 text-foreground"
            />
            <Input
              type="password"
              name="new"
              placeholder="New Password"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="mb-3 bg-backgroundStart border border-gray-700 text-foreground"
            />
            <Input
              type="password"
              name="confirm"
              placeholder="Confirm New Password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="mb-3 bg-backgroundStart border border-gray-700 text-foreground"
            />
            <Button  className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500">
              Update Password
            </Button>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Payment Methods</h2>
            <div className="space-y-3">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div key={method.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow">
                    <span className="text-foreground">{method.type}: {method.details}</span>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No payment methods added.</p>
              )}
            </div>
            <Button onClick={handlePaymentAdd}  className="w-full mt-3 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
              Add New Card
            </Button>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Dark Mode</span>
          <button
            onClick={handleThemeToggle}
            className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-primaryAccent"
          >
            <div className={`w-4 h-4 bg-white dark:bg-yellow-500 rounded-full transform ${theme === "dark" ? "translate-x-6" : "translate-x-0"} transition duration-300`} />
          </button>
        </div>
      </div>
    </div>
  );
}
