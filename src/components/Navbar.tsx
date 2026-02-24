import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Megaphone, MessageCircleCode } from "lucide-react";
import React from "react";

const Navbar = async () => {
  const user = await currentUser();

  const firstName = user?.firstName || "User";
  const role = user?.publicMetadata?.role as string;

  return (
    <header className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-md sticky top-0 z-10 w-full shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Welcome, <span className="text-purple-700">{firstName}</span>!
        </h1>
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-3">
          <button
            className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors relative shadow-sm"
            aria-label="Messages"
          >
            <MessageCircleCode
              className="size-5 text-gray-600"
              aria-hidden="true"
            />
          </button>

          <button
            className="p-2 bg-white hover:bg-gray-100 rounded-full transition-colors relative shadow-sm"
            aria-label="Notifications"
          >
            <Megaphone className="size-5 text-gray-600" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full text-[10px] font-bold">
              1
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-gray-800 capitalize leading-tight">
              {firstName}
            </span>
            <span className="text-[10px] font-medium text-gray-400 capitalize">
              {role}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-9 shadow-sm",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
