/**
 * Authentication Hook
 * Use this hook to access the current user session in client components
 */

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(options?: { redirectTo?: string; required?: boolean }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If authentication is required and user is not authenticated, redirect
    if (
      options?.required &&
      status === "unauthenticated" &&
      options?.redirectTo
    ) {
      router.push(options.redirectTo);
    }
  }, [status, options?.required, options?.redirectTo, router]);

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  return {
    session,
    user: session?.user,
    isLoading,
    isAuthenticated,
    isUnauthenticated,
    accessToken: session?.accessToken,
  };
}
