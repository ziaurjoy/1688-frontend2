"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { SubscriptionPayment } from "@/services/subscription.service";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SuccessPage({ searchParams }: Props) {
  const router = useRouter();
  const params = use(searchParams);
  const sessionId = params.session_id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }

    const processPayment = async () => {
      try {
        // 1. Fetch the session from your secure internal API
        const res = await fetch(`/api/checkout?session_id=${sessionId}`);
        const stripeSession = await res.json();
        if (stripeSession.error) throw new Error(stripeSession.error);

        // 2. CONVERT STRIPE DATA TO BACKEND MODEL (StripeSubscribePaymentRequest)
        const backendPayload = {
          amount: stripeSession.amount_total / 100, // Convert cents to decimal
          discounts: stripeSession.total_details?.amount_discount / 100 || 0,
          currency: stripeSession.currency?.toUpperCase(),
          payment_method: stripeSession.payment_method_types?.[0] || "card",
          transaction_id: stripeSession.id,
          status: stripeSession.payment_status,
          package_id: stripeSession.metadata?.package_id || "unknown", // Example of passing custom metadata
          // gateway_response: stripeSession, // The full dictionary
          created_at: new Date().toISOString(),
        };

        // 3. Send to your backend service
        await SubscriptionPayment(backendPayload);

        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.detail || err.message);
        setLoading(false);
      }
    };

    processPayment();
  }, [sessionId, router]);

  if (loading)
    return (
      <div className="p-10 text-center">Finalizing your subscription...</div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="mx-auto max-w-2xl p-10 text-center">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <svg
            className="h-12 w-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <h1 className="mb-2 text-3xl font-bold">Payment Verified!</h1>
      <p className="text-gray-600">
        Your subscription is now active. You can close this window or return
        home.
      </p>

      <button
        onClick={() => router.push("/admin-dashboard")}
        className="mt-8 rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
