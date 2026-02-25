"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Loading from "../(dashboard)/list/loading";
import AdminDashboardSkeleton from "@/components/AdminDashboardSkeleton";

export default function RedirectPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const role = user?.publicMetadata?.role as string;

    if (role) {
      router.replace(`/${role}`);
    }
  }, [isLoaded, isSignedIn, user, router]);

  return <AdminDashboardSkeleton />;
}
