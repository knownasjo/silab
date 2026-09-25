"use client";

import SideBarItem, { SideBarProps } from "./sidebar-item";
import SignOutButton from "./signout-button";
import SidebarAccount from "./sidebar-account";
import SidebarGroup, { SidebarGroupLink } from "./sidebar-group";
import useAuthStore from "../store/useAuthStore";
import { SIDEBAR_COLLAPSED_COOKIE } from "../utils/sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const sideBarItems: SideBarProps[] = [
  { imageSrc: "/dashboard.png", route: "/dashboard", title: "Dashboard" },
  {
    imageSrc: "/bookmark.png",
    route: "/dashboard/praktikum",
    title: "Praktikum",
  },
];

const masterDataLinks: SidebarGroupLink[] = [
  {
    href: "/dashboard/master-data/add-subject",
    title: "Tambah Mata Kuliah",
    icon: "/add-announcement.png",
  },
  {
    href: "/dashboard/master-data/pembayaran",
    title: "Pembayaran",
    icon: "/information.png",
  },
  {
    href: "/dashboard/master-data/jam-sesi",
    title: "Jam Sesi",
    icon: "/clock.svg",
  },
];

const pengumumanLinks: SidebarGroupLink[] = [
  {
    href: "/dashboard/pengumuman/add-pengumuman",
    title: "Buat Pengumuman",
    icon: "/add-announcement.png",
  },
  {
    href: "/dashboard/pengumuman/list-pengumuman",
    title: "List Pengumuman",
    icon: "/announcement-list.png",
  },
];

export default function SideBar({
  initialCollapsed = false,
}: {
  initialCollapsed?: boolean;
}) {
  const { userData, me, isLoading } = useAuthStore();
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  useEffect(() => {
    me();
  }, [me]);

  const toggleCollapsed = () => {
    const next = !collapsed;

    setCollapsed(next);
    document.cookie = `${SIDEBAR_COLLAPSED_COOKIE}=${next ? "1" : "0"}; path=/; max-age=31536000; samesite=lax`;
  };

  const isRoleUnknown = !userData && isLoading;
  const toggleLabel = collapsed ? "Perluas menu" : "Perkecil menu";

  return (
    <aside
      className={`relative flex h-full shrink-0 flex-col justify-between py-12 transition-[width,padding] duration-300 ${collapsed ? "w-[104px] px-6" : "w-[300px] px-8"}`}
    >
      <button
        type="button"
        onClick={toggleCollapsed}
        title={toggleLabel}
        aria-label={toggleLabel}
        aria-expanded={!collapsed}
        className="absolute -right-4 top-14 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#E4E6EF] bg-white shadow-sm transition-colors hover:bg-[#F1F1F2]"
      >
        <div
          className={`relative h-4 w-4 transition-transform duration-300 ${collapsed ? "-rotate-90" : "rotate-90"}`}
        >
          <Image
            src={"/down.png"}
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </button>

      <nav className="flex min-h-0 w-full flex-1 flex-col space-y-5 overflow-y-auto overflow-x-hidden">
        {sideBarItems.map((item) => (
          <SideBarItem
            imageSrc={item.imageSrc}
            route={item.route}
            title={item.title}
            collapsed={collapsed}
            key={item.title}
          />
        ))}

        {isRoleUnknown &&
          [...Array(2)].map((_, index) => (
            <div key={index} className="h-10 w-full">
              <Skeleton height={40} borderRadius={9999} />
            </div>
          ))}

        {userData?.role === "LABORAN" && (
          <>
            <SidebarGroup
              title="Master Data"
              icon="/master-data.png"
              basePath="/dashboard/master-data/"
              links={masterDataLinks}
              collapsed={collapsed}
            />
            <SidebarGroup
              title="Pengumuman"
              icon="/announcement.png"
              basePath="/dashboard/pengumuman/"
              links={pengumumanLinks}
              collapsed={collapsed}
            />
          </>
        )}
      </nav>

      <div className="space-y-2 pt-5">
        <SidebarAccount collapsed={collapsed} />
        <SignOutButton collapsed={collapsed} />
      </div>
    </aside>
  );
}
