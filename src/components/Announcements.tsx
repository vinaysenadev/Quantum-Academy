import { bgColors } from "@/lib/data";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

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
  console.log(data, "Announcements");

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-md font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data.map((announcement, index) => {
          console.log(index, bgColors[index % bgColors.length]);
          return (
            <div
              key={index}
              className={`${bgColors[index % bgColors.length]} rounded-md p-4`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announcement.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {announcement.date.toLocaleDateString("en-US")}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {announcement.description}
              </p>
            </div>
          );
        })}

        {/* <div className="bg-PurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            expedita. Rerum, quidem facilis?
          </p>
        </div>
        <div className="bg-YellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
            expedita. Rerum, quidem facilis?
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Announcements;
