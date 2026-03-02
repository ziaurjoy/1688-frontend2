"use client";

import Image from "next/image";
import { Button } from "../ui-elements/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-white px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center md:grid-cols-2 md:gap-15">
          {/* Left content */}
          <div className="order-2 space-y-6 text-center md:order-1 md:text-left">
            <h1 className="text-3xl font-bold leading-relaxed text-gray-900 md:text-5xl lg:text-6xl">
              Get started with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Prod Query API
              </span>
            </h1>

            <p className="mx-auto max-w-md text-base leading-relaxed text-gray-600 sm:text-lg md:mx-0">
              Access comprehensive Prod-Query data in XML/JSON format. Fast,
              reliable, and easy-to-use API for domain information lookups
              across the entire Prod-Query index.
            </p>

            {/* CTA */}
            <div className="flex justify-center md:justify-start">
              <Button
                label="Start Free"
                className="h-10 rounded-lg bg-blue-600 px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 sm:h-12 sm:px-8 sm:text-base md:h-11"
              />
            </div>
          </div>

          {/* Right illustration */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative h-[260px] w-full max-w-sm sm:max-w-md md:aspect-[4/4] md:h-auto md:max-w-xl lg:max-w-2xl">
              <Image
                src="/images/landing/hero.jpg"
                alt="Dashboard illustration"
                fill
                className="rounded-2xl md:object-cover object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
