import OtpForm from "@/components/form/otpform";
import { Suspense } from "react";

export default async function OtpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Suspense>
        <OtpForm />
      </Suspense>
    </main>
  );
}
