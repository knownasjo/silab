"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";

interface ActivityFilterListboxProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

export default function ActivityFilterListbox<T extends string>({
  label,
  value,
  options,
  onChange,
}: ActivityFilterListboxProps<T>) {
  const selected =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="text-sm font-semibold text-[#5E6278]">{label}</p>
      <Listbox value={selected.value} onChange={onChange}>
        <ListboxButton
          aria-label={`Pilih ${label.toLowerCase()}`}
          className="flex h-[44px] min-w-[200px] flex-row items-center justify-between space-x-3 rounded-xl bg-white px-4 text-sm font-semibold text-[#1D1D1D]"
        >
          <span>{selected.label}</span>
          <span className="relative h-[20px] w-[20px] shrink-0">
            <Image src={"/down.png"} alt="" fill />
          </span>
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: "bottom start", gap: 8, padding: 16 }}
          className="z-50 w-(--button-width) rounded-xl bg-white shadow-lg"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#1D1D1D] data-focus:bg-[#3272CA] data-focus:text-white"
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
