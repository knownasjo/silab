"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import SubjectFormFields, {
  SubjectForm,
  tidySubjectForm,
  validateSubjectForm,
} from "@/app/components/master-data/subject-form-fields";
import { IGetSubjectResponseBody } from "@/app/interfaces/subject/subject.interface";
import useSubjectStore from "@/app/store/useSubjectStore";

interface EditSubjectButtonProps {
  subject: IGetSubjectResponseBody;
  onSaved: (message: string) => void;
}

const formOf = (subject: IGetSubjectResponseBody): SubjectForm => ({
  subject_code: subject.subject_code,
  subject_name: subject.subject_name,
  semester: subject.semester,
  lecturer_id: subject.lecturer_id,
});

export default function EditSubjectButton({
  subject,
  onSaved,
}: EditSubjectButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<SubjectForm>(() => formOf(subject));
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { updateSubject } = useSubjectStore();

  const updateForm = (key: keyof SubjectForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFeedback(null);
  };

  const open = () => {
    setForm(formOf(subject));
    setFeedback(null);
    setIsOpen(true);
  };

  const close = () => {
    if (!isSaving) setIsOpen(false);
  };

  const initial = formOf(subject);
  const tidied = tidySubjectForm(form);
  const isUnchanged = (Object.keys(initial) as (keyof SubjectForm)[]).every(
    (key) => tidied[key] === initial[key],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const problem = validateSubjectForm(form);

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await updateSubject(subject.id, tidied);

    setIsSaving(false);

    if (!result.ok) {
      setFeedback(result);
      return;
    }

    setIsOpen(false);
    onSaved(result.message);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Ubah mata kuliah ${subject.subject_name}`}
        className="shrink-0 rounded-full bg-[#D2E3F1] px-[16px] py-[6px] text-sm font-semibold text-[#3272CA]"
      >
        Ubah
      </button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[90vh] w-[640px] max-w-[95vw] flex-col space-y-6 overflow-y-auto rounded-2xl bg-white p-10">
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Ubah Mata Kuliah
              </DialogTitle>
              <p className="text-sm font-semibold text-[#5E6278]">
                {subject.subject_name}
              </p>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5"
            >
              <SubjectFormFields form={form} onChange={updateForm} />
              {form.lecturer_id !== initial.lecturer_id && (
                <p className="text-sm font-semibold text-[#5E6278]">
                  Dosen baru langsung bisa melihat semua kelas, pertemuan, dan
                  presensi mata kuliah ini, termasuk yang sudah berjalan. Dosen
                  lama tidak bisa melihatnya lagi.
                </p>
              )}
              <FeedbackBox feedback={feedback} />
              <div className="flex w-full flex-row justify-end space-x-4">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUnchanged}
                  className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <span className="loading loading-dots loading-sm" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
