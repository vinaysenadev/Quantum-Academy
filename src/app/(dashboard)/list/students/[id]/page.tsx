import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";

import Performance from "@/components/Performance";
import StudentAttenanceCard from "@/components/StudentAttenanceCard";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Class, Student } from "@prisma/client";
import { Calendar, Mail, Phone, Syringe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const SingleStudentPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: {
      id: params.id,
    },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });
  console.log(student);
  if (!student) {
    return <div>Student not found</div>;
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-Sky p-2 rounded-md flex-1 flex  gap-1">
            <div className="w-1/3 md:w-1/3  p-2">
              <Image
                src={
                  (student?.img as string)
                    ? (student?.img as string)
                    : student?.sex === "FEMALE"
                      ? "/women.png"
                      : "/male.png"
                }
                alt=""
                width={144}
                height={144}
                className="w-full h-full  rounded-xl object-cover"
              />
            </div>
            <div className="w-2/3  p-2 flex flex-col gap-2 justify-between">
              <div className="flex justify-between items-center">
                <h1 className="text-md md:text-xl font-semibold capitalize">
                  {student?.name} {student?.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
              </div>
              <div className="flex flex-col gap-1.5 text-sm font-semibold text-gray-500">
                <div className="flex flex-1/2 items-center gap-2">
                  <Syringe className="icon text-black" />
                  <span>{student?.bloodType}</span>
                </div>
                <div className="flex flex-1/2 items-center gap-2">
                  <Calendar className="icon text-black" />
                  <span>
                    {new Intl.DateTimeFormat("en-US").format(student?.birthday)}
                  </span>
                </div>
                <div className="flex flex-1/2 items-center gap-2">
                  <Mail className="icon text-black" />
                  <span>{student?.email}</span>
                </div>
                <div className="flex flex-1/2 items-center gap-2">
                  <Phone className="icon text-black size-4" />
                  <span>{student?.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <Suspense fallback={<div>Loading...</div>}>
                <StudentAttenanceCard studentId={student.id} />
              </Suspense>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {student?.class?.name.charAt(0)}
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {student?.class?._count?.lessons}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {student?.class?.name}
                </h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendarContainer type="classId" id={student.classId} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-SkyLight"
              href={`/list/lessons?classId=${2}`}
            >
              Student&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-PurpleLight"
              href={`/list/teachers?classId=${2}`}
            >
              Student&apos;s Teachers
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?classId=${2}`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-SkyLight"
              href={`/list/assignments?classId=${2}`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              className="p-3 rounded-md bg-YellowLight"
              href={`/list/results?studentId=${2}`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
