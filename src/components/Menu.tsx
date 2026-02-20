import { menuItems, role } from "@/lib/data";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <div className=" bg-white">
      {menuItems.map((i) => {
        return (
          <div className="flex flex-col gap-1 justify-center" key={i.title}>
            <span className="hidden text-sm lg:block  font-light mt-3 text-gray-500 px-3">
              {i.title}
            </span>

            {i.items.map((item) => {
              if (item.visible.includes(role)) {
                let Icon = item?.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start gap-3 px-4 py-2 hover:bg-SkyLight"
                  >
                    {Icon && <Icon className="icon" />}
                    <span className="hidden text-gray-500 lg:block">
                      {item.label}
                    </span>
                  </Link>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
