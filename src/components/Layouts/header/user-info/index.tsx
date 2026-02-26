"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import { getUsesData } from "@/services/user.service";

// Define the User Shape for better IDE support
interface UserData {
  profile?: {
    full_name?: string;
    profile_picture?: string;
  };
  email?: string;
  img?: string; // fallback for legacy data
  name?: string; // fallback for legacy data
}

const DEFAULT_AVATAR = "/images/user/user-03.png";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<UserData | null>(null);

  // 1. Prevent Hydration Mismatch
  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const res = await getUsesData();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchData();
  }, []);

  // Compute values to keep the JSX clean
  const displayName = data?.profile?.full_name || data?.name || "User";
  const displayImg =
    data?.profile?.profile_picture || data?.img || DEFAULT_AVATAR;

  // Don't render until client-side to ensure 'data' matches exactly what the user sees
  if (!mounted)
    return <div className="size-12 animate-pulse rounded-full bg-gray-2" />;

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          <div className="relative size-12 overflow-hidden rounded-full">
            <Image
              src={displayImg}
              className="object-cover"
              alt={`Avatar of ${displayName}`}
              fill
              unoptimized={displayImg.startsWith("http")} // Skip Next.js optimization for external backend URLs
            />
          </div>
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{displayName}</span>
            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform duration-200",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="z-[999] border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <div className="flex items-center gap-2.5 px-5 py-3.5">
          <div className="relative size-12 flex-shrink-0">
            <Image
              src={displayImg}
              className="rounded-full object-cover"
              alt={displayName}
              fill
              unoptimized={displayImg.startsWith("http")}
            />
          </div>

          <div className="space-y-1 overflow-hidden text-base font-medium">
            <div className="truncate leading-none text-dark dark:text-white">
              {displayName}
            </div>
            <div className="truncate text-sm font-normal text-gray-6">
              {data?.email || "No email provided"}
            </div>
          </div>
        </div>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <nav className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          {/* <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-[9px] transition-colors hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />
            <span className="font-medium">View profile</span>
          </Link> */}

          <Link
            href="/pages/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-[9px] transition-colors hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />
            <span className="font-medium">Account Settings</span>
          </Link>
        </nav>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] text-[#4B5563] transition-colors hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={() => signOut()}
          >
            <LogOutIcon />
            <span className="font-medium">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
