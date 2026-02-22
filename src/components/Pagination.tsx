"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  count: number;
};

export default function Pagination({ page, count }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(count / 10); // use your ITEMS_PER_PAGE

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center justify-end gap-4 mt-6 pr-0">
      {/* Loading indicator */}
      {isPending && (
        <>
          <div className="w-5 h-5 border-2 border-Purple/30 border-t-Purple rounded-full animate-spin" />
          Loading...
        </>
      )}
      <button
        disabled={page <= 1 || isPending}
        onClick={() => changePage(page - 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages || isPending}
        onClick={() => changePage(page + 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
