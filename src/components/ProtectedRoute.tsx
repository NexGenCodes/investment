"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContex";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login"); // Use replace instead of push to avoid back navigation
      }
      setChecking(false);
    }
  }, [user, isLoading, router]);

  if (isLoading || checking) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return <>{children}</>;
}
