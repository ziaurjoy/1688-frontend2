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
import { getProductData } from "@/services/product.service";
import { useEffect, useState } from "react";

interface QueryFilterState {
  page: number;
  page_size: number;
  total?: number;
  search?: string;
}

export function TopProducts() {
  const [queryFilter, setQueryFilter] = useState<QueryFilterState>({
    page: 1,
    page_size: 10,
  });

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductData(queryFilter);
        setData(response?.results || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [queryFilter]); // re-fetch only when filter changes

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Products
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            {/* <TableHead className="min-w-[120px] !text-left">Phone</TableHead> */}
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Product Title
            </TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
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
            data?.map((product: any) => (
              <TableRow
                className="text-base font-medium text-dark dark:text-white"
                key={product?._id}
              >
                {/* <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                  <Image
                    src={product?.image}
                    className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                    width={60}
                    height={50}
                    alt={`Image for product ${product?.title}`}
                  />
                  <div>{product?.title}</div>
                </TableCell> */}

                <TableCell>{product?.title}</TableCell>
                <TableCell>
                  {product?.price?.currency} {product?.price?.amount}
                </TableCell>
                <TableCell>{product?.price?.unit}</TableCell>

                {/* <TableCell className="pr-5 text-right text-green-light-1 sm:pr-6 xl:pr-7.5">
                  ${product.profit}
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
