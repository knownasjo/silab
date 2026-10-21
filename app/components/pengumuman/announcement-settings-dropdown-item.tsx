"use client";

import { MenuItem } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

interface AnnouncementSettingsDropdownItemProps {
  icon: string;
  title: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

export default function AnnouncementSettingsDropdownItem({
  icon,
  title,
  href,
  onClick,
  danger = false,
}: AnnouncementSettingsDropdownItemProps) {
  const content = (
    <>
      <div className="relative h-[20px] w-[20px] group-data-[focus]:brightness-0 group-data-[focus]:invert">
        <Image
          src={icon}
          alt="announcement settings"
          className="static"
          style={{ objectFit: "contain" }}
          fill
          priority
        />
      </div>
      <p className="text-sm font-semibold">{title}</p>
    </>
  );

  const className = `group flex w-full flex-row items-center space-x-3 px-4 py-3 text-left align-middle text-[#1D1D1D] data-[focus]:text-white ${
    danger ? "data-[focus]:bg-[#F1416C]" : "data-[focus]:bg-[#3272CA]"
  }`;

  return (
    <MenuItem>
      {href ? (
        <Link href={href} className={className}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={className}>
          {content}
        </button>
      )}
    </MenuItem>
  );
}
