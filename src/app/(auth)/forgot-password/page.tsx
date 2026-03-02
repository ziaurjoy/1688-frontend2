import ResetPasswordPage from "@/components/Auth/ResetPassword/ResetPasswordPage";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
  return (
    <div className="min-h-screen w-screen bg-gray-2 dark:bg-dark">
      <div className="flex h-screen items-center justify-center rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="container mx-auto flex flex-wrap items-center">
          {/* Form Side */}
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <ResetPasswordPage />
            </div>
          </div>

          {/* Visual Side */}
          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link
                href="/auth/signin"
                className="mb-8 text-dark dark:text-white"
              >
                ← Back to Sign In
              </Link>
              <h1 className="mb-4 mt-12 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Secure Your Account
              </h1>
              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Follow the three simple steps to recover access to your
                dashboard.
              </p>
              <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
