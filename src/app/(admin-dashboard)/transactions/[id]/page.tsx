import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import TransactionsDetails from "@/components/transactions/TransactionsDetails";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Invoice Details",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Invoices Details" />

      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <TransactionsDetails />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
