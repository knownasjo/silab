"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { Lecturer } from "@/app/interfaces/user/user.interface";
import { useEffect, useState } from "react";
import useDosenStore from "@/app/store/useDosenStore";
import FeedbackBox from "../feedback-box";

interface LecturerListBoxProps {
  value: string | null;
  onLecturerChange: (value: string) => void;
}

export default function LecturerListBox({
  value,
  onLecturerChange,
}: LecturerListBoxProps) {
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null,
  );

  const { getDosen, dosenData, error } = useDosenStore();

  useEffect(() => {
    getDosen();
  }, [getDosen]);

  useEffect(() => {
    if (!value) {
      setSelectedLecturer(null);
      return;
    }

    if (dosenData.length > 0) {
      const lecturer = dosenData.find((d) => d.id === value) || null;
      setSelectedLecturer(lecturer);
    }
  }, [value, dosenData]);

  return (
    <fieldset className="flex h-fit w-full min-w-0 flex-col space-y-3">
      <label className="text-base font-semibold text-[#5E6278]">
        Dosen Pengampu
      </label>
      <Listbox
        value={selectedLecturer}
        onChange={(value) => {
          setSelectedLecturer(value);
          onLecturerChange(value!.id);
        }}
      >
        <ListboxButton className="flex h-[54px] w-full flex-row items-center justify-between space-x-3 rounded-2xl bg-[#f5f5f5] px-[15px] text-left font-semibold text-[#1D1D1D] disabled:cursor-not-allowed disabled:opacity-60">
          <p className="truncate" title={selectedLecturer?.fullname}>
            {selectedLecturer
              ? selectedLecturer.fullname
              : "Pilih dosen pengampu"}
          </p>
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image src={"/down.png"} alt="chevron down" fill />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor={{ to: "bottom", gap: 8, padding: 16 }}
          className="w-[var(--button-width)] rounded-lg bg-[#f5f5f5]"
        >
          {dosenData.map((lecturer) => (
            <ListboxOption
              className="cursor-pointer px-[15px] py-3 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
              key={lecturer.id}
              value={lecturer}
            >
              {lecturer.fullname}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <FeedbackBox
        feedback={
          error
            ? { ok: false, message: `Daftar dosen gagal dimuat. ${error}` }
            : null
        }
      />
    </fieldset>
  );
}
