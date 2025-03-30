import { User, Shield } from "lucide-react";
// import TwoFactorAuth from "@/components/form/2fa";
import ChangePwd from "@/components/form/changePwd";
import UpdateForm from "@/components/form/updateForm";
import { auth } from "@/lib/auth";
import { GetUserFromDb } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Settings() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect("/auth/login");
  const user = await GetUserFromDb({
    email,
  });
  if (!user) redirect("/auth/login");

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto transition-colors duration-200 mt-16">
      <h2 className="first-letter:text-xl font-bold text-white mb-6">
        Settings
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 ">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-6 h-6 text-blue-400" />
            <h3 className={` text-white font-semibold`}>Profile Settings</h3>
          </div>
        </div>
        <UpdateForm user={user} />
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-semibold">General Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white">Email Notifications</p>
                  <p className="text-xs text-gray-400">
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
              <ChangePwd />
              {/* <TwoFactorAuth /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
