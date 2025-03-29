import LoginForm from "@/components/loginform";
import { Suspense } from "react";
import { auth } from "@/lib/auth"; 
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (!!session) redirect("/dashboard");
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
