import OtpForm from "@/components/form/otpform";
import { auth } from "@/lib/auth";
import { getCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function OtpPage() {
  const cookie = await getCookie("otp_email");
  const session = await auth();
  if (!cookie && !session) redirect("/auth/login");
  if (cookie && session) redirect("/dashboard");

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Suspense>
        <OtpForm />
      </Suspense>
    </main>
  );
}
