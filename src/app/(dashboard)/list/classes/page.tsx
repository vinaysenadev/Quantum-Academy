import FormModal from "@/components/FormModal";
import ListPageContainer from "@/components/ListPageContainer";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { currentUser } from "@clerk/nextjs/server";
import { Class, Prisma, Teacher } from "@prisma/client";
import { getPageNumber } from "@/lib/queryUtils";

type ClassList = Class & { supervisor: Teacher };

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const { page, ...queryParams } = searchParams;

  const p = getPageNumber(page);

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.class.count({ where: query }),
  ]);

  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },
    {
      header: "Capacity",
      accessor: "capacity",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell text-center">{item.capacity}</td>
      <td className="hidden md:table-cell text-center">{item.name}</td>
      <td className="hidden md:table-cell text-center">
        {`${item.supervisor?.name} ${item.supervisor.surname}`}
      </td>
      {role === "admin" && (
        <td>
          <div className="flex items-center justify-center gap-2">
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <ListPageContainer
      title="All Classes"
      count={count}
      table="class"
      role={role}
      columns={columns}
      renderRow={renderRow}
      data={data}
      page={p}
      source="class"
    />
  );
};

export default ClassListPage;
