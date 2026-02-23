import FormModal from "@/components/FormModal";
import ListPageContainer from "@/components/ListPageContainer";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { getPageNumber } from "@/lib/queryUtils";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const { page, ...queryParams } = searchParams;

  const p = getPageNumber(page);

  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: { lesson: { teacherId: user?.id } } },
        { assignment: { lesson: { teacherId: user?.id } } },
      ];
      break;
    case "student":
      query.studentId = user?.id;
      break;
    case "parent":
      query.student = {
        parentId: user?.id,
      };
      break;
    default:
      break;
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  const data = dataRes
    .map((item) => {
      const assessment = item.exam || item.assignment;

      if (!assessment) return null;

      const isExam = "startTime" in assessment;

      return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        score: item.score,
        className: assessment.lesson.class.name,
        startTime: isExam
          ? assessment.startTime
          : (assessment as any).startDate,
      };
    })
    .filter(Boolean) as ResultList[];

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
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
  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4 text-center ">{item.title}</td>
      <td className="text-center">
        {item.studentName + " " + item.studentSurname}
      </td>
      <td className="hidden md:table-cell text-center">{item.score}</td>
      <td className="hidden md:table-cell text-center">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden md:table-cell text-center">{item.className}</td>
      <td className="hidden md:table-cell text-center">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      {(role === "teacher" || role === "admin") && (
        <td>
          <div className="flex items-center justify-center gap-2">
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <ListPageContainer
      title="All Results"
      count={count}
      table="result"
      role={role}
      columns={columns}
      renderRow={renderRow}
      data={data}
      page={p}
    />
  );
};

export default ResultListPage;
