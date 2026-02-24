import { ApiKeyComponent } from "@/components/ApiKey";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PackagesComponent } from "@/components/Packages/package";

import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Packages",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Packages" />

      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <PackagesComponent />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
