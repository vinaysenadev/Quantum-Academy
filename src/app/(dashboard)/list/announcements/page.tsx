import FormModal from "@/components/FormModal";
import ListPageContainer from "@/components/ListPageContainer";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { currentUser } from "@clerk/nextjs/server";
import { Announcement, Class, Prisma } from "@prisma/client";
import { getPageNumber } from "@/lib/queryUtils";

type AnnouncementList = Announcement & { class: Class };

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const { page, ...queryParams } = searchParams;
  const p = getPageNumber(page);

  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
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
  const renderRow = (item: AnnouncementList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td className="text-center">{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell text-center">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </td>

      {role === "admin" && (
        <td>
          <div className="flex items-center justify-center gap-2">
            <FormModal table="announcement" type="update" data={item} />
            <FormModal table="announcement" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <ListPageContainer
      title="All Announcements"
      count={count}
      table="announcement"
      role={role}
      columns={columns}
      renderRow={renderRow}
      data={data}
      page={p}
    />
  );
};

export default AnnouncementListPage;
