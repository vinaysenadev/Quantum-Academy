import prisma from "@/lib/prisma";
import React from "react";

const StudentAttenanceCard = async ({ studentId }: { studentId: string }) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: studentId,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });
  const totalDaya = attendance.length;
  const presentDays = attendance.filter((a) => a.present).length;
  const percentage = Math.round((presentDays / totalDaya) * 100);

  return (
    <div className="">
      <h1 className="text-xl font-semibold">{percentage}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttenanceCard;
