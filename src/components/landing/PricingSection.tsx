"use client";

import { Check } from "lucide-react";
import { Button } from "../ui-elements/button";

const plans = [
  {
    name: "Basic",
    price: 29.99,
    description: "Perfect for getting started",
    features: [
      "5,000 requests/month",
      "XML/JSON support",
      "Email support",
      "Basic analytics",
    ],
  },
  {
    name: "Standard",
    price: 39.99,
    description: "For growing businesses",
    features: [
      "50,000 requests/month",
      "XML/JSON support",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
      "Rate limit management",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: 45.99,
    description: "For large-scale operations",
    features: [
      "Unlimited requests",
      "XML/JSON support",
      "24/7 phone support",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

export function PricingSection() {
  return (
    <section className="relative px-4 py-24 w-full bg-white">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="space-y-4 text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Choose your Plan
          </h2>
          <p className="text-balance text-lg text-gray-600">
            Simple, transparent pricing that scales with your business
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "scale-105 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-2xl"
                  : "border border-gray-200 bg-white text-gray-900 hover:shadow-lg"
              }`}
            >
              <div className="space-y-6 p-8">
                <div>
                  <h3
                    className={`text-2xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm ${plan.highlighted ? "text-blue-100" : "text-gray-600"}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-5xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}
                    >
                      ${plan.price}
                    </span>
                    <span
                      className={
                        plan.highlighted ? "text-blue-100" : "text-gray-600"
                      }
                    >
                      /month
                    </span>
                  </div>
                </div>

                <Button
                  label="Get Started"
                  className={`w-full font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-gray-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                ></Button>

                <div
                  className="space-y-4 border-t pt-6"
                  style={{
                    borderTopColor: plan.highlighted
                      ? "rgba(255,255,255,0.2)"
                      : undefined,
                  }}
                >
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
