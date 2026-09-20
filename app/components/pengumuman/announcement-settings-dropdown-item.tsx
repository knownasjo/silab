"use client";

import { MenuItem } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AnnouncementSettingsDropdownItemProps {
  hoverIcon: string;
  icon: string;
  title: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

export default function AnnouncementSettingsDropdownItem({
  hoverIcon,
  icon,
  title,
  href,
  onClick,
  danger = false,
}: AnnouncementSettingsDropdownItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const content = (
    <>
      <div className="relative h-[20px] w-[20px]">
        <Image
          src={isHovered ? hoverIcon : icon}
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

  const className = `flex w-full flex-row items-center space-x-3 rounded-lg p-3 text-left align-middle text-[#1D1D1D] ${
    danger
      ? "hover:bg-[#FFD9D9] hover:text-[#FF0000]"
      : "hover:bg-[#D1E7FB] hover:text-[#3272CA]"
  }`;

  return (
    <MenuItem>
      {href ? (
        <Link
          href={href}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={className}
        >
          {content}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={className}
        >
          {content}
        </button>
      )}
    </MenuItem>
  );
}
