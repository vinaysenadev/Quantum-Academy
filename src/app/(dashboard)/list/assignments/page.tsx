import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

import FormModal from "@/components/FormModal";
import ListPageContainer from "@/components/ListPageContainer";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getPageNumber } from "@/lib/queryUtils";

type AssignmentList = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const { page, ...queryParams } = searchParams;
  const p = getPageNumber(page);
  const query: Prisma.AssignmentWhereInput = {};
  query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            (query.lesson as any).classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  // Role Conditions
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = user?.id;
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: user?.id,
          },
        },
      };
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: user?.id,
          },
        },
      };
      break;
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.lesson.subject.name}
      </td>
      <td className="text-center">{item.lesson.class.name}</td>
      <td className="hidden md:table-cell text-center">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell text-center">
        {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
      </td>

      {(role === "admin" || role === "teacher") && (
        <td>
          <div className="flex items-center justify-center gap-2">
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );
  return (
    <ListPageContainer
      title="All Assignments"
      count={count}
      table="assignment"
      role={role}
      columns={columns}
      renderRow={renderRow}
      data={data}
      page={p}
    />
  );
};

export default AssignmentListPage;
