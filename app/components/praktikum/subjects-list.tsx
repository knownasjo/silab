"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import SubjectClassesCard from "../subject-classes";
import EditSubjectButton from "./edit-subject-button";
import FeedbackBox from "../feedback-box";
import useSubjectStore from "@/app/store/useSubjectStore";
import useAuthStore from "@/app/store/useAuthStore";
import { useEffect, useState } from "react";

interface SubjectsListProps {
  emptyMessage?: string;
}

const SubjectsList: React.FC<SubjectsListProps> = ({ emptyMessage }) => {
  const { subjectsData, getAllSubjects } = useSubjectStore();
  const { userData } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const [notice, setNotice] = useState<{
    subjectId: string;
    message: string;
  } | null>(null);
  const canEdit = userData?.role === "LABORAN";

  useEffect(() => {
    getAllSubjects().finally(() => setIsReady(true));
  }, [getAllSubjects]);

  return (
    <div className="flex h-full w-full flex-col items-start space-y-4">
      {emptyMessage && isReady && subjectsData.length === 0 && (
        <p className="text-sm font-semibold text-[#5E6278]">{emptyMessage}</p>
      )}
      {subjectsData &&
        subjectsData.map((subject) => (
          <Disclosure
            key={subject.id}
            as={`div`}
            className={`w-full rounded-2xl bg-white p-4`}
          >
            <div className="flex w-full flex-row items-start justify-between space-x-4">
              <DisclosureButton
                className={`flex h-fit w-full flex-row items-start`}
              >
                <p className="text-xl font-bold text-[#1d1d1d]">
                  {subject.subject_name}
                </p>
              </DisclosureButton>
              {canEdit && (
                <EditSubjectButton
                  subject={subject}
                  onSaved={(message) =>
                    setNotice({ subjectId: subject.id, message })
                  }
                />
              )}
            </div>
            {notice?.subjectId === subject.id && (
              <div className="mt-3">
                <FeedbackBox feedback={{ ok: true, message: notice.message }} />
              </div>
            )}
            <DisclosurePanel className={`w-full bg-white`}>
              <p className="text-base text-[#1d1d1d]/70">
                Dosen pengampu: {subject.lecturer} · Kode {subject.subject_code}{" "}
                · Semester {subject.semester}
              </p>
              <SubjectClassesCard subjectId={subject.id} />
            </DisclosurePanel>
          </Disclosure>
        ))}
    </div>
  );
};

export default SubjectsList;
