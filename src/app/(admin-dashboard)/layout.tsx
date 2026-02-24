import { Sidebar } from "@/components/Layouts/sidebar";
import Header from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "../providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminRootLayout({ children }: PropsWithChildren) {
  // Server-side authentication check
  const session = await getServerSession(authOptions);

  // If no session, redirect to sign-in
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <Providers>
      <NextTopLoader color="#5750F1" showSpinner={false} />

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
          <Header />

          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden py-3 px-4 md:px-6 2xl:px-10">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
