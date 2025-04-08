import LoginForm from "@/components/form/loginform";
import { Suspense } from "react";

export default async function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
