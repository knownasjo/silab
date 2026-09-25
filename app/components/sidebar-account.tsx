"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthStore from "../store/useAuthStore";
import { nameInitials } from "../utils/initials";

const ROLE_LABELS: Record<string, string> = {
  LABORAN: "Laboran",
  DOSEN: "Dosen",
  MAHASISWA: "Asisten",
};

export default function SidebarAccount({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const { userData } = useAuthStore();

  if (!userData) return null;

  const canOpenProfile = userData.role !== "MAHASISWA";
  const isActive = pathname === "/dashboard/profil";
  const role = ROLE_LABELS[userData.role] ?? userData.role;

  const content = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#FFBF01] bg-[#FBFBEF] text-sm font-bold text-[#FFBF01]">
        {nameInitials(userData.name)}
      </span>
      {!collapsed && (
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-bold text-[#1D1D1D]">
            {userData.name}
          </span>
          <span className="text-xs font-semibold text-[#5E6278]">{role}</span>
        </span>
      )}
    </>
  );

  const className = `flex w-full flex-row items-center rounded-full py-2 ${collapsed ? "justify-center" : "space-x-3 px-3"}`;

  if (!canOpenProfile) {
    return (
      <div className={className} title={collapsed ? userData.name : undefined}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href="/dashboard/profil"
      title={collapsed ? `Profil ${userData.name}` : undefined}
      aria-label={`Profil ${userData.name}`}
      className={`${className} transition-all duration-300 hover:bg-[#3285CA] hover:bg-opacity-10 ${isActive ? "bg-[#3285CA] bg-opacity-30" : ""}`}
    >
      {content}
    </Link>
  );
}
