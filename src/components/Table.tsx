import React from "react";

type Column = {
  header: string;
  accessor: string;
  className?: string;
};

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: Column[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full my-4">
      <thead className="">
        <tr className="text-gray-500 text-left text-sm">
          {columns.map((column) => {
            return (
              <th key={column.accessor} className={column.className}>
                {column.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
