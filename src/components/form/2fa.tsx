"use client";

import { Shield } from "lucide-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import { cn } from "@/lib/utils";
import InputField from "../ui/input";

interface Props {
  is2FAEnabled?: boolean;
}

export default function TwoFactorAuth({ is2FAEnabled = false }: Props) {
  const [show2FAModal, setShow2FAModal] = useState(false);

  const handle2FAToggle = () => {
    setShow2FAModal(!show2FAModal);
  };

  const onClose = () => {
    setShow2FAModal(false);
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handle2FAToggle}
        disabled={is2FAEnabled}
        className={cn(
          "w-full py-3 rounded-lg flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white",
          is2FAEnabled && "bg-gray-600 hover:bg-gray-600 text-gray-500"
        )}
      >
        <Shield className="w-5 h-5" />
        Enable Two-Factor Authentication
      </button>
      {/* 2FA Modal */}
      <Modal
        isOpen={show2FAModal}
        onClose={onClose}
        title={"Enable Two-Factor Authentication"}
      >
        <form className="bg-gray-800 p-6 rounded-xl w-full max-w-md ">
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">
              Enter the 6-digit code from your authenticator app to enable 2FA.
            </p>
            <div>
              <InputField
                name="verificationCode"
                placeholder="Verification Code"
                label="Verification Code"
                type="search"
                icon="search"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-sm text-white p-2 rounded-lg"
              >
                Verify & Enable
              </button>
              <button
                onClick={onClose}
                className="bg-red-700 hover:bg-red-600 text-white py-2 px-3 rounded-lg "
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
