import React from "react";
import AttendanceChart from "./AttendanceChart";
import { MoreHorizontal } from "lucide-react";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const data = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  console.log(data);
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-md font-semibold">Attendance</h1>
        <MoreHorizontal className="text-gray-400" />
      </div>
      <AttendanceChart />
    </div>
  );
};

export default AttendanceChartContainer;
