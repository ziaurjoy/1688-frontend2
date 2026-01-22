import type { Metadata } from "next";
import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignUpPage() {
  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full p-4 sm:p-12.5 xl:p-15">
            <GoogleSigninButton text="Sign in" />

            <div className="my-6 flex items-center justify-center">
              <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
              <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                Or sign up with email
              </div>
              <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
            </div>

            <div>
              <SignUpForm />
            </div>

            <div className="mt-6 text-center">
              <p>
                Have a account?{" "}
                <Link href="/sign-in" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
