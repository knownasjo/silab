"use client";

import {
  CloseButton,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarGroupLink {
  href: string;
  title: string;
  icon: string;
}

interface SidebarGroupProps {
  title: string;
  icon: string;
  basePath: string;
  links: SidebarGroupLink[];
  collapsed: boolean;
}

export default function SidebarGroup({
  title,
  icon,
  basePath,
  links,
  collapsed,
}: SidebarGroupProps) {
  const pathName = usePathname();
  const isActive = pathName.startsWith(basePath);

  const linkClassName = (href: string) =>
    `flex h-full w-full flex-row items-center space-x-2 rounded-full px-3 py-2 hover:bg-[#3285CA] hover:bg-opacity-10 ${pathName.startsWith(href) ? "bg-[#3285CA] bg-opacity-30" : ""}`;

  const linkContent = (link: SidebarGroupLink) => (
    <>
      <div className="relative h-[20px] w-[20px] shrink-0">
        <Image src={link.icon} alt="" fill style={{ objectFit: "contain" }} />
      </div>
      <p className="whitespace-nowrap text-base font-medium text-[#5E6278]">
        {link.title}
      </p>
    </>
  );

  if (collapsed) {
    return (
      <Popover className="w-full">
        <PopoverButton
          title={title}
          aria-label={title}
          className={`flex w-full items-center justify-center rounded-full py-3 outline-none transition-all duration-300 hover:bg-[#3285CA] hover:bg-opacity-10 ${isActive ? "bg-[#3285CA] bg-opacity-30" : ""}`}
        >
          <Image src={icon} alt="" width={24} height={24} />
        </PopoverButton>
        <PopoverPanel
          anchor={{ to: "right start", gap: 16 }}
          className="z-50 flex w-60 flex-col space-y-1 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5"
        >
          <p className="px-3 pb-1 text-sm font-semibold text-[#5E6278]">
            {title}
          </p>
          {links.map((link) => (
            <CloseButton
              as={Link}
              key={link.href}
              href={link.href}
              className={linkClassName(link.href)}
            >
              {linkContent(link)}
            </CloseButton>
          ))}
        </PopoverPanel>
      </Popover>
    );
  }

  return (
    <div className="group/sidebaritem w-full">
      <Disclosure defaultOpen={isActive}>
        <DisclosureButton
          className={`group flex w-full flex-row items-center justify-between rounded-full py-3 pl-4 pr-6 transition-all duration-300 group-hover/sidebaritem:bg-[#3285CA] group-hover/sidebaritem:bg-opacity-10 ${isActive ? "bg-[#3285CA] bg-opacity-30" : ""}`}
        >
          <div className="flex flex-row space-x-3 transition-all duration-300 group-hover/sidebaritem:translate-x-3">
            <Image src={icon} alt="" width={24} height={24} />
            <span className="whitespace-nowrap font-semibold text-[#5E6278]">
              {title}
            </span>
          </div>
          <div className="relative h-5 w-5 shrink-0">
            <Image
              src={"/down.png"}
              alt=""
              fill
              style={{ objectFit: "contain" }}
              className="duration-300 group-hover/sidebaritem:translate-x-3 group-data-[open]:rotate-180"
            />
          </div>
        </DisclosureButton>
        <DisclosurePanel className={`ml-8 mt-2 space-y-3`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClassName(link.href)}
            >
              {linkContent(link)}
            </Link>
          ))}
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
