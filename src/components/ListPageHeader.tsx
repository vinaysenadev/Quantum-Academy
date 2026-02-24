"use client";

import { Filter, SortAsc } from "lucide-react";
import React from "react";

import FormModal from "./FormModal";
import TableSearch from "./TableSearch";

type ListPageHeaderProps = {
  title: string;
  count: number;
  table: Parameters<typeof FormModal>[0]["table"];
  role: string | undefined;
  children?: React.ReactNode;
};

const ListPageHeader = ({
  title,
  count,
  table,
  role,
  children,
}: ListPageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">
        {title} <span className="text-gray-400 font-normal">({count})</span>
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            className="button-rounded p-2 bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label={`Filter ${title}`}
            title="Filter"
          >
            <Filter className="icon size-5 text-gray-600" aria-hidden="true" />
          </button>
          <button
            className="button-rounded p-2 bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label={`Sort ${title}`}
            title="Sort"
          >
            <SortAsc className="icon size-5 text-gray-600" aria-hidden="true" />
          </button>
          <div className="ml-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ListPageHeader;
