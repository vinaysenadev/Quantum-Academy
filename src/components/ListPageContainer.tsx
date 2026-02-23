import ListPageHeader from "./ListPageHeader";
import Table from "./Table";
import Pagination from "./Pagination";
import { ReactNode } from "react";

type ListPageContainerProps = {
    title: string;
    count: number;
    table: Parameters<typeof ListPageHeader>[0]["table"];
    role: string | undefined;
    columns: Parameters<typeof Table>[0]["columns"];
    renderRow: Parameters<typeof Table>[0]["renderRow"];
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
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <ListPageHeader title={title} count={count} table={table} role={role} />
            <Table columns={columns} renderRow={renderRow} data={data} />
            <Pagination page={page} count={count} />
        </div>
    );
};

export default ListPageContainer;
