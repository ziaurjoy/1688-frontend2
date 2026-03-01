import BillingDetails from "@/components/billing/BillingDetails";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

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
          <BillingDetails />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
