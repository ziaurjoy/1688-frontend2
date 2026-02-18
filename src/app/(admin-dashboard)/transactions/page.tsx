import { ApiKeyComponent } from "@/components/ApiKey";
import { BillingComponent } from "@/components/billing";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/Tables/invoice-table";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/Tables/top-products";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";
import { TransactionComponent } from "@/components/transactions";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Transactions" />

      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <TransactionComponent />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
