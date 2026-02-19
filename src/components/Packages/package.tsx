"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui-elements/button";
import { MessageOutlineIcon } from "@/assets/icons";
import { getPackages, getUserPackage } from "@/services/subscription.service";
import CheckoutButton from "./checkoutButton";

/* ============================= */
/* Interfaces */
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
  created_at: string;
  updated_at: string;
}

interface PackageFeatures {
  _id: string;
  package_id: string;
  product_query_limit: number;
  created_at: string;
  updated_at: string;
}

interface PackageResponse {
  package: Package;
  features: PackageFeatures;
}

/* ============================= */
/* Component */
/* ============================= */

export function PackagesComponent() {
  const router = useRouter();

  const [packages, setPackages] = useState<PackageResponse[]>([]);
  const [userPackage, setUserPackage] = useState<PackageResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response: PackageResponse[] = await getPackages();
        setPackages(response || []);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchUserPackages = async () => {
      try {
        setLoading(true);
        const response: PackageResponse[] = await getUserPackage();
        setUserPackage(response || []);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPackages();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedPackageId(id);
  };

  const handleCheckout = async (pkg: any) => {
    // Changed param name from 'package'
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          package: pkg, // The key in the JSON is "package", which matches your API destructuring
        }),
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

  const handlePayment = (item: PackageResponse) => {
    // Pass the actual package object
    handleCheckout(item.package);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading packages...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
      {packages
        .filter((item) => item.package.is_active)
        .map((item) => {
          const pkg = item.package;
          const features = item.features;

          const finalPrice = pkg.price - pkg.discount;
          const isSelected = selectedPackageId === pkg._id;

          return (
            <div
              key={pkg._id}
              onClick={() => handleSelect(pkg._id)}
              className={`cursor-pointer rounded-2xl border p-6 shadow-sm transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-gray-200 hover:shadow-md"
              }`}
            >
              {/* Title */}
              <h3 className="mb-2 text-xl font-bold text-dark dark:text-white">
                {pkg.title}
              </h3>

              <p className="mb-4 text-sm text-gray-500">{pkg.description}</p>

              {/* Price Section */}
              <div className="mb-4">
                {pkg.discount > 0 && (
                  <span className="mr-2 text-sm text-gray-400 line-through">
                    ৳{pkg.price}
                  </span>
                )}

                <span className="text-3xl font-bold text-primary">
                  ৳{finalPrice}
                </span>

                <span className="text-sm text-gray-500">
                  /{pkg.validity_days} days
                </span>
              </div>

              {/* Trial Badge */}
              {pkg.enabled_trial && (
                <div className="mb-4 rounded-lg bg-green-100 p-2 text-sm text-green-700">
                  {pkg.trial_days} Days Free Trial
                </div>
              )}

              {/* Features */}
              <ul className="mb-6 space-y-2 text-sm text-gray-600">
                <li>
                  ✔ Product Query Limit:{" "}
                  <strong>{features.product_query_limit}</strong>
                </li>
                <li>
                  ✔ Validity: <strong>{pkg.validity_days} Days</strong>
                </li>
                <li>
                  ✔ Type: <strong>{pkg.type}</strong>
                </li>
              </ul>

              {/* Button */}

              {userPackage?.package_id != item.package?._id && (
                <Button
                  label="Start Now"
                  variant="green"
                  size="small"
                  icon={<MessageOutlineIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePayment(item);
                  }}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}
