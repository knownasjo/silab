"use client";

import { AnnouncementTypeEnum } from "@/app/interfaces/announcement/announcement.interface";
import useSubjectStore from "@/app/store/useSubjectStore";
import { useEffect } from "react";

interface AnnouncementAudienceFieldProps {
  type: AnnouncementTypeEnum;
  value: string[] | null;
  onChange: (value: string[] | null) => void;
}

export default function AnnouncementAudienceField({
  type,
  value,
  onChange,
}: AnnouncementAudienceFieldProps) {
  const { subjectsData, getAllSubjects } = useSubjectStore();

  useEffect(() => {
    if (useSubjectStore.getState().subjectsData.length === 0) getAllSubjects();
  }, [getAllSubjects]);

  if (type !== AnnouncementTypeEnum.BASIC)
    return (
      <div className="flex flex-col space-y-2">
        <p className="text-base font-semibold text-[#5E6278]">Untuk</p>
        <p className="text-sm font-semibold text-[#1D1D1D]">
          Semua mahasiswa. Pengumuman pendaftaran selalu untuk semua mahasiswa.
        </p>
      </div>
    );

  const subjects = [...subjectsData].sort(
    (a, b) =>
      Number(a.semester) - Number(b.semester) ||
      a.subject_name.localeCompare(b.subject_name),
  );

  const toggle = (subjectId: string) =>
    onChange(
      value?.includes(subjectId)
        ? value.filter((id) => id !== subjectId)
        : [...(value ?? []), subjectId],
    );

  return (
    <fieldset className="flex flex-col space-y-2">
      <legend className="mb-2 text-base font-semibold text-[#5E6278]">
        Untuk
      </legend>
      <label className="flex w-fit cursor-pointer flex-row items-center space-x-3 text-sm font-semibold text-[#1D1D1D]">
        <input
          type="radio"
          name="announcement-audience"
          checked={value === null}
          onChange={() => onChange(null)}
          className="h-4 w-4 accent-[#3272CA]"
        />
        <span>Semua mahasiswa</span>
      </label>
      <label className="flex w-fit cursor-pointer flex-row items-center space-x-3 text-sm font-semibold text-[#1D1D1D]">
        <input
          type="radio"
          name="announcement-audience"
          checked={value !== null}
          onChange={() => onChange(value ?? [])}
          className="h-4 w-4 accent-[#3272CA]"
        />
        <span>Mahasiswa mata kuliah tertentu</span>
      </label>
      {value !== null && (
        <div className="ml-7 flex flex-col space-y-2">
          <div
            role="group"
            aria-label="Mata kuliah tujuan"
            className="flex max-h-[220px] flex-col space-y-1 overflow-y-auto rounded-2xl bg-[#F5F5F5] p-3"
          >
            {subjects.length === 0 && (
              <p className="p-2 text-sm text-[#5E6278]">
                Belum ada mata kuliah.
              </p>
            )}
            {subjects.map((subject) => (
              <label
                key={subject.id}
                className="flex cursor-pointer flex-row items-center space-x-3 rounded-xl px-2 py-1.5 text-sm font-semibold text-[#1D1D1D] hover:bg-white"
              >
                <input
                  type="checkbox"
                  checked={value.includes(subject.id)}
                  onChange={() => toggle(subject.id)}
                  className="h-4 w-4 shrink-0 accent-[#3272CA]"
                />
                <span className="min-w-0 break-words">
                  {subject.subject_name}{" "}
                  <span className="text-xs font-normal text-[#5E6278]">
                    {subject.subject_code} · Semester {subject.semester}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs font-semibold text-[#5E6278]">
            Hanya tampil untuk mahasiswa yang mendaftar mata kuliah itu di
            semester ini dan asisten kelasnya.
          </p>
        </div>
      )}
    </fieldset>
  );
}
