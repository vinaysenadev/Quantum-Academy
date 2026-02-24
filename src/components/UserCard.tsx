import Image from "next/image";
import React from "react";

import prisma from "@/lib/prisma";
import { MoreHorizontal } from "lucide-react";

const UserCard = async ({
  type,
}: {
  type: "admin" | "student" | "teacher" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    student: prisma.student,
    teacher: prisma.teacher,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  const label = `${type.charAt(0).toUpperCase() + type.slice(1)}s`;

  return (
    <div
      className="rounded-xl odd:bg-Purple even:bg-Yellow p-4 flex-1 min-w-[130px] shadow-sm hover:shadow-md transition-shadow group"
      role="region"
      aria-label={`Total ${label}: ${data}`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-gray-500 font-bold border border-gray-100">
          2024/25
        </span>
        <button
          className="p-1 hover:bg-white/50 rounded-full transition-colors"
          aria-label={`More information about ${label}`}
        >
          {/* <MoreHorizontal className="text-gray-500" /> */}
        </button>
      </div>
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-gray-800">{data}</h1>
        <h2 className="capitalize text-sm font-semibold text-gray-500 mt-1">
          {label}
        </h2>
      </div>
    </div>
  );
};

export default UserCard;
