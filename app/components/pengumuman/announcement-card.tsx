"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import AnnouncementSettingsDropdownItem from "./announcement-settings-dropdown-item";
import AnnouncementTypeBadge from "./announcement-type-badge";
import Image from "next/image";
import { IGetAllAnnouncementsResponseBody } from "@/app/interfaces/announcement/announcement.interface";
import useAuthStore from "@/app/store/useAuthStore";
import { audienceLabel, formatPostedAt } from "@/app/utils/announcement";

interface AnnouncementCardProps {
  announcement: IGetAllAnnouncementsResponseBody;
  onEdit: (announcement: IGetAllAnnouncementsResponseBody) => void;
  onDelete: (announcement: IGetAllAnnouncementsResponseBody) => void;
}

export default function AnnouncementCard({
  announcement,
  onEdit,
  onDelete,
}: AnnouncementCardProps) {
  const { userData } = useAuthStore();
  const canManage = userData?.role === "LABORAN";

  return (
    <div className="flex w-full flex-row space-x-3">
      <div className="flex min-h-[210px] w-full min-w-0 flex-col space-y-8 rounded-2xl bg-white p-8 text-[#1d1d1d]">
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1">
            <p className="break-words text-[22px] font-bold">
              {announcement.title}
            </p>
            <AnnouncementTypeBadge type={announcement.type} />
          </div>
          <p className="text-[16px] font-light">
            {formatPostedAt(announcement.createdAt)} oleh {announcement.author}
          </p>
          <p className="mt-1 break-words text-[14px] font-semibold text-[#5E6278]">
            Untuk: {audienceLabel(announcement)}
          </p>
        </div>
        <p className="line-clamp-3 whitespace-pre-line break-words text-[18px] font-semibold">
          {announcement.body}
        </p>
      </div>
      <Menu>
        <MenuButton className="relative h-[24px] w-[24px]">
          <Image
            src={"/dots-vertical.png"}
            alt="announcement settings"
            className="static"
            style={{ objectFit: "contain" }}
            fill
            priority
          />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className={`flex w-[220px] flex-col rounded-2xl bg-white shadow-[#1D1D1D]/10 drop-shadow-md`}
        >
          <AnnouncementSettingsDropdownItem
            icon="/details.png"
            title="Lihat Detail"
            href={`/dashboard/pengumuman/${announcement.id}`}
          />
          {canManage && (
            <>
              <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
              <AnnouncementSettingsDropdownItem
                icon="/edit.png"
                title="Edit"
                onClick={() => onEdit(announcement)}
              />
              <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
              <AnnouncementSettingsDropdownItem
                icon="/delete.png"
                title="Hapus"
                danger
                onClick={() => onDelete(announcement)}
              />
            </>
          )}
        </MenuItems>
      </Menu>
    </div>
  );
}
