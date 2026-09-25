"use client";

import { FormEvent, useState } from "react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import SubjectFormFields, {
  SubjectForm,
  emptySubjectForm,
  tidySubjectForm,
  validateSubjectForm,
} from "@/app/components/master-data/subject-form-fields";
import useSubjectStore from "@/app/store/useSubjectStore";
import useAuthStore from "@/app/store/useAuthStore";

export default function AddSubject() {
  const [form, setForm] = useState<SubjectForm>(emptySubjectForm);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { addSubject } = useSubjectStore();
  const { userData } = useAuthStore();

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
    <div className="h-full w-full">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex w-full flex-col space-y-6 rounded-2xl bg-white p-5"
      >
        <SubjectFormFields form={form} onChange={updateForm} />
        <FeedbackBox feedback={feedback} />
        <div className="flex w-full flex-row justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setForm(emptySubjectForm);
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
