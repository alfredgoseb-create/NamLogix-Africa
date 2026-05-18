// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
      return;
    }

    setChecking(false);
  }

  if (checking) {
    return (
      <div className="min-h-screen page-soft-bg flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl border p-8 text-center max-w-md">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-2xl font-black text-gray-900">
            Checking Access
          </h1>
          <p className="text-gray-500 mt-2">
            Please wait while NamLogix verifies your account.
          </p>
        </div>
      </div>
    );
  }

  return children;
}