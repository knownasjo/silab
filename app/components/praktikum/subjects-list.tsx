"use client";

import Image from "next/image";
import SubjectClassesCard from "../subject-classes";
import EditSubjectButton from "./edit-subject-button";
import FeedbackBox, { Feedback } from "../feedback-box";
import useSubjectStore from "@/app/store/useSubjectStore";
import useAuthStore from "@/app/store/useAuthStore";
import useClassStore from "@/app/store/useClassStore";
import { usePeriodView } from "@/app/store/usePeriodStore";
import { IGetSubjectResponseBody } from "@/app/interfaces/subject/subject.interface";
import { useEffect, useState } from "react";

interface SubjectsListProps {
  emptyMessage?: string;
}

type OpenState = Record<string, boolean>;

const OPEN_STATE_KEY = "praktikum-terbuka";

const readOpenState = (key: "semesters" | "subjects"): OpenState => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(OPEN_STATE_KEY) ?? "{}");

    return saved?.[key] ?? {};
  } catch {
    return {};
  }
};

const groupBySemester = (subjects: IGetSubjectResponseBody[]) => {
  const groups = new Map<string, IGetSubjectResponseBody[]>();

  for (const subject of subjects) {
    groups.set(subject.semester, [
      ...(groups.get(subject.semester) ?? []),
      subject,
    ]);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([semester, subjects]) => ({
      semester,
      subjects: [...subjects].sort(
        (a, b) =>
          a.subjectName.localeCompare(b.subjectName) ||
          a.subjectCode.localeCompare(b.subjectCode),
      ),
    }));
};

const SubjectsList: React.FC<SubjectsListProps> = ({ emptyMessage }) => {
  const { subjectsData, getAllSubjects, error } = useSubjectStore();
  const { userData } = useAuthStore();
  const {
    classesData,
    isLoading: isLoadingClasses,
    loadError,
  } = useClassStore();
  const { isArchive } = usePeriodView();
  const [isReady, setIsReady] = useState(false);
  const [notice, setNotice] = useState<{
    subjectId: string;
    message: string;
  } | null>(null);
  const [deletedNotice, setDeletedNotice] = useState<string | null>(null);
  const [openSemesters, setOpenSemesters] = useState<OpenState>(() =>
    readOpenState("semesters"),
  );
  const [openSubjects, setOpenSubjects] = useState<OpenState>(() =>
    readOpenState("subjects"),
  );
  const canEdit = userData?.role === "LABORAN" && !isArchive;
  const shownSubjects = isArchive
    ? subjectsData.filter((subject) =>
        classesData.some((item) => item.subjectId === subject.id),
      )
    : subjectsData;
  const semesters = groupBySemester(shownSubjects);
  const onlySemester = semesters.length === 1 ? semesters[0].semester : null;
  const problem = error ?? loadError;
  const feedback: Feedback = problem
    ? { ok: false, message: problem }
    : deletedNotice
      ? { ok: true, message: deletedNotice }
      : null;

  useEffect(() => {
    getAllSubjects().finally(() => setIsReady(true));
  }, [getAllSubjects]);

  useEffect(() => {
    if (onlySemester === null) return;

    setOpenSemesters((prev) =>
      onlySemester in prev ? prev : { ...prev, [onlySemester]: true },
    );
  }, [onlySemester]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        OPEN_STATE_KEY,
        JSON.stringify({ semesters: openSemesters, subjects: openSubjects }),
      );
    } catch {}
  }, [openSemesters, openSubjects]);

  const toggleSemester = (semester: string) =>
    setOpenSemesters((prev) => ({ ...prev, [semester]: !prev[semester] }));

  const toggleSubject = (subjectId: string) =>
    setOpenSubjects((prev) => ({ ...prev, [subjectId]: !prev[subjectId] }));

  return (
    <div className="flex h-full w-full flex-col items-start space-y-4">
      <FeedbackBox feedback={feedback} />
      {!isReady && subjectsData.length === 0 && (
        <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
      )}
      {emptyMessage && isReady && !error && subjectsData.length === 0 && (
        <p className="text-sm font-semibold text-[#5E6278]">{emptyMessage}</p>
      )}
      {isArchive &&
        isReady &&
        !isLoadingClasses &&
        !loadError &&
        subjectsData.length > 0 &&
        shownSubjects.length === 0 && (
          <p className="text-sm font-semibold text-[#5E6278]">
            Tidak ada kelas praktikum di periode ini.
          </p>
        )}
      {semesters.map(({ semester, subjects }) => {
        const isOpen = !!openSemesters[semester];
        const panelId = `semester-${semester}`;

        return (
          <section key={semester} className="w-full rounded-2xl bg-white p-4">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleSemester(semester)}
              className="flex w-full flex-row items-center justify-between"
            >
              <span className="text-xl font-bold text-[#1d1d1d]">
                Semester {semester}
              </span>
              <span className="flex flex-row items-center space-x-2 text-sm font-semibold text-[#5E6278]">
                <span>{subjects.length} mata kuliah</span>
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
              <div id={panelId} className="mt-4 flex flex-col space-y-4">
                {subjects.map((subject) => {
                  const isSubjectOpen = !!openSubjects[subject.id];
                  const subjectPanelId = `subject-${subject.id}`;

                  return (
                    <div
                      key={subject.id}
                      className={`w-full rounded-2xl border-2 border-[#F1F1F2] p-4`}
                    >
                      <div className="flex w-full flex-row items-start justify-between space-x-4">
                        <button
                          type="button"
                          aria-expanded={isSubjectOpen}
                          aria-controls={subjectPanelId}
                          onClick={() => toggleSubject(subject.id)}
                          className={`flex h-fit w-full flex-row flex-wrap items-baseline gap-x-3 text-left`}
                        >
                          <p className="text-lg font-bold text-[#1d1d1d]">
                            {subject.subjectName}
                          </p>
                          <p className="text-sm font-semibold text-[#5E6278]">
                            {subject.subjectCode}
                          </p>
                        </button>
                        {canEdit && (
                          <EditSubjectButton
                            subject={subject}
                            onSaved={(message, savedSemester) => {
                              setDeletedNotice(null);
                              setNotice({ subjectId: subject.id, message });
                              setOpenSemesters((prev) => ({
                                ...prev,
                                [savedSemester]: true,
                              }));
                            }}
                            onDeleted={(message) => {
                              setNotice(null);
                              setDeletedNotice(message);
                            }}
                          />
                        )}
                      </div>
                      {notice?.subjectId === subject.id && (
                        <div className="mt-3">
                          <FeedbackBox
                            feedback={{ ok: true, message: notice.message }}
                          />
                        </div>
                      )}
                      {isSubjectOpen && (
                        <div id={subjectPanelId} className="w-full">
                          <p className="text-base text-[#1d1d1d]/70">
                            Dosen pengampu: {subject.lecturer}
                          </p>
                          <SubjectClassesCard subjectId={subject.id} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default SubjectsList;
