"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  downloadInvoice,
  getInvoiceData,
} from "@/services/subscription.service";
import { formatHumanReadableDate } from "@/lib/humanReadableDate";
import { Download, Eye, Loader2, View } from "lucide-react";
import { Pagination } from "../ui/Pagination";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / queryFilter.page_size);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await getInvoiceData(queryFilter);
        setData(response?.results || []);
        setTotal(response?.count || 0);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [queryFilter]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setQueryFilter((prev) => ({ ...prev, page }));
  };

  const downloadInvoices = async (id: string) => {
    try {
      setDownloadingId(id);
      const response = await downloadInvoice(id);

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
      setDownloadingId(null);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Billing & Invoices
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="pl-6">Invoice</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Loader2 className="animate-spin" size={18} />
                    Loading invoices...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No invoices found
                </TableCell>
              </TableRow>
            ) : (
              data.map((invoice: any) => (
                <TableRow
                  key={invoice?.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell className="pl-6 font-medium">
                    #{invoice?.invoice_number}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-700 dark:text-gray-200">
                      {invoice?.package?.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        invoice?.status === "paid"
                          ? "bg-green-100 text-green-600"
                          : invoice?.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {invoice?.status?.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>${invoice?.price}</TableCell>
                  <TableCell className="text-red-500">
                    -${invoice?.discount}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900 dark:text-white">
                    ${invoice?.total}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {formatHumanReadableDate(invoice?.created_at)}
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2 pr-6 text-right">
                    <button
                      onClick={() => router.push(`/invoices/${invoice?.id}`)}
                      className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/80 hover:text-white disabled:opacity-50"
                      disabled={downloadingId === invoice?.id}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => downloadInvoices(invoice?.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/80 hover:text-white disabled:opacity-50"
                      disabled={downloadingId === invoice?.id}
                    >
                      {downloadingId === invoice?.id ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Download size={16} />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end border-t px-2 py-4 md:justify-between md:px-6">
        <div className="hidden text-sm text-gray-500 md:block">
          Page {queryFilter.page} of {totalPages || 1}
        </div>

        <Pagination
          current={queryFilter.page}
          total={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
