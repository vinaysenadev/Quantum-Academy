import FormModal from "@/components/FormModal";
import ListPageContainer from "@/components/ListPageContainer";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma, Subject, Teacher } from "@prisma/client";
import { getPageNumber } from "@/lib/queryUtils";

type SubjectList = Subject & { teachers: Teacher[] };

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  const { page, ...queryParams } = searchParams;
  const p = getPageNumber(page);
  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Teachers",
      accessor: "teachers",
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
  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell text-center">
        {item.teachers.map((teacher) => teacher.name).join(",")}
      </td>
      {role === "admin" && (
        <td>
          <div className="flex items-center justify-center gap-2 ">
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <ListPageContainer
      title="All Subjects"
      count={count}
      table="subject"
      role={role}
      columns={columns}
      renderRow={renderRow}
      data={data}
      page={p}
    />
  );
};

export default SubjectListPage;
