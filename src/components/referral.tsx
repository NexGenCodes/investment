"use client";
import { useState } from "react";
import { Copy } from "lucide-react";

interface Props {
  referralCode?: string;
}

export default function ReferralSection({ referralCode }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <div>
      <div className="my-6 bg-gray-800  p-4 rounded-xl shadow-lg border border-gray-700 w-full mx-auto md:w-[500px] lg:w-[800px]">
        <h2 className="text-sm font-semibold text-gray-200">
          Your Referral Code
        </h2>
        <div className="mt-4 flex flex-row justify-center items-center space-x-3 bg-gray-700 rounded-lg w-full py-6">
          <span className="text-lg md:text-xl font-semibold text-gray-200 break-words">
            {referralCode}
          </span>
          <button
            onClick={copyToClipboard}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:from-blue-700 hover:to-blue-600 transition-all"
          >
            <Copy className="w-4 h-4 mr-2" /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="fixed bottom-4 inset-x-0 flex justify-end px-4 w-full">
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
