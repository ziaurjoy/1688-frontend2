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
import { getProductData } from "@/services/product.services";
import { useEffect, useState } from "react";
import { getAPIKey } from "@/services/user.services";

export function ApiKeyComponent() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAPIKey();
        setData(response || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // re-fetch only when filter changes

  console.log("data", data);

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white"></h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead>App Key</TableHead>
            <TableHead>Secret Key</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="text-base font-medium text-dark dark:text-white">
            <TableCell>{data?.app_key}</TableCell>
            <TableCell>{data?.secret_key}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
