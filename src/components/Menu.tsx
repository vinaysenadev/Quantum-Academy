import { menuItems } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Menu = () => {
  return (
    <div className="">
      {menuItems.map((i) => {
        return (
          <div className="flex flex-col gap-2" key={i.title}>
            <span className="hidden lg:block  font-light my-4 text-gray-500 px-1">
              {i.title}
            </span>

            {i.items.map((item) => {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center gap-2 p-1"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                  />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
