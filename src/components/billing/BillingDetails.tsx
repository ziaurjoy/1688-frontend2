"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getInvoiceById,
  downloadInvoice,
} from "@/services/subscription.service";
import { formatHumanReadableDate } from "@/lib/humanReadableDate";
import { Loader2, Download } from "lucide-react";

export default function BillingDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await getInvoiceById(id);
        setInvoice(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInvoice();
  }, [id]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await downloadInvoice(id);

      if (response instanceof Blob) {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!invoice) {
    return <div className="py-10 text-center">Invoice not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-2xl bg-white shadow dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Invoice #{invoice.invoice_number}
            </h2>
            <p className="text-sm text-gray-500">
              {formatHumanReadableDate(invoice.created_at)}
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {downloading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Download size={16} />
            )}
            Download
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Status</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                invoice.status === "paid"
                  ? "bg-green-100 text-green-600"
                  : invoice.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              {invoice.status.toUpperCase()}
            </span>
          </div>

          {/* Package */}
          <div className="rounded-xl border p-4">
            <h3 className="mb-2 text-lg font-semibold">
              {invoice.package?.title}
            </h3>
            <p className="text-sm text-gray-500">
              {invoice.package?.description}
            </p>

            <div className="mt-3 text-sm text-gray-600">
              Validity: {invoice.package?.validity_days} days
            </div>
          </div>

          {/* Price breakdown */}
          <div className="space-y-3 rounded-xl border p-4">
            <div className="flex justify-between">
              <span>Price</span>
              <span>${invoice.price}</span>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>-${invoice.discount}</span>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg font-semibold">
              <span>Total</span>
              <span>${invoice.total}</span>
            </div>
          </div>

          {/* Meta info */}
          <div className="space-y-1 text-sm text-gray-500">
            <div>Invoice ID: {invoice.id}</div>
            <div>User ID: {invoice.user_id}</div>
            <div>Currency: {invoice.currency}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
