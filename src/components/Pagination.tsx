"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Props = {
  page: number;
  count: number;
};

const ITEMS_PER_PAGE = 10;

export default function Pagination({ page, count }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center flex-col gap-2 justify-center mt-2 px-3 w-full"
      aria-label="Pagination Navigation"
    >
      <div className="flex items-center gap-2">
        {isPending && (
          <div className="flex items-center gap-2 text-md text-gray-400">
            <div
              className="w-6 h-6 border-2 border-purple-700/30 border-t-purple-700 rounded-full animate-spin"
              aria-hidden="true"
            />
            <span>Updating...</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          disabled={page <= 1 || isPending}
          onClick={() => changePage(page - 1)}
          className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Go to previous page"
        >
          Previous
        </button>

        <span className="text-sm font-semibold text-gray-700">
          Page <span className="text-purple-700">{page}</span> of {totalPages}
        </span>

        <button
          disabled={page >= totalPages || isPending}
          onClick={() => changePage(page + 1)}
          className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
