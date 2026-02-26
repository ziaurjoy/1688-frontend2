"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { UploadIcon } from "@/assets/icons";
import { editProfilePicture, getUsesData } from "@/services/user.service";

const DEFAULT_IMAGE = "/images/user/user-03.png";

export function UploadPhotoForm() {
  const [preview, setPreview] = useState<string>(DEFAULT_IMAGE);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getUsesData();
      if (res?.profile?.profile_picture) {
        setPreview(res.profile.profile_picture);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create local preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      // Cleanup memory when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("profile_picture", fileInputRef.current.files[0]);

    try {
      const response = await editProfilePicture(formData);
      console.log("Upload response:", response);
      setPreview(response.url);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Prevent Hydration Mismatch
  if (!mounted) return null;

  return (
    <div className="rounded-xl bg-white p-7 shadow-sm dark:bg-dark-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center gap-3">
          <div className="relative size-14">
            <Image
              src={preview || DEFAULT_IMAGE}
              fill
              alt="User"
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
          <div>
            <span className="block font-medium text-dark dark:text-white">
              Edit your photo
            </span>
          </div>
        </div>

        <div className="relative mb-6 block w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center transition-colors hover:border-primary dark:border-dark-3 dark:bg-dark-3">
          <input
            type="file"
            name="profile_picture"
            id="profilePhoto"
            ref={fileInputRef}
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <label htmlFor="profilePhoto" className="cursor-pointer">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
              <UploadIcon />
            </div>
            <p className="text-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG or GIF (max. 800x800px)
            </p>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-2 font-medium text-white disabled:opacity-50"
            type="submit"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
