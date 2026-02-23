"use client";

import { useEffect, useState } from "react";
import { generateAppKey, getAPIKey } from "@/services/user.service";
import { Button } from "../ui-elements/button";
import { Copy, Check } from "lucide-react";

export function ApiKeyComponent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      setLoading(true);
      const res = await getAPIKey();
      setData(res || null);
    } catch (err) {
      console.error("Failed to fetch keys:", err);
    } finally {
      setLoading(false);
    }
  };

  const reGenerateAppKey = async () => {
    try {
      setLoading(true);
      const res = await generateAppKey();
      setData(res || null);
    } catch (err) {
      console.error("Failed to regenerate:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (value: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(type);

      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 shadow-md dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          API Credentials
        </h2>

        <Button
          label={loading ? "Processing..." : "Regenerate"}
          variant="primary"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            reGenerateAppKey();
          }}
          className="rounded"
        />
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-5">
          {/* App Key */}
          <KeyField
            label="App Key"
            value={data?.app_key}
            onCopy={() => handleCopy(data?.app_key, "app")}
            copied={copiedKey === "app"}
          />

          {/* Secret Key */}
          <KeyField
            label="Secret Key"
            value={data?.secret_key}
            onCopy={() => handleCopy(data?.secret_key, "secret")}
            copied={copiedKey === "secret"}
          />
        </div>
      )}
    </div>
  );
}

/* Reusable Key Field */
function KeyField({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <div className="mb-2 text-md font-medium text-gray-500">{label}</div>

      <div className="flex items-center justify-between gap-3">
        <div className="truncate font-mono text-sm text-gray-800 dark:text-gray-200">
          {value || "—"}
        </div>

        <button
          onClick={onCopy}
          className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {copied ? (
            <>
              <Check size={14} /> Copied
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
