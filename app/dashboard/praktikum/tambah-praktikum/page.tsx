"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SubjectDropdownMenu from "@/app/components/praktikum/subject-dropdown-menu";
import ClassFormFields, {
  ClassForm,
  emptyClassForm,
  validateClassForm,
} from "@/app/components/praktikum/class-form-fields";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import NoPeriodNotice from "@/app/components/period/no-period-notice";
import ClassesPreview from "./components/classes-preview";
import useClassStore from "@/app/store/useClassStore";
import useSessionStore from "@/app/store/useSessionStore";
import useSubjectStore from "@/app/store/useSubjectStore";
import useAuthStore from "@/app/store/useAuthStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import usePeriodStore, { usePeriodView } from "@/app/store/usePeriodStore";

export default function TambahPraktikum() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [form, setForm] = useState<ClassForm>(emptyClassForm);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    getAllClass,
    refreshAllClass,
    classesData,
    addClass,
    isLoading: classesLoading,
    loadError,
  } = useClassStore();
  const {
    sessionsData,
    isLoaded,
    getSessions,
    refreshSessions,
    error: sessionError,
  } = useSessionStore();
  const {
    subjectsData,
    isLoaded: subjectsLoaded,
    getAllSubjects,
    refreshAllSubjects,
    error: subjectError,
  } = useSubjectStore();
  const loadProblem = subjectError ?? loadError ?? sessionError;
  const { userData } = useAuthStore();
  const { getPeriods, refreshPeriods } = usePeriodStore();
  const { activePeriod } = usePeriodView();

  useEffect(() => {
    getAllSubjects();
    getAllClass();
    getSessions();
    getPeriods();
  }, [getAllSubjects, getAllClass, getSessions, getPeriods]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "subject"].includes(type)) refreshAllSubjects();
    if (["ready", "class", "subject", "period"].includes(type))
      refreshAllClass();
    if (["ready", "session"].includes(type)) refreshSessions();
    if (["ready", "period"].includes(type)) refreshPeriods();
  });

  const selectedSubject = subjectsData.find(
    (subject) => subject.id === selectedSubjectId,
  );

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
    <div className="flex h-full w-full flex-col space-y-8 overflow-x-auto overflow-y-auto overscroll-contain">
      <div className="flex w-full flex-row items-start justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-[32px] font-bold text-black">Tambah Praktikum</p>
          {activePeriod && (
            <p className="text-base font-semibold text-[#5E6278]">
              Kelas baru masuk periode {activePeriod.name}.
            </p>
          )}
        </div>
        <Link
          href="/dashboard/praktikum"
          className="h-fit shrink-0 content-center rounded-full bg-white p-3 text-sm font-semibold text-[#3272CA]"
        >
          Kembali
        </Link>
      </div>
      <NoPeriodNotice />
      {loadProblem && (
        <FeedbackBox feedback={{ ok: false, message: loadProblem }} />
      )}
      <div className="flex w-full flex-col space-y-3">
        <p className="text-base font-semibold text-[#5E6278]">Mata Kuliah</p>
        <SubjectDropdownMenu
          subjects={subjectsData}
          value={selectedSubject?.id ?? ""}
          placeholder={
            subjectsLoaded || subjectError ? "Pilih mata kuliah" : "Loading..."
          }
          isDisabled={isSaving || subjectsData.length === 0}
          onSubjectChange={(value) => {
            setSelectedSubjectId(value);
            setFeedback(null);
          }}
        />
        {subjectsLoaded && subjectsData.length === 0 && (
          <p className="text-sm font-semibold text-[#5E6278]">
            Belum ada mata kuliah. Tambah dulu di{" "}
            <Link
              href="/dashboard/master-data/add-subject"
              className="text-[#3272CA] underline"
            >
              Master Data → Tambah Mata Kuliah
            </Link>
            .
          </p>
        )}
      </div>
      {selectedSubject && (
        <div className="flex w-full flex-col space-y-4">
          <p className="text-lg font-bold text-[#1D1D1D]">
            Kelas yang sudah ada
            {subjectClasses.length > 0 && ` (${subjectClasses.length})`}
          </p>
          {subjectClasses.length > 0 ? (
            <ClassesPreview subjectClasses={subjectClasses} />
          ) : (
            !loadError && (
              <p className="text-sm font-semibold text-[#5E6278]">
                {classesLoading
                  ? "Loading..."
                  : "Belum ada kelas untuk mata kuliah ini."}
              </p>
            )
          )}
        </div>
      )}
      {selectedSubject && (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex w-full flex-col space-y-6 rounded-[20px] bg-[#FFFFFF] p-5"
        >
          <fieldset disabled={isSaving} className="min-w-0">
            <ClassFormFields
              form={form}
              sessions={sessionsData}
              sessionsLoaded={isLoaded}
              onChange={updateForm}
            />
          </fieldset>
          <FeedbackBox feedback={feedback} />
          <div className="flex w-full flex-row justify-end space-x-4">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                setForm(emptyClassForm);
                setFeedback(null);
              }}
              className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60] disabled:cursor-not-allowed disabled:opacity-60"
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
      )}
    </div>
  );
}
