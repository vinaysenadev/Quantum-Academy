import { MoreHorizontal } from "lucide-react";
import React from "react";

import prisma from "@/lib/prisma";
import AttendanceChart from "./AttendanceChart";

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

  return (
    <div className="bg-white rounded-xl p-4 h-full shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">Attendance</h1>
        <button
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="More attendance options"
        >
          <MoreHorizontal className="text-gray-400 size-5" aria-hidden="true" />
        </button>
      </div>
      <AttendanceChart />
    </div>
  );
};

export default AttendanceChartContainer;
