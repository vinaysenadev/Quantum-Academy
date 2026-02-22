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
    <div className="overflow-hidden rounded-lg border my-4 border-gray-300">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-[#C3EBFA]">
          <tr className="text-gray-500  text-sm px-2">
            {columns.map((column, i) => {
              return (
                <th
                  key={column.accessor}
                  className={`px-2  py-2.5  ${
                    i > 0 ? "text-center" : "text-left"
                  } ${column.className}`}
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    </div>
  );
};

export default Table;
