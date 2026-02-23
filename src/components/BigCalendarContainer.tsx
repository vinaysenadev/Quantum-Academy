import prisma from "@/lib/prisma";
import React from "react";
import BigCalendar from "./BigCalendar";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const response = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const data = response.map((lesson) => ({
    id: lesson.id,
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));
  console.log(data, "big calendar");
  return (
    <div className="">
      <BigCalendar data={data} />
    </div>
  );
};

export default BigCalendarContainer;
