"use client";

import React, { useEffect, useState } from "react";
import { CallIcon, EmailIcon, UserIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { editUserProfile, getUsesData } from "@/services/user.service";

// 1. Define the interface for better developer experience
interface UserProfile {
  full_name: string;
  phone: string;
  email: string;
  status?: string | boolean;
}

export function PersonalInfoForm() {
  const [data, setData] = useState<UserProfile>({
    full_name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 2. Fetch data on mount
  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const res = await getUsesData();
        // Use the profile data if it exists, otherwise fallback to empty strings
        if (res?.profile) {
          setData({
            full_name: res.profile.full_name || "",
            phone: res.profile.phone || "",
            email: res.profile.email || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchData();
  }, []);

  // 3. Optimized Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const res = await editUserProfile(payload);
      if (res?.profile) {
        setData(res.profile);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  // Prevent Hydration mismatch
  if (!mounted) return null;

  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      {/* We use a 'key' tied to data.email.
          When data is fetched, the key changes, forcing the inputs to update
          their defaultValue to the newly fetched data.
      */}
      <form onSubmit={handleSubmit} key={data.email}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="full_name"
            label="Full Name"
            placeholder="David Jhon"
            defaultValue={data.full_name}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="phone"
            label="Phone Number"
            placeholder="+990 3343 7865"
            defaultValue={data.phone}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="devidjond45@gmail.com"
          defaultValue={data.email}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark transition-all hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-white transition-all hover:bg-opacity-90 disabled:bg-opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
