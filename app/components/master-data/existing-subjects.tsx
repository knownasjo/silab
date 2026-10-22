"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IGetSubjectResponseBody } from "@/app/interfaces/subject/subject.interface";
import FeedbackBox from "../feedback-box";

interface ExistingSubjectsProps {
  subjects: IGetSubjectResponseBody[];
  isLoaded: boolean;
  error: string | null;
  selectedSemester: string;
}

type OpenSemesters = {
  open: Record<string, boolean>;
  auto: string;
};

export default function ExistingSubjects({
  subjects,
  isLoaded,
  error,
  selectedSemester,
}: ExistingSubjectsProps) {
  const [openSemesters, setOpenSemesters] = useState<OpenSemesters>({
    open: {},
    auto: "",
  });
  const groups = Object.entries(
    subjects.reduce<Record<string, IGetSubjectResponseBody[]>>(
      (all, subject) => {
        (all[subject.semester] ??= []).push(subject);
        return all;
      },
      {},
    ),
  )
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([semester, list]) => ({
      semester,
      subjects: [...list].sort((a, b) =>
        a.subject_name.localeCompare(b.subject_name),
      ),
    }));
  const onlySemester = groups.length === 1 ? groups[0].semester : null;

  useEffect(() => {
    setOpenSemesters((prev) => {
      if (selectedSemester === prev.auto) return prev;
      if (!selectedSemester) return { ...prev, auto: "" };

      const open = prev.auto ? { ...prev.open, [prev.auto]: false } : prev.open;

      return open[selectedSemester]
        ? { open, auto: "" }
        : {
            open: { ...open, [selectedSemester]: true },
            auto: selectedSemester,
          };
    });
  }, [selectedSemester]);

  useEffect(() => {
    if (onlySemester === null) return;

    setOpenSemesters((prev) =>
      onlySemester in prev.open
        ? prev
        : { ...prev, open: { ...prev.open, [onlySemester]: true } },
    );
  }, [onlySemester]);

  const toggleSemester = (semester: string) =>
    setOpenSemesters((prev) => ({
      open: { ...prev.open, [semester]: !prev.open[semester] },
      auto: prev.auto === semester ? "" : prev.auto,
    }));

  return (
    <div className="flex w-full flex-col space-y-4">
      <p className="text-lg font-bold text-[#1D1D1D]">
        Mata kuliah yang sudah ada
        {isLoaded && subjects.length > 0 && ` (${subjects.length})`}
      </p>
      {!isLoaded && error ? (
        <FeedbackBox
          feedback={{
            ok: false,
            message: `Daftar mata kuliah gagal dimuat. ${error}`,
          }}
        />
      ) : !isLoaded ? (
        <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
      ) : subjects.length === 0 ? (
        <p className="text-sm font-semibold text-[#5E6278]">
          Belum ada mata kuliah.
        </p>
      ) : (
        <div className="flex w-full flex-col rounded-2xl bg-white px-5 py-2">
          {groups.map((group) => {
            const isOpen = !!openSemesters.open[group.semester];
            const panelId = `matkul-semester-${group.semester}`;

            return (
              <section
                key={group.semester}
                className="border-t border-[#F1F1F2] first:border-t-0"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleSemester(group.semester)}
                  className="flex w-full flex-row items-center justify-between py-3"
                >
                  <span className="font-bold text-[#1D1D1D]">
                    Semester {group.semester}
                  </span>
                  <span className="flex flex-row items-center space-x-2 text-sm font-semibold text-[#5E6278]">
                    <span>{group.subjects.length} mata kuliah</span>
                    <Image
                      src="/down.png"
                      alt=""
                      width={16}
                      height={16}
                      className={isOpen ? "" : "-rotate-90"}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    className="mb-3 flex flex-col rounded-2xl border-2 border-[#F1F1F2] px-4"
                  >
                    {group.subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex flex-col border-t border-[#F1F1F2] py-3 first:border-t-0"
                      >
                        <div className="flex flex-row flex-wrap items-baseline gap-x-3">
                          <p className="break-words font-bold text-[#1D1D1D]">
                            {subject.subject_name}
                          </p>
                          <p className="text-sm font-semibold text-[#5E6278]">
                            {subject.subject_code}
                          </p>
                        </div>
                        <p className="break-words text-sm text-[#1D1D1D]/70">
                          Dosen pengampu: {subject.lecturer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
