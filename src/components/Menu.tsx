"use client";
import { menuItems } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import Link from "next/link";
import React from "react";
import { Tooltip } from "react-tooltip";

const Menu = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string;

  return (
    <div className="bg-white">
      {menuItems.map((i) => {
        return (
          <div className="flex flex-col gap-1 justify-center" key={i.title}>
            <span className="hidden text-sm lg:block  font-light mt-1 text-gray-500 px-3">
              {i.title}
            </span>

            {i.items.map((item) => {
              if (item.visible.includes(role)) {
                let Icon = item?.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    data-tooltip-id="sidebar-tooltip"
                    data-tooltip-content={item.label}
                    className="flex items-center justify-center lg:justify-start gap-3 px-4 py-1.5 hover:bg-SkyLight"
                  >
                    {Icon && <Icon className="icon size-5 text-purple-500" />}
                    <span className="hidden text-gray-500 lg:block text-sm hover:font-semibold">
                      {item.label}
                    </span>
                  </Link>
                );
              }
            })}
            <div className="block lg:hidden">
              <Tooltip id="sidebar-tooltip" place="right" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
