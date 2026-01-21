"use client";

import { GoogleIcon } from "@/assets/icons";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function GoogleSigninButton({ text }: { text: string }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);

    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-[15px] font-medium transition hover:bg-opacity-50 disabled:opacity-70 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-opacity-50"
    >
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
      ) : (
        <GoogleIcon />
      )}

      <span>{loading ? "Signing in..." : `${text} with Google`}</span>
    </button>
  );
}
