"use client";
import { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
	const pathname = usePathname();
  const pageTitle = useMemo(() => {
    if (!pathname) return "DASHBOARD";

    const segments = pathname.split("/").filter(Boolean);

    const isDynamic = (segment: string) => {
      return (
        /^\d+$/.test(segment) ||
        /^[a-f0-9]{24}$/i.test(segment) ||
        /^[a-f0-9-]{36}$/i.test(segment)
      );
    };

    let titleSegment = segments[segments.length - 1];

    if (isDynamic(titleSegment) && segments.length > 1) {
      const parent = segments[segments.length - 2];

      // last character cut like (customers -> customer)
      const singular = parent.slice(0, -1);

      return `${singular} details`.replace(/-/g, " ").toUpperCase();
    }

    return titleSegment.replace(/-/g, " ").toUpperCase();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 md:py-6 py-4 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="mr-8 rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-6 font-bold text-primary dark:text-white">
          {pageTitle}
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>

        <ThemeToggleSwitch />

        <Notification />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
