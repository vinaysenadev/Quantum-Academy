"use client";

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
    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
      <h1 className="text-lg md:text-xl font-bold text-gray-800 self-start">
        {title} <span className="text-gray-400 font-normal">({count})</span>
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="ml-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ListPageHeader;
