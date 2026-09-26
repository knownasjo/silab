"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import SubjectClassesCard from "../subject-classes";
import EditSubjectButton from "./edit-subject-button";
import FeedbackBox from "../feedback-box";
import useSubjectStore from "@/app/store/useSubjectStore";
import useAuthStore from "@/app/store/useAuthStore";
import { IGetSubjectResponseBody } from "@/app/interfaces/subject/subject.interface";
import { useEffect, useState } from "react";

interface SubjectsListProps {
  emptyMessage?: string;
}

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
    .map(([semester, subjects]) => ({ semester, subjects }));
};

const SubjectsList: React.FC<SubjectsListProps> = ({ emptyMessage }) => {
  const { subjectsData, getAllSubjects } = useSubjectStore();
  const { userData } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const [notice, setNotice] = useState<{
    subjectId: string;
    message: string;
  } | null>(null);
  const [openSemesters, setOpenSemesters] = useState<Record<string, boolean>>(
    {},
  );
  const canEdit = userData?.role === "LABORAN";
  const semesters = groupBySemester(subjectsData);
  const onlySemester = semesters.length === 1 ? semesters[0].semester : null;

  useEffect(() => {
    getAllSubjects().finally(() => setIsReady(true));
  }, [getAllSubjects]);

  useEffect(() => {
    if (onlySemester === null) return;

    setOpenSemesters((prev) =>
      onlySemester in prev ? prev : { ...prev, [onlySemester]: true },
    );
  }, [onlySemester]);

  const toggleSemester = (semester: string) =>
    setOpenSemesters((prev) => ({ ...prev, [semester]: !prev[semester] }));

  return (
    <div className="flex h-full w-full flex-col items-start space-y-4">
      {emptyMessage && isReady && subjectsData.length === 0 && (
        <p className="text-sm font-semibold text-[#5E6278]">{emptyMessage}</p>
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
                {subjects.map((subject) => (
                  <Disclosure
                    key={subject.id}
                    as={`div`}
                    className={`w-full rounded-2xl border-2 border-[#F1F1F2] p-4`}
                  >
                    <div className="flex w-full flex-row items-start justify-between space-x-4">
                      <DisclosureButton
                        className={`flex h-fit w-full flex-row flex-wrap items-baseline gap-x-3 text-left`}
                      >
                        <p className="text-lg font-bold text-[#1d1d1d]">
                          {subject.subject_name}
                        </p>
                        <p className="text-sm font-semibold text-[#5E6278]">
                          {subject.subject_code}
                        </p>
                      </DisclosureButton>
                      {canEdit && (
                        <EditSubjectButton
                          subject={subject}
                          onSaved={(message, savedSemester) => {
                            setNotice({ subjectId: subject.id, message });
                            setOpenSemesters((prev) => ({
                              ...prev,
                              [savedSemester]: true,
                            }));
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
                    <DisclosurePanel className={`w-full`}>
                      <p className="text-base text-[#1d1d1d]/70">
                        Dosen pengampu: {subject.lecturer}
                      </p>
                      <SubjectClassesCard subjectId={subject.id} />
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default SubjectsList;
