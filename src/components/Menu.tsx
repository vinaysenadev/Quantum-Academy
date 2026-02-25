"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Tooltip } from "react-tooltip";

import { menuItems } from "@/lib/data";

const Menu = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string;
  const pathname = usePathname();

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
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    data-tooltip-id="sidebar-tooltip"
                    data-tooltip-content={item.label}
                    className={`px-0 lg:px-4 flex items-center justify-center lg:justify-start gap-3  py-3 transition-all duration-200 group relative ${
                      isActive ? "bg-SkyLight shadow-sm" : "hover:bg-gray-50"
                    }`}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 hidden lg:block" />
                    )}
                    {Icon && (
                      <Icon
                        className={`size-5 transition-colors ${
                          isActive
                            ? "text-purple-700"
                            : "text-gray-400 group-hover:text-purple-600"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`hidden lg:block text-[14px] transition-colors ${
                        isActive
                          ? "text-purple-700 font-semibold"
                          : "text-gray-600 group-hover:text-purple-600"
                      }`}
                    >
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
