"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  downloadInvoice,
  getInvoiceData,
} from "@/services/subscription.service";
import { formatHumanReadableDate } from "@/lib/humanReadableDate";

interface QueryFilterState {
  page: number;
  page_size: number;
  total?: number;
  search?: string;
}

export function BillingComponent() {
  const [queryFilter, setQueryFilter] = useState<QueryFilterState>({
    page: 1,
    page_size: 10,
  });

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await getInvoiceData(queryFilter);
        setData(response?.results || []);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [queryFilter]); // re-fetch only when filter changes

  const downloadInvoices = async (id: string) => {
    console.log("Downloading invoice with ID:", id);
    try {
      setLoading(true);
      const response = await downloadInvoice(id);
      // Handle the downloaded file (e.g., trigger download in browser)
      if (response && response instanceof Blob) {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Failed to download invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Invoices
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            {/* <TableHead className="min-w-[120px] !text-left">Phone</TableHead> */}
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Invoice Number
            </TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
            {/* <TableHead className="pr-5 text-right sm:pr-6 xl:pr-7.5">
              Profit
            </TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : (
            data?.map((invoices: any) => (
              <TableRow
                className="text-base font-medium text-dark dark:text-white"
                key={invoices?.id}
              >
                <TableCell>{invoices?.invoice_number}</TableCell>
                <TableCell>{invoices?.package?.title}</TableCell>
                <TableCell>{invoices?.status?.toUpperCase()}</TableCell>
                <TableCell>{invoices?.price}</TableCell>
                <TableCell>{invoices?.discount}</TableCell>
                <TableCell>{invoices?.total}</TableCell>
                <TableCell>
                  {formatHumanReadableDate(invoices?.created_at)}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => downloadInvoices(invoices?.id)}
                    className="mt-8 rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
                  >
                    Download
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
