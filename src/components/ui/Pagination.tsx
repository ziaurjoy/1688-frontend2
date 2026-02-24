"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const getPagination = (
  current: number,
  total: number,
  siblingCount = 1,
): (number | string)[] => {
  const pages: (number | string)[] = [];

  const left = Math.max(current - siblingCount, 1);
  const right = Math.min(current + siblingCount, total);

  // Always include first page
  pages.push(1);

  // Left dots
  if (left > 2) {
    pages.push("...");
  }

  // Middle pages
  for (let i = left; i <= right; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i);
    }
  }

  // Right dots
  if (right < total - 1) {
    pages.push("...");
  }

  // Always include last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
};



interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onPageChange,
}) => {
  const pages = getPagination(current, total);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
        className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                current === page
                  ? "bg-primary text-white"
                  : "hover:bg-primary/80 dark:hover:bg-gray-800"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current >= total}
        className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};
