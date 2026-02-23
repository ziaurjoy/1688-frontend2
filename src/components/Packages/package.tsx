"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui-elements/button";
import { MessageOutlineIcon } from "@/assets/icons";
import { getPackages, getUserPackage } from "@/services/subscription.service";

/* ============================= */
/* Types */
/* ============================= */

interface Package {
  _id: string;
  title: string;
  description: string;
  type: "BASIC" | "PREMIUM" | "ENTERPRISE";
  price: number;
  discount: number;
  enabled_trial: boolean;
  validity_days: number;
  trial_days: number;
  stripe_id: string;
  is_active: boolean;
  visibility: "PUBLIC" | "PRIVATE";
}

interface PackageFeatures {
  product_query_limit: number;
}

interface PackageResponse {
  package: Package;
  features: PackageFeatures;
}

/* ============================= */
/* Component */
/* ============================= */

export function PackagesComponent() {
  const [packages, setPackages] = useState<PackageResponse[]>([]);
  const [userPackageId, setUserPackageId] = useState<string | null>(null);
  const [currentPackagePrice, setCurrentPackagePrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /* ============================= */
  /* Fetch Data */
  /* ============================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [pkgRes, userPkgRes] = await Promise.all([
          getPackages(),
          getUserPackage(),
        ]);

        setPackages(pkgRes || []);

        /* ============================= */
        /* Normalize User Package */
        /* ============================= */

        let packageId: string | null = null;

        if (Array.isArray(userPkgRes)) {
          packageId = userPkgRes[0]?.package?._id || null;
        } else if (userPkgRes?.package?._id) {
          packageId = userPkgRes.package._id;
        } else if (userPkgRes?.package_id) {
          packageId = userPkgRes.package_id;
        }

        setUserPackageId(packageId);

        /* ============================= */
        /* Set Current Package Price */
        /* ============================= */

        if (pkgRes && packageId) {
          const currentPkg = pkgRes.find(
            (p: PackageResponse) => p.package._id === packageId,
          );

          if (currentPkg) {
            const price =
              currentPkg.package.price - currentPkg.package.discount;
            setCurrentPackagePrice(price);
          }
        }
      } catch (err) {
        console.error("Failed to load packages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ============================= */
  /* Handlers */
  /* ============================= */

  const handleCheckout = async (pkg: Package) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ package: pkg }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  /* ============================= */
  /* Helpers */
  /* ============================= */

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "BASIC":
        return "bg-gray-100 text-gray-600";
      case "PREMIUM":
        return "bg-purple-100 text-purple-700";
      case "ENTERPRISE":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "";
    }
  };

  /* ============================= */
  /* Loading */
  /* ============================= */

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading awesome packages...
      </div>
    );
  }

  /* ============================= */
  /* UI */
  /* ============================= */

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Choose your plan
        </h2>
        <p className="mt-3 text-gray-500">
          Unlock powerful features to grow your business
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {packages
          .filter((item) => item.package.is_active)
          .map((item) => {
            const pkg = item.package;
            const features = item.features;

            const finalPrice = pkg.price - pkg.discount;
            const isSelected = selectedId === pkg._id;
            const isCurrent = userPackageId === pkg._id;

            let buttonLabel = "Get Started";
            let buttonVariant: "primary" | "outlinePrimary" | "green" = "primary";
            if (isCurrent) {
              buttonLabel = "Current Plan";
              buttonVariant = "green";
            } else if (finalPrice > currentPackagePrice) {
              buttonLabel = "Upgrade";
              buttonVariant = "primary";
            } else if (finalPrice < currentPackagePrice) {
              buttonLabel = "Downgrade";
              buttonVariant = "primary";
            }

            return (
              <div
                key={pkg._id}
                onClick={() => setSelectedId(pkg._id)}
                className={`relative cursor-pointer rounded-2xl border bg-white/70 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isSelected
                    ? "border-primary shadow-lg ring-1 ring-primary/20"
                    : "border-gray-200"
                } `}
              >
                {/* Popular */}
                {pkg.type === "PREMIUM" && (
                  <div className="absolute -top-3 right-6 rounded-full border bg-white px-3 py-1 text-xs font-medium text-green-600 shadow-sm">
                    Popular
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl font-semibold text-gray-900">
                  {pkg.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">{pkg.description}</p>

                {/* Price */}
                <div className="mt-8 text-center">
                  <div className="flex items-end justify-center gap-2">
                    {pkg.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ৳{pkg.price}
                      </span>
                    )}

                    <span className="text-4xl font-bold text-gray-900">
                      ৳{finalPrice}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    / {pkg.validity_days} days
                  </p>
                </div>

                {/* Button */}
                <div className="my-8">
                  <Button
                    className={`w-full rounded-full ${isCurrent ? "cursor-not-allowed" : ""}`}
                    label={buttonLabel}
                    variant={buttonVariant}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCurrent) handleCheckout(pkg);
                    }}
                  />
                </div>

                {/* Features */}
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span>✔</span> {features.product_query_limit} Queries
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✔</span> {pkg.validity_days} Days Access
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✔</span> {pkg.type} Plan
                  </li>
                </ul>
                {/* Trial */}
                {pkg.enabled_trial && (
                  <div className="mt-6 rounded-lg bg-gray-50 p-3 text-center text-sm">
                    🎁 {pkg.trial_days} days free trial
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
