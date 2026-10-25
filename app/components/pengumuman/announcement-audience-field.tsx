"use client";

import { AnnouncementTypeEnum } from "@/app/interfaces/announcement/announcement.interface";
import FeedbackBox from "@/app/components/feedback-box";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import useSubjectStore from "@/app/store/useSubjectStore";
import { useEffect, useState } from "react";

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
  const {
    subjectsData,
    isLoaded,
    loadCount,
    error,
    getAllSubjects,
    refreshAllSubjects,
  } = useSubjectStore();
  const [loadCountAtMount] = useState(loadCount);

  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  useRealtimeEvents((event) => {
    if (["ready", "subject"].includes(event.type)) refreshAllSubjects();
  });

  useEffect(() => {
    if (loadCount === loadCountAtMount || !value) return;

    const kept = value.filter((id) =>
      subjectsData.some((subject) => subject.id === id),
    );

    if (kept.length < value.length) onChange(kept);
  }, [loadCount, loadCountAtMount, subjectsData, value, onChange]);

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
      a.subjectName.localeCompare(b.subjectName),
  );

  const toggle = (subjectId: string) =>
    onChange(
      value?.includes(subjectId)
        ? value.filter((id) => id !== subjectId)
        : [...(value ?? []), subjectId],
    );

  const audienceOption = (
    label: string,
    selected: boolean,
    pick: () => void,
  ) => (
    <label
      className={`flex w-fit cursor-pointer flex-row items-center space-x-3 text-sm font-semibold transition-colors ${selected ? "text-[#3272CA]" : "text-[#5E6278] hover:text-[#1D1D1D]"}`}
    >
      <input
        type="radio"
        name="announcement-audience"
        checked={selected}
        onChange={pick}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#BFD9EF] bg-white transition-colors peer-checked:border-[#3272CA] peer-focus-visible:ring-2 peer-focus-visible:ring-[#3272CA]/40"
      >
        <span
          className={`h-2.5 w-2.5 rounded-full transition-colors ${selected ? "bg-[#3272CA]" : "bg-transparent"}`}
        />
      </span>
      <span>{label}</span>
    </label>
  );

  return (
    <fieldset className="flex flex-col space-y-3">
      <legend className="mb-3 text-base font-semibold text-[#5E6278]">
        Untuk
      </legend>
      <div className="flex flex-col space-y-3">
        {audienceOption("Semua mahasiswa", value === null, () =>
          onChange(null),
        )}
        {audienceOption("Mata kuliah tertentu", value !== null, () =>
          onChange(value ?? []),
        )}
      </div>
      {value !== null && (
        <div className="ml-8 flex flex-col space-y-2">
          {!isLoaded && error ? (
            <FeedbackBox
              feedback={{
                ok: false,
                message: `Daftar mata kuliah gagal dimuat. ${error}`,
              }}
            />
          ) : (
            <div
              role="group"
              aria-label="Mata kuliah tujuan"
              className="flex max-h-[240px] flex-col space-y-1 overflow-y-auto rounded-2xl border-2 border-[#F1F1F2] p-2"
            >
              {!isLoaded && (
                <p className="p-2 text-sm text-[#5E6278]">Loading...</p>
              )}
              {isLoaded && subjects.length === 0 && (
                <p className="p-2 text-sm text-[#5E6278]">
                  Belum ada mata kuliah.
                </p>
              )}
              {subjects.map((subject) => {
                const isChecked = value.includes(subject.id);

                return (
                  <label
                    key={subject.id}
                    className={`flex cursor-pointer flex-row items-center space-x-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isChecked ? "bg-[#D2E3F1]/40 text-[#3272CA]" : "text-[#1D1D1D] hover:bg-[#F5F5F5]"}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(subject.id)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-[#BFD9EF] bg-white transition-colors peer-checked:border-[#3272CA] peer-checked:bg-[#3272CA] peer-focus-visible:ring-2 peer-focus-visible:ring-[#3272CA]/40"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className={`h-3 w-3 ${isChecked ? "opacity-100" : "opacity-0"}`}
                      >
                        <path
                          d="M2.5 6.5l2.5 2.5 4.5-5"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0 break-words">
                      {subject.subjectName}{" "}
                      <span className="text-xs font-normal text-[#5E6278]">
                        {subject.subjectCode} · Semester {subject.semester}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          )}
          <p className="text-xs font-semibold text-[#5E6278]">
            Hanya tampil untuk mahasiswa yang mendaftar mata kuliah itu di
            semester ini dan asisten kelasnya.
          </p>
        </div>
      )}
    </fieldset>
  );
}
