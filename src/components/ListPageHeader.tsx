"use client";

import TableSearch from "./TableSearch";
import { Filter, SortAsc } from "lucide-react";
import FormModal from "./FormModal";

type ListPageHeaderProps = {
  title: string;
  count: number;
  table: Parameters<typeof FormModal>[0]["table"];
  role: string | undefined;
  source: string;
};

const ListPageHeader = ({
  title,
  count,
  table,
  role,
  source,
}: ListPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="hidden md:block text-lg font-semibold">
        {title} ({count})
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch />
        <div className="flex gap-4">
          <button className="button-rounded">
            <Filter className="icon" />
          </button>
          <button className="button-rounded">
            <SortAsc className="icon" />
          </button>
          {role === "admin" && <FormModal table={table} type="create" />}
        </div>
      </div>
    </div>
  );
};

export default ListPageHeader;
