"use client";

import { FormEvent, useEffect, useState } from "react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import SubjectFormFields, {
  SubjectForm,
  emptySubjectForm,
  tidySubjectForm,
  validateSubjectForm,
} from "@/app/components/master-data/subject-form-fields";
import ExistingSubjects from "@/app/components/master-data/existing-subjects";
import useSubjectStore from "@/app/store/useSubjectStore";
import useAuthStore from "@/app/store/useAuthStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";

export default function AddSubject() {
  const [form, setForm] = useState<SubjectForm>(emptySubjectForm);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [listKey, setListKey] = useState(0);

  const {
    addSubject,
    getAllSubjects,
    refreshAllSubjects,
    subjectsData,
    isLoaded,
    error,
  } = useSubjectStore();
  const { userData } = useAuthStore();

  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "subject"].includes(type)) refreshAllSubjects();
  });

  const updateForm = (key: keyof SubjectForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFeedback(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const problem = validateSubjectForm(form);

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await addSubject(tidySubjectForm(form));

    setIsSaving(false);
    setFeedback(result);

    if (result.ok) setForm(emptySubjectForm);
  };

  if (userData && userData.role !== "LABORAN") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-base font-semibold text-[#5E6278]">
          Hanya laboran yang dapat menambah mata kuliah.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-8 overflow-y-auto overscroll-contain">
      <p className="text-[32px] font-bold text-black">Tambah Mata Kuliah</p>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex w-full flex-col space-y-6 rounded-2xl bg-white p-5"
      >
        <fieldset disabled={isSaving} className="min-w-0">
          <SubjectFormFields form={form} onChange={updateForm} />
        </fieldset>
        <FeedbackBox feedback={feedback} />
        <div className="flex w-full flex-row justify-end space-x-4">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => {
              setForm(emptySubjectForm);
              setFeedback(null);
              setListKey((key) => key + 1);
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
      <ExistingSubjects
        key={listKey}
        subjects={subjectsData}
        isLoaded={isLoaded}
        error={error}
        selectedSemester={form.semester}
      />
    </div>
  );
}
