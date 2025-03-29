import SigninForm from "@/components/signinForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Register() {
  const session = await auth();
  if (!!session) redirect("/dashboard");
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 px-4 pt-20 pb-10">
      <Suspense>
        <SigninForm />
      </Suspense>
    </main>
  );
}
