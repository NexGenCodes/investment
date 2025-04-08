import SignUpForm from "@/components/form/signUpForm";
import { Suspense } from "react";

export default async function Register() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 px-4 pt-20 pb-10">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
