"use client";

/**
 * Protected Route Component
 * Wrap components that should only be visible to authenticated users
 */

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  fallback = <div>Loading...</div>,
}: ProtectedRouteProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") return fallback;
  if (status === "unauthenticated") return null;

  return <>{children}</>;
}
