"use client";

import { useActionState, useState } from "react";
import { Lock } from "lucide-react";
import InputField from "../ui/input";
import Modal from "../ui/Modal";
import UpdatePwd from "@/actions/changePwd";

export default function ChangePwd() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, Action, isPending] = useActionState(UpdatePwd, undefined);

  const onClose = () => setShowPasswordModal(false);

  return (
    <div className="flex items-center justify-between relative">
      <button
        onClick={() => setShowPasswordModal(true)}
        className="w-full bg-gray-700 hover:bg-gray-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
      >
        <Lock className="w-5 h-5" />
        Change Password
      </button>

      {/* Password Change Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={onClose}
        title={" Change Password"}
      >
        <form
          className="bg-gray-800 p-6 rounded-xl w-full max-w-md"
          action={Action}
        >
          <InputField
            name="currentPassword"
            placeholder="Current Password"
            label="Current Password"
            type="password"
            icon="password"
            errors={error?.errors?.currentPassword}
            required
          />
          <InputField
            name="newPassword"
            placeholder="New Password"
            label="New Password"
            type="password"
            icon="password"
            errors={error?.errors?.newPassword}
            required
          />
          <InputField
            name="confirmPassword"
            placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            icon="password"
            errors={error?.errors?.confirmPassword}
            required
          />
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
            >
              {isPending ? "Changing Password..." : "Change Password"}
            </button>
            <button
              onClick={() => setShowPasswordModal(false)}
              className=" bg-red-700 hover:bg-red-500 text-white py-2 rounded-lg px-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
