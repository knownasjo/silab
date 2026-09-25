"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import LecturerListBox from "@/app/components/master-data/lecturer-listbox";
import SemestersListBox from "@/app/components/semesters-listbox";
import { IGetSubjectResponseBody } from "@/app/interfaces/subject/subject.interface";
import useSubjectStore from "@/app/store/useSubjectStore";

interface EditSubjectButtonProps {
  subject: IGetSubjectResponseBody;
  onSaved: (message: string) => void;
}

type SubjectForm = {
  subject_code: string;
  subject_name: string;
  semester: string;
  lecturer_id: string;
};

const formOf = (subject: IGetSubjectResponseBody): SubjectForm => ({
  subject_code: subject.subject_code,
  subject_name: subject.subject_name,
  semester: subject.semester,
  lecturer_id: subject.lecturer_id,
});

const tidy = (value: string) => value.trim().replace(/\s+/g, " ");

const inputClassName =
  "h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]";

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
  const isUnchanged =
    tidy(form.subject_code) === initial.subject_code &&
    tidy(form.subject_name) === initial.subject_name &&
    form.semester === initial.semester &&
    form.lecturer_id === initial.lecturer_id;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const body = {
      subject_code: tidy(form.subject_code),
      subject_name: tidy(form.subject_name),
      semester: form.semester,
      lecturer_id: form.lecturer_id,
    };

    const problem = !body.subject_code
      ? "Kode mata kuliah wajib diisi."
      : !body.subject_name
        ? "Nama mata kuliah wajib diisi."
        : !body.semester
          ? "Pilih semester."
          : !body.lecturer_id
            ? "Pilih dosen pengampu."
            : null;

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await updateSubject(subject.id, body);

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
              <div className="flex flex-row space-x-4">
                <div className="flex w-2/3 flex-col space-y-3">
                  <label
                    htmlFor="subject-code"
                    className="text-base font-semibold text-[#5E6278]"
                  >
                    Kode Mata Kuliah
                  </label>
                  <input
                    id="subject-code"
                    className={inputClassName}
                    type="text"
                    autoComplete="off"
                    maxLength={20}
                    value={form.subject_code}
                    onChange={(event) =>
                      updateForm("subject_code", event.target.value)
                    }
                  />
                </div>
                <SemestersListBox
                  value={form.semester}
                  onSemesterChange={(value) => updateForm("semester", value)}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="subject-name"
                  className="text-base font-semibold text-[#5E6278]"
                >
                  Nama Mata Kuliah
                </label>
                <input
                  id="subject-name"
                  className={inputClassName}
                  type="text"
                  autoComplete="off"
                  maxLength={100}
                  value={form.subject_name}
                  onChange={(event) =>
                    updateForm("subject_name", event.target.value)
                  }
                />
              </div>
              <LecturerListBox
                value={form.lecturer_id}
                onLecturerChange={(value) => updateForm("lecturer_id", value)}
              />
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
