export const dynamic = "force-dynamic";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { currentUser } from "@clerk/nextjs/server";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import { Filter, SortAsc, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  // url params
  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
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
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden md:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
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

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center text-left gap-4 p-2 ">
        <Image
          src={
            item.img
              ? item?.img
              : item?.sex === "FEMALE"
              ? "/women.png"
              : "/male.png"
          }
          alt=""
          width={30}
          height={30}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <h3 className="font-semibold text-[0.8rem]">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell text-center">{item.username}</td>
      <td className="hidden md:table-cell text-center">
        {item.subjects.map((subject) => subject.name).join(",")}
      </td>
      <td className="hidden md:table-cell text-center">
        {item.classes.map((classItem) => classItem.name).join(",") || "-"}
      </td>
      <td className="hidden md:table-cell text-center">{item.phone}</td>
      <td className="hidden md:table-cell text-center">{item.address}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="button-rounded bg-Purple hover:bg-white">
              <View className="icon" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex flex-row items-center justify-between">
        <h1 className="hidden md:block text-md font-semibold">
          All Teachers ({count})
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />

          <div className="flex gap-2 items-center">
            <button className="button-rounded">
              <Filter className="icon" />
            </button>
            <button className="button-rounded">
              <SortAsc className="icon" />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* list */}

      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* pagination */}
      <div className="">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default TeacherListPage;
