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
    <div className="w-full overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-SkyLight">
          <tr>
            {columns.map((column, i) => (
              <th
                key={column.accessor}
                scope="col"
                className={`px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-600 ${
                  i > 0 && !column.className?.includes("text-left")
                    ? "text-center"
                    : "text-left"
                } ${column.className || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((item) => renderRow(item))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-gray-400 italic"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
