"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const semesters: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface SemestersListBoxProps {
  value?: string;
  onSemesterChange: (value: string) => void;
}

export default function SemestersListBox({
  value,
  onSemesterChange,
}: SemestersListBoxProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  useEffect(() => {
    if (value !== undefined) setSelectedSemester(value);
  }, [value]);

  return (
    <fieldset className="flex h-fit w-1/3 min-w-0 flex-col space-y-3">
      <label className="text-base font-semibold text-[#5E6278]">Semester</label>
      <Listbox
        value={selectedSemester}
        onChange={(value) => {
          setSelectedSemester(value);
          onSemesterChange(value);
        }}
      >
        <ListboxButton className="flex h-[54px] w-full flex-row items-center justify-between space-x-3 rounded-2xl bg-[#f5f5f5] px-[15px] text-left font-semibold text-[#1D1D1D] disabled:cursor-not-allowed disabled:opacity-60">
          <p className="truncate">{selectedSemester || "Pilih semester"}</p>
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: "bottom", gap: 8, padding: 16 }}
          className="w-[var(--button-width)] rounded-lg bg-[#f5f5f5]"
        >
          {semesters.map((semester) => (
            <ListboxOption
              className="cursor-pointer px-[15px] py-3 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
              key={semester}
              value={semester}
            >
              {semester}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </fieldset>
  );
}
