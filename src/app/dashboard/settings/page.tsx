"use client";
import React, { useState } from "react";
import {
  User,
  Bell,
  Moon,
  Shield,
  Link,
  Lock,
  X,
  Eye,
  EyeOff,
  Sun,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

interface LinkedAccount {
  id: string;
  type: string;
  status: string;
  lastUsed: string;
}

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([
    {
      id: "1",
      type: "Brokerage Account",
      status: "Connected",
      lastUsed: "2024-03-10",
    },
    {
      id: "2",
      type: "Bank Account",
      status: "Connected",
      lastUsed: "2024-03-12",
    },
  ]);

  const [passwordForm, setPasswordForm] = useState<PasswordChangeForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [verificationCode, setVerificationCode] = useState("");

  // Add state for user profile
  const [userProfile, setUserProfile] = useState({
    fullName: "Naya Rachel",
    email: "naya@example.com",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword.length < 8) {
      showToast("error", "Password must be at least 8 characters long");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    showToast("success", "Password changed successfully");
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handle2FAToggle = () => {
    if (!is2FAEnabled) {
      setShow2FAModal(true);
    } else {
      setIs2FAEnabled(false);
      showToast("success", "Two-factor authentication disabled");
    }
  };

  const handleVerify2FA = () => {
    if (verificationCode.length !== 6) {
      showToast("error", "Please enter a valid 6-digit code");
      return;
    }

    setIs2FAEnabled(true);
    setShow2FAModal(false);
    setVerificationCode("");
    showToast("success", "Two-factor authentication enabled");
  };

  const handleThemeChange = (isDark: boolean) => {
    toggleTheme(isDark);
    showToast("success", `Theme switched to ${isDark ? "Dark" : "Light"} Mode`);
  };

  const handleDisconnectAccount = (accountId: string) => {
    setLinkedAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.id !== accountId)
    );
    showToast("success", "Account disconnected successfully");
  };

  // Handle profile changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Save profile changes
  const saveProfileChanges = () => {
    showToast("success", "Profile changes saved successfully");
  };

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const cardBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const inputBgColor = isDarkMode ? "bg-gray-700" : "bg-gray-100";

  return (
    <div
      className={`flex-1 ${bgColor} p-6 overflow-y-auto relative transition-colors duration-200 mt-16`}
    >
      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white z-50`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-white hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <h2 className={`text-2xl font-bold ${textColor} mb-6`}>Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div
            className={`${cardBgColor} rounded-xl p-6 transition-colors duration-200`}
          >
            <div className="flex items-center gap-4 mb-6">
              <User className="w-6 h-6 text-blue-400" />
              <h3 className={`${textColor} font-semibold`}>Profile Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userProfile.fullName}
                  onChange={handleProfileChange}
                  className={`w-full ${inputBgColor} ${textColor} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleProfileChange}
                  className={`w-full ${inputBgColor} ${textColor} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                />
              </div>
              {/* Save Button */}
              <button
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors`}
                onClick={saveProfileChanges}
              >
                Save Changes
              </button>
            </div>
          </div>

          <div
            className={`${cardBgColor} rounded-xl p-6 transition-colors duration-200`}
          >
            <div className="flex items-center gap-4 mb-6">
              <Bell className="w-6 h-6 text-blue-400" />
              <h3 className={`${textColor} font-semibold`}>
                Notification Preferences
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={textColor}>Email Notifications</p>
                  <p className="text-sm text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={textColor}>SMS Notifications</p>
                  <p className="text-sm text-gray-400">
                    Receive updates via SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div
            className={`${cardBgColor} rounded-xl p-6 transition-colors duration-200`}
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h3 className={`${textColor} font-semibold`}>
                Security Settings
              </h3>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setShowPasswordModal(true)}
                className={`w-full ${inputBgColor} hover:bg-gray-600 ${textColor} py-3 rounded-lg transition-colors flex items-center justify-center gap-2`}
              >
                <Lock className="w-5 h-5" />
                Change Password
              </button>
              <button
                onClick={handle2FAToggle}
                className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  is2FAEnabled
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <Shield className="w-5 h-5" />
                {is2FAEnabled ? "Disable" : "Enable"} Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className={`${cardBgColor} rounded-xl p-6 transition-colors duration-200`}
          >
            <div className="flex items-center gap-4 mb-6">
              {isDarkMode ? (
                <Moon className="w-6 h-6 text-blue-400" />
              ) : (
                <Sun className="w-6 h-6 text-blue-400" />
              )}
              <h3 className={`${textColor} font-semibold`}>
                Theme Preferences
              </h3>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleThemeChange(true)}
                className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isDarkMode
                    ? "bg-blue-500 text-white cursor-default"
                    : `${inputBgColor} hover:bg-gray-600 ${textColor}`
                }`}
                disabled={isDarkMode}
              >
                <Moon className="w-5 h-5" />
                Dark Mode
              </button>
              <button
                onClick={() => handleThemeChange(false)}
                className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  !isDarkMode
                    ? "bg-blue-500 text-white cursor-default"
                    : `${inputBgColor} hover:bg-gray-600 ${textColor}`
                }`}
                disabled={!isDarkMode}
              >
                <Sun className="w-5 h-5" />
                Light Mode
              </button>
            </div>
          </div>

          <div
            className={`${cardBgColor} rounded-xl p-6 transition-colors duration-200`}
          >
            <div className="flex items-center gap-4 mb-6">
              <Link className="w-6 h-6 text-blue-400" />
              <h3 className={`${textColor} font-semibold`}>Linked Accounts</h3>
            </div>
            <div className="space-y-4">
              {linkedAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`flex items-center justify-between p-3 ${inputBgColor} rounded-lg transition-colors duration-200`}
                >
                  <div>
                    <p className={textColor}>{account.type}</p>
                    <p className="text-sm text-gray-400">
                      Last used: {account.lastUsed}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDisconnectAccount(account.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ))}
              {linkedAccounts.length === 0 && (
                <p className="text-gray-400 text-center py-4">
                  No accounts linked
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`${cardBgColor} p-6 rounded-xl w-full max-w-md transition-colors duration-200`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-semibold ${textColor}`}>
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className={`w-full ${inputBgColor} ${textColor} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-colors duration-200`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className={`w-full ${inputBgColor} ${textColor} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full ${inputBgColor} ${textColor} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Change Password
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordForm({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className={`flex-1 ${inputBgColor} hover:bg-gray-600 ${textColor} py-2 rounded-lg transition-colors`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`${cardBgColor} p-6 rounded-xl w-full max-w-md transition-colors duration-200`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-semibold ${textColor}`}>
                Enable Two-Factor Authentication
              </h3>
              <button
                onClick={() => setShow2FAModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">
                Enter the 6-digit code from your authenticator app to enable
                2FA.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 6) {
                      setVerificationCode(value);
                    }
                  }}
                  className={`w-full ${inputBgColor} ${textColor} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleVerify2FA}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  Verify & Enable
                </button>
                <button
                  onClick={() => {
                    setShow2FAModal(false);
                    setVerificationCode("");
                  }}
                  className={`flex-1 ${inputBgColor} hover:bg-gray-600 ${textColor} py-2 rounded-lg transition-colors`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;