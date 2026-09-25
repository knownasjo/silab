"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import SubjectDisclosureDetails from "../subject-disclosure-details";
import SubjectClassesCard from "../subject-classes";
import useSubjectStore from "@/app/store/useSubjectStore";
import { useEffect, useState } from "react";

interface SubjectsListProps {
  emptyMessage?: string;
}

const SubjectsList: React.FC<SubjectsListProps> = ({ emptyMessage }) => {
  const { subjectsData, getAllSubjects } = useSubjectStore();
  const [isReady, setIsReady] = useState(false);

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
            <DisclosureButton
              className={`flex h-fit w-full flex-row items-start`}
            >
              <p className="text-xl font-bold text-[#1d1d1d]">
                {subject.subject_name}
              </p>
            </DisclosureButton>
            <DisclosurePanel className={`w-full bg-white`}>
              <SubjectDisclosureDetails subjectId={subject.id} />
              <SubjectClassesCard subject_name={subject.subject_name} />
            </DisclosurePanel>
          </Disclosure>
        ))}
    </div>
  );
};

export default SubjectsList;
