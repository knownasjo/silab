"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SideBarProps {
  imageSrc: string;
  title: string;
  route: string;
  collapsed?: boolean;
}

export default function SideBarItem({
  route,
  imageSrc,
  title,
  collapsed = false,
}: SideBarProps) {
  const pathName = usePathname();

  const isActive =
    route === "/dashboard"
      ? pathName === "/dashboard"
      : pathName.startsWith(route);

  return (
    <div className="group/sidebaritem">
      <Link
        href={route}
        title={collapsed ? title : undefined}
        aria-label={collapsed ? title : undefined}
        className={`flex w-full flex-row rounded-full py-3 font-semibold text-[#5E6278] ${collapsed ? "justify-center" : "space-x-3 px-4"} ${isActive ? "bg-[#3285CA] bg-opacity-30" : ""} transition-all duration-300 group-hover/sidebaritem:bg-[#3285CA] group-hover/sidebaritem:bg-opacity-10`}
      >
        <Image
          className={
            collapsed
              ? ""
              : "transition-all duration-300 group-hover/sidebaritem:translate-x-3"
          }
          src={imageSrc}
          height={24}
          width={24}
          alt={title}
          priority
        />
        {!collapsed && (
          <p className="whitespace-nowrap transition-all duration-300 group-hover/sidebaritem:translate-x-3">
            {title}
          </p>
        )}
      </Link>
    </div>
  );
}
