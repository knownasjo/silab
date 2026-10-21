"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { DAY_LABELS, formatDay } from "@/app/utils/day";

interface ClassDayDropdownProps {
  onDayChange: (value: string) => void;
  value: string;
}

export default function ClassDayDropdown({
  onDayChange,
  value,
}: ClassDayDropdownProps) {
  return (
    <div className="flex min-w-[150px] flex-1 flex-col space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Hari</p>
      <Listbox value={value} onChange={onDayChange}>
        <ListboxButton className="flex h-[54px] w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D] disabled:cursor-not-allowed disabled:opacity-60">
          <p className="truncate">{value ? formatDay(value) : "Hari"}</p>
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {Object.entries(DAY_LABELS).map(([day, title]) => (
            <ListboxOption
              value={day}
              key={day}
              className={`cursor-pointer px-[15px] py-2 font-semibold text-[#1d1d1d] data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
            >
              {title}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
