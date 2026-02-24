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
import { getTransactionData } from "@/services/subscription.service";
import { formatHumanReadableDate } from "@/lib/humanReadableDate";
import { Loader2, CreditCard } from "lucide-react";
import { Pagination } from "../ui/Pagination";

interface QueryFilterState {
  page: number;
  page_size: number;
  total?: number;
  search?: string;
}

export function TransactionComponent() {
  const [queryFilter, setQueryFilter] = useState<QueryFilterState>({
    page: 1,
    page_size: 10,
  });

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / queryFilter.page_size);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await getTransactionData(queryFilter);
        setData(response?.results || []);
        setTotal(response?.count || 0);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [queryFilter]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setQueryFilter((prev) => ({ ...prev, page }));
  };

  return (
    <div className="rounded-2xl bg-white shadow dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Transactions
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="pl-6">Package</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Loader2 className="animate-spin" size={18} />
                    Loading transactions...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              data.map((tx: any, index) => (
                <TableRow
                  key={tx?._id ?? index}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {/* Package */}
                  <TableCell className="pl-6 font-medium text-gray-800 dark:text-gray-200">
                    {tx?.package?.title}
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="font-semibold text-gray-900 dark:text-white">
                    {tx?.amount}
                  </TableCell>

                  {/* Currency */}
                  <TableCell className="text-gray-500">
                    {tx?.currency}
                  </TableCell>

                  {/* Payment Method */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CreditCard size={16} />
                      {tx?.payment_method}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        tx?.status === "success" || tx?.status === "paid"
                          ? "bg-green-100 text-green-600"
                          : tx?.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {tx?.status?.toUpperCase()}
                    </span>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-500">
                    {formatHumanReadableDate(tx?.created_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
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
