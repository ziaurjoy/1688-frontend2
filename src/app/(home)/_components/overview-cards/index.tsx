"use client";
import { compactFormat } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import { useEffect, useState } from "react";
import { queryAPIUses } from "@/services/user.service";
import { Workflow } from "lucide-react";

// REMOVED 'async' here
export function OverviewCardsGroup() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchAPIuses();
  }, []);

  if (loading && data.length === 0) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {data.map((item, index) => (
        <OverviewCard
          key={item.id || index}
          label={item.endpoint}
          data={{
            value: compactFormat(item.total_hits),
            growthRate: item.growthRate || 0,
          }}
          Icon={Workflow}
        />
      ))}
    </div>
  );
}
