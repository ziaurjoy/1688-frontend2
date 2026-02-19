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
import { getTransactionData } from "@/services/subscription.service";
import { formatHumanReadableDate } from "@/lib/humanReadableDate";

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await getTransactionData(queryFilter);
        setData(response?.results || []);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [queryFilter]); // re-fetch only when filter changes

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Transactions
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            {/* <TableHead className="min-w-[120px] !text-left">Phone</TableHead> */}
            {/* <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Transction ID
            </TableHead> */}
            <TableHead>Package</TableHead>
            <TableHead>Amount</TableHead>

            <TableHead>Currency</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
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
                key={invoices?._id}
              >
                {/* <TableCell>{invoices?.transaction_id}</TableCell> */}
                <TableCell>{invoices?.package?.title}</TableCell>
                <TableCell>{invoices?.amount}</TableCell>
                <TableCell>{invoices?.currency}</TableCell>
                <TableCell>{invoices?.payment_method}</TableCell>
                <TableCell>{invoices?.status?.toUpperCase()}</TableCell>
                <TableCell>{invoices?.total}</TableCell>
                <TableCell>
                  {formatHumanReadableDate(invoices?.created_at)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
