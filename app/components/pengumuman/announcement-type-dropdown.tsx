import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { AnnouncementTypeEnum } from "@/app/interfaces/announcement/announcement.interface";
import { ANNOUNCEMENT_TYPES } from "@/app/utils/announcement";

interface AnnouncementTypeDropdownProps {
  value: AnnouncementTypeEnum;
  onAnnouncementTypeChange: (value: AnnouncementTypeEnum) => void;
}

export default function AnnouncementTypeDropdown({
  value,
  onAnnouncementTypeChange,
}: AnnouncementTypeDropdownProps) {
  const selected = ANNOUNCEMENT_TYPES.find((type) => type.value === value);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Jenis Pengumuman</p>
      <Menu>
        <MenuButton
          value={value}
          className={`flex h-[64px] w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D]`}
        >
          {selected?.title ?? "Pengumuman"}
          <div className="relative h-[24px] w-[24px]">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {ANNOUNCEMENT_TYPES.map((announcement) => (
            <MenuItem key={announcement.value}>
              <button
                onClick={() => onAnnouncementTypeChange(announcement.value)}
                className="flex w-full flex-row items-start justify-start px-[15px] py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
              >
                {announcement.title}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
