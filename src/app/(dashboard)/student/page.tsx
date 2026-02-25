import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventsCalendar";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import EventCalendarContainer from "@/components/EventCalendarContainer";

const StudentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  const classItem = await prisma.class.findMany({
    where: { students: { some: { id: user?.id } } },
  });

  return (
    <div className="p-2 md:p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3 ">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0]?.id} />
        </div>
      </div>

      {/* right */}
      <div className="border-2 w-full lg:w-1/3">
        <Announcements />
        <EventCalendarContainer searchParams={searchParams} />
      </div>
    </div>
  );
};

export default StudentPage;
