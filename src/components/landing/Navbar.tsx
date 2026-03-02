"use client";

import Link from "next/link";
import { Button } from "../ui-elements/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-3 md:px-0">
        <div className="flex h-22 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
              <span className="text-sm font-bold text-white">PQ</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Prod Query</span>
          </Link>

          {/* Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#"
              className="text-md font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-md font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-md font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-md font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Pricing
            </Link>
          </div>

          {/* Sign Up Button */}
          <Link href="/sign-in" className="hidden md:inline-block">
            <Button
              label="Sign In"
              className="h-12 rounded-lg bg-blue-600 font-medium text-white transition-all duration-300 hover:bg-blue-700"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
