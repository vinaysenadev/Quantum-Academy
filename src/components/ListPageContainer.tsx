import React from "react";

import FormContainer from "./FormContainer";
import ListPageHeader from "./ListPageHeader";
import Pagination from "./Pagination";
import Table from "./Table";

type ListPageContainerProps = {
  title: string;
  count: number;
  table: Parameters<typeof ListPageHeader>[0]["table"];
  role: string | undefined;
  columns: Parameters<typeof Table>[0]["columns"];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
  page: number;
};

const ListPageContainer = ({
  title,
  count,
  table,
  role,
  columns,
  renderRow,
  data,
  page,
}: ListPageContainerProps) => {
  return (
    <main className="bg-white p-2 md:p-4 rounded-xl flex-1 m-2 md:m-4shadow-sm">
      <ListPageHeader title={title} count={count} table={table} role={role}>
        {role === "admin" && <FormContainer table={table} type="create" />}
        {table === "exam" && role === "teacher" && (
          <FormContainer table={table} type="create" />
        )}
      </ListPageHeader>

      <div className="mt-4">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>

      <footer className="">
        <Pagination page={page} count={count} />
      </footer>
    </main>
  );
};

export default ListPageContainer;
