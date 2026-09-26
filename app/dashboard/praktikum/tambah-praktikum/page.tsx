"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import SubjectDropdownMenu from "@/app/components/praktikum/subject-dropdown-menu";
import ClassFormFields, {
  ClassForm,
  emptyClassForm,
  validateClassForm,
} from "@/app/components/praktikum/class-form-fields";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import ClassesPreview from "./components/classes-preview";
import { SubjectBySemester } from "@/app/interfaces/subject/subject.interface";
import useClassStore from "@/app/store/useClassStore";
import useSessionStore from "@/app/store/useSessionStore";
import useAuthStore from "@/app/store/useAuthStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";

export default function TambahPraktikum() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectBySemester>();
  const [form, setForm] = useState<ClassForm>(emptyClassForm);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { getAllClass, refreshAllClass, classesData, addClass } =
    useClassStore();
  const { sessionsData, isLoaded, getSessions, refreshSessions } =
    useSessionStore();
  const { userData } = useAuthStore();

  useEffect(() => {
    getAllClass();
    getSessions();
  }, [getAllClass, getSessions]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "class", "subject"].includes(type)) refreshAllClass();
    if (["ready", "session"].includes(type)) refreshSessions();
  });

  const subjectClasses = useMemo(
    () =>
      classesData.filter(
        (subjectClass) => subjectClass.subjectId === selectedSubject?.id,
      ),
    [classesData, selectedSubject],
  );

  const updateForm = useCallback((key: keyof ClassForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFeedback(null);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedSubject) return;

    const problem = validateClassForm(form);

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await addClass({
      subjectId: selectedSubject.id,
      name: form.name,
      quota: Number(form.quota),
      day: form.day,
      room: form.room,
      sessionId: form.sessionId,
    });

    setIsSaving(false);
    setFeedback(result);

    if (result.ok) setForm(emptyClassForm);
  };

  if (userData && userData.role !== "LABORAN") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-base font-semibold text-[#5E6278]">
          Hanya laboran yang dapat menambah kelas praktikum.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-x-auto overflow-y-auto overscroll-contain">
      <div className="flex h-[82px] w-full flex-row space-x-4">
        <div className="flex h-full flex-col space-y-3">
          <p>Mata Kuliah</p>
          <SubjectDropdownMenu
            isDisabled={false}
            onSubjectChange={(value) => {
              setSelectedSubject(value);
              setFeedback(null);
            }}
          />
        </div>
      </div>
      {selectedSubject && subjectClasses.length === 0 && (
        <p className="mt-10 text-sm font-semibold text-[#5E6278]">
          Belum ada kelas untuk mata kuliah ini.
        </p>
      )}
      <ClassesPreview subjectClasses={subjectClasses} />
      <form
        noValidate
        onSubmit={handleSubmit}
        className={`mt-10 w-full flex-col space-y-6 rounded-[20px] bg-[#FFFFFF] p-5 ${selectedSubject !== undefined ? "flex" : "hidden"}`}
      >
        <div className="mt-5">
          <ClassFormFields
            form={form}
            sessions={sessionsData}
            sessionsLoaded={isLoaded}
            onChange={updateForm}
          />
        </div>
        <FeedbackBox feedback={feedback} />
        <div className="flex w-full flex-row justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setForm(emptyClassForm);
              setFeedback(null);
            }}
            className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60]"
          >
            Kosongkan
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:opacity-60"
          >
            {isSaving ? (
              <span className="loading loading-dots loading-sm" />
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
