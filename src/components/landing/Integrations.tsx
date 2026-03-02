"use client";

import { Code2, Blocks, Zap } from "lucide-react";

export function Integrations() {
  const integrations = [
    {
      icon: Code2,
      title: "REST API",
      description:
        "Simple HTTP REST API with comprehensive documentation for easy integration into any application.",
    },
    {
      icon: Blocks,
      title: "WordPress Plugin",
      description:
        "Seamless integration with WordPress. Add Prod-Query lookups directly to your WordPress site.",
    },
    {
      icon: Zap,
      title: "Instant Integration",
      description:
        "Quick setup with our SDKs and libraries available for popular programming languages and frameworks.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-blue-50 px-4 py-20">
      {/* Background blob */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-blue-100 opacity-20 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-6 text-center">
          <h2 className="text-balance text-4xl font-bold text-gray-900">
            Simplify your work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We provide multiple ways to integrate our Prod-Query API into your
            workflow. Pick the integration that works best for you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl bg-white/50 p-8 text-center"
              >
                <div className="mb-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-300 p-6">
                  <Icon className="h-12 w-12 text-white" strokeWidth={2} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {integration.title}
                </h3>
                {/* <p className="leading-relaxed text-gray-600">
                  {integration.description}
                </p> */}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            See Integrations
          </a>
        </div>
      </div>
    </section>
  );
}
