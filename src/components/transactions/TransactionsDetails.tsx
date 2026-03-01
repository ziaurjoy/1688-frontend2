"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTransactionById } from "@/services/subscription.service";
import { formatHumanReadableDate } from "@/lib/humanReadableDate";
import { Loader2 } from "lucide-react";

export default function TransactionsDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await getTransactionById(id);
        setTransaction(res?.result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!transaction) {
    return <div className="py-10 text-center">Transaction not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-2xl bg-white shadow dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Transaction #{transaction?.id}
            </h2>
            <p className="text-sm text-gray-500">
              {formatHumanReadableDate(transaction?.created_at)}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Status</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                transaction.status === "paid"
                  ? "bg-green-100 text-green-600"
                  : transaction.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              {transaction?.status?.toUpperCase()}
            </span>
          </div>

          {/* Package */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-2 text-lg font-semibold">
              {transaction.package?.title}
            </h3>
            <p className="text-sm text-gray-500">
              {transaction.package?.description}
            </p>

            <div className="mt-3 text-sm text-gray-600">
              Validity: {transaction.package?.validity_days} days
            </div>
          </div>

          {/* Price breakdown */}
          <div className="space-y-3 rounded-xl border p-4">
            <div className="flex justify-between">
              <span>Price</span>
              <span>${transaction.amount}</span>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>-${transaction?.package?.discount}</span>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg font-semibold">
              <span>Total</span>
              <span>${transaction.amount}</span>
            </div>
          </div>

          {/* Meta info */}
          <div className="space-y-1 text-sm text-gray-500">
            <div>Transaction ID: {transaction.transaction_id}</div>
            {/* <div>User ID: {transaction.user_id}</div> */}
            <div>Currency: {transaction.currency}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
