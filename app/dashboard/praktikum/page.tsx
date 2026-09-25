"use client";

import AddPracticumBanner from "@/app/components/praktikum/add-practicum-banner";
import ClassCard from "@/app/components/praktikum/class-card";
import SubjectsList from "@/app/components/praktikum/subjects-list";
import useAuthStore from "@/app/store/useAuthStore";
import useClassStore from "@/app/store/useClassStore";
import { useEffect, useState } from "react";
import FeedbackBox from "@/app/components/feedback-box";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import useSubjectStore from "@/app/store/useSubjectStore";

export default function Praktikum() {
  const { userData, me } = useAuthStore();
  const {
    classesData,
    getAllClass,
    refreshAllClass,
    isLoading,
    clearClassNotice,
  } = useClassStore();
  const [notice] = useState(() => useClassStore.getState().classNotice);
  const { refreshAllSubjects } = useSubjectStore();

  useEffect(() => {
    getAllClass();
    me();
  }, [getAllClass, me]);

  useEffect(() => {
    clearClassNotice();
  }, [clearClassNotice]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "class", "subject"].includes(type)) refreshAllClass();
    if (["ready", "subject"].includes(type)) refreshAllSubjects();
  });

  return (
    <div className="h-full w-full space-y-10 overflow-auto overscroll-contain">
      <FeedbackBox feedback={notice ? { ok: true, message: notice } : null} />
      <AddPracticumBanner />
      {userData?.role === "LABORAN" && <SubjectsList />}
      {userData?.role === "DOSEN" && (
        <SubjectsList emptyMessage="Anda belum tercatat sebagai dosen pengampu mata kuliah praktikum mana pun." />
      )}
      {userData?.role === "MAHASISWA" && classesData && (
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {classesData.map((subjectClass) => (
            <ClassCard subjectClass={subjectClass} key={subjectClass.id} />
          ))}
        </div>
      )}
      {userData?.role === "MAHASISWA" &&
        !isLoading &&
        classesData.length === 0 && (
          <p className="text-sm font-semibold text-[#5E6278]">
            Anda belum memegang kelas praktikum mana pun.
          </p>
        )}
    </div>
  );
}
