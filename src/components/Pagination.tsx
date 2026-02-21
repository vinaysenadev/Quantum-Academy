"use client";

import { ITEMS_PER_PAGE } from "@/lib/settings";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="flex items-center justify-between">
      <button
        disabled={!hasPrev}
        className={`text-gray-600 text-sm flex flex-row gap-1 items-center border-[1px] p-1 pr-2 rounded-md ${
          !hasPrev
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-Sky cursor:pointer hover:bg-SkyLight"
        }  `}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronsLeft className="text-gray-500" /> Previous
      </button>
      <div className="flex gap-2">
        {Array.from(
          { length: Math.ceil(count / ITEMS_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`${
                  page === pageIndex
                    ? "button-rounded"
                    : "hover:bg-Sky rounded-full w-8 h-8"
                }`}
                onClick={() => handlePageChange(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>

      <button
        disabled={!hasNext}
        className={`text-gray-600 flex  text-sm flex-row gap-1 items-center border-[1px] p-1 pl-2 rounded-md ${
          !hasNext
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-Sky cursor:pointer hover:bg-SkyLight"
        } `}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
        <ChevronsRight className="icon" />
      </button>
    </div>
  );
};

export default Pagination;
