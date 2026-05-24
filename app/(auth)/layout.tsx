"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetMe } from "@/hooks/useGetMe";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  // Call useGetMe to verify if there is an active session
  useGetMe();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  // While checking the authentication status, display a loading spinner
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Đang xác thực...
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Vui lòng chờ trong giây lát
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If already authenticated, do not show the auth page content
  if (user) {
    return null;
  }

  return <>{children}</>;
}
