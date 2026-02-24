"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Tooltip } from "react-tooltip";

import { menuItems } from "@/lib/data";

const Menu = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string;

  return (
    <nav
      className="bg-white flex flex-col gap-4 py-4"
      aria-label="Main Navigation"
    >
      {menuItems.map((segment) => (
        <div className="flex flex-col gap-1" key={segment.title}>
          <span className="hidden lg:block text-xs font-bold uppercase tracking-wider text-gray-400 px-4 mb-2">
            {segment.title}
          </span>

          <div className="flex flex-col">
            {segment.items.map((item) => {
              if (item.visible.includes(role)) {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    data-tooltip-id="sidebar-tooltip"
                    data-tooltip-content={item.label}
                    className="flex items-center justify-center lg:justify-start gap-3 px-4 py-2 hover:bg-SkyLight transition-colors group"
                    aria-label={item.label}
                  >
                    {Icon && (
                      <Icon
                        className="size-5 text-purple-500 group-hover:text-purple-700 transition-colors"
                        aria-hidden="true"
                      />
                    )}
                    <span className="hidden lg:block text-gray-600 text-[14px] group-hover:text-purple-700 transition-colors">
                      {item.label}
                    </span>
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
      <div className="block lg:hidden">
        <Tooltip id="sidebar-tooltip" place="right" />
      </div>
    </nav>
  );
};

export default Menu;
