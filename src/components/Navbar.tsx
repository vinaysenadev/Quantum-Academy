import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Megaphone, MessageCircleCode, Search } from "lucide-react";
import Image from "next/image";

const Navbar = async () => {
  const user = await currentUser();

  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";
  const role = user?.publicMetadata?.role as string;

  return (
    <div className="flex items-center justify-between p-4 w-full">
      <div className="flex items-center gap-2 w-full ">
        <p className="text-2xl text-gray-600">Welcome, {firstName}! </p>
      </div>

      {/* ICONS AND USER */}
      <div className="flex-1 flex items-center gap-4 justify-end ">
        {/* SEARCH BAR */}
        {/* <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent outline-none"
          />
        </div> */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <MessageCircleCode className="icon" />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Megaphone className="icon" />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          <UserButton afterSignOutUrl="/" />
          <span className="inline-block mt-1 text-xs py-1 rounded-full bg-purple-100 p-4 text-purple-600 font-medium capitalize">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
