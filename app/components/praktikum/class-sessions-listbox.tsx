import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { ISessionResponseBody } from "@/app/interfaces/session/session.interface";

interface ClassSessionListboxProps {
  sessions: ISessionResponseBody[];
  value: string;
  placeholder: string;
  disabled?: boolean;
  onClassSessionChange: (value: string) => void;
}

export default function ClassSessionListbox({
  sessions,
  value,
  placeholder,
  disabled = false,
  onClassSessionChange,
}: ClassSessionListboxProps) {
  const selected = sessions.find((session) => session.id === value);

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-3">
      <p className="text-base font-semibold text-[#5E6278]">Sesi Kelas</p>
      <Listbox
        value={value}
        onChange={onClassSessionChange}
        disabled={disabled}
      >
        <ListboxButton
          aria-label="Sesi Kelas"
          className={`flex h-full w-full flex-row items-center justify-between rounded-2xl bg-[#f5f5f5] px-[15px] font-semibold text-[#1D1D1D] disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <p className="truncate">
            {selected
              ? `Sesi ${selected.number} · ${selected.startAt}–${selected.endAt}`
              : placeholder}
          </p>
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className={`w-[var(--button-width)] space-y-3 rounded-lg bg-[#f5f5f5]`}
        >
          {sessions.map((session) => (
            <ListboxOption
              value={session.id}
              key={session.id}
              className={`flex h-[54px] cursor-pointer items-center justify-center px-[15px] font-semibold text-[#1d1d1d] data-[focus]:bg-[#3272CA] data-[focus]:text-white`}
            >
              Sesi {session.number}, {session.startAt} - {session.endAt}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
