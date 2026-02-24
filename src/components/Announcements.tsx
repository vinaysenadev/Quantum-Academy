import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import { bgColors } from "@/lib/data";
import prisma from "@/lib/prisma";

const Announcements = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: user?.id! } } },
    student: { students: { some: { id: user?.id! } } },
    parent: { students: { some: { parentId: user?.id! } } },
  };

  const data = await prisma.announcement.findMany({
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
    take: 5,
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Announcements</h1>
        <Link
          href="/list/announcements"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="View all announcements"
        >
          View All
        </Link>
      </div>
      <div
        className="flex flex-col gap-4"
        role="list"
        aria-label="Recent Announcements"
      >
        {data.length > 0 ? (
          data.map((announcement, index) => (
            <div
              key={announcement.id}
              className={`${bgColors[index % bgColors.length]} rounded-md p-4`}
              role="listitem"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcement.title}</h2>
                <span className="text-xs text-gray-500 bg-white/80 rounded-md px-2 py-1">
                  {announcement.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {announcement.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No announcements found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
