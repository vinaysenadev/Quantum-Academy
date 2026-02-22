"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Search } from "lucide-react";

const TableSearch = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("search") as string;

    const params = new URLSearchParams();
    if (value) params.set("search", value);

    startTransition(() => {
      router.push(`${window.location.pathname}?${params.toString()}`);
    });
  };

  return (
    <>
      {isPending && (
        <>
          <span className="text-sm text-gray-400">
            Fetching search results...
          </span>
          <div className="w-4 h-4 border-2 border-gray-300 border-t-Purple rounded-full animate-spin" />
        </>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-3 py-1.5"
      >
        <Search className="icon" />

        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-[200px] bg-transparent outline-none"
          disabled={isPending}
        />
      </form>
    </>
  );
};

export default TableSearch;
