"use client";
import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { useEffect, useState } from "react";
import { queryAPIUses } from "@/services/user.services";

export async function OverviewCardsGroup() {
  // const { views, profit, products, users } = await getOverviewData();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPIuses = async () => {
      try {
        setLoading(true);
        const response = await queryAPIUses();
        setData(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch API uses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPIuses();
  }, [data]); // re-fetch only when filter changes

  console.log("API Uses:", data);
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {data.map((item) => (
        <OverviewCard
          label={item.endpoint}
          data={{
            // ...views,
            value: compactFormat(item.total_hits),
          }}
          Icon={icons.Views}
        />
      ))}
    </div>
  );
}
