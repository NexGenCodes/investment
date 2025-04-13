import { User, Shield } from "lucide-react";
import ChangePwd from "@/components/form/changePwd";
import UpdateForm from "@/components/form/updateForm";
import { auth } from "@/lib/auth";
import { GetUserFromDb } from "@/lib/db";
import { redirect } from "next/navigation";
// import TwoFactorAuth from "@/components/form/2fa";

export default async function Settings() {
  const session = await auth();
  const user = session?.user?.email
    ? await GetUserFromDb({ email: session.user.email })
    : null;
  if (!user) return redirect("/dashboard");

  return (
    <div className=" bg-gray-900 p-6 transition-colors duration-200 ">
      <h2 className="first-letter:text-xl font-bold text-white mb-6">
        Settings
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 ">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-6 h-6 text-blue-400" />
            <h3 className={` text-white font-semibold`}>Profile Settings</h3>
          </div>
          <UpdateForm data={user || undefined} />
        </div>
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-semibold">Security Settings</h3>
            </div>
            <div className="space-y-4">
              {/* change password */}
              <ChangePwd />
              {/* <TwoFactorAuth /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
