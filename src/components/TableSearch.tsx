"use client";

import React, { useTransition } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("search") as string;

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`${window.location.pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
      {isPending && (
        <div
          className="flex items-center gap-2"
          role="status"
          aria-live="polite"
        >
          <div
            className="w-6 h-6 border-2 border-purple-700/30 border-t-purple-700 rounded-full animate-spin"
            aria-hidden="true"
          />
          <span className="text-sm md:text-md text-gray-400">Searching...</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-auto flex items-center gap-2 bg-gray-50 text-sm rounded-full ring-[1.5px] ring-gray-200 px-4 py-2 focus-within:ring-Sky transition-all"
        role="search"
      >
        <Search className="size-4 text-gray-400" aria-hidden="true" />
        <label htmlFor="table-search" className="sr-only">
          Search the table
        </label>
        <input
          id="table-search"
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full md:w-[200px] bg-transparent outline-none text-gray-700"
          disabled={isPending}
        />
      </form>
    </div>
  );
};

export default TableSearch;
