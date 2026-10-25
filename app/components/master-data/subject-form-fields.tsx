"use client";

import LecturerListBox from "@/app/components/master-data/lecturer-listbox";
import SemestersListBox from "@/app/components/semesters-listbox";

export type SubjectForm = {
  subjectCode: string;
  subjectName: string;
  semester: string;
  lecturerId: string;
};

export const emptySubjectForm: SubjectForm = {
  subjectCode: "",
  subjectName: "",
  semester: "",
  lecturerId: "",
};

const tidy = (value: string) => value.trim().replace(/\s+/g, " ");

export const tidySubjectForm = (form: SubjectForm): SubjectForm => ({
  subjectCode: tidy(form.subjectCode),
  subjectName: tidy(form.subjectName),
  semester: form.semester,
  lecturerId: form.lecturerId,
});

export const validateSubjectForm = (form: SubjectForm) => {
  const body = tidySubjectForm(form);

  if (!body.subjectCode) return "Kode mata kuliah wajib diisi.";
  if (!/^\d{9}$/.test(body.subjectCode))
    return "Kode mata kuliah harus 9 angka.";
  if (!body.subjectName) return "Nama mata kuliah wajib diisi.";
  if (!body.semester) return "Pilih semester.";
  if (!body.lecturerId) return "Pilih dosen pengampu.";
  return null;
};

const inputClassName =
  "h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60";

interface SubjectFormFieldsProps {
  form: SubjectForm;
  onChange: (key: keyof SubjectForm, value: string) => void;
}

export default function SubjectFormFields({
  form,
  onChange,
}: SubjectFormFieldsProps) {
  return (
    <div className="flex w-full flex-col space-y-5">
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
            inputMode="numeric"
            autoComplete="off"
            placeholder="9 angka"
            value={form.subjectCode}
            onChange={(event) =>
              onChange(
                "subjectCode",
                event.target.value.replace(/\D/g, "").slice(0, 9),
              )
            }
          />
        </div>
        <SemestersListBox
          value={form.semester}
          onSemesterChange={(value) => onChange("semester", value)}
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
          value={form.subjectName}
          onChange={(event) => onChange("subjectName", event.target.value)}
        />
      </div>
      <LecturerListBox
        value={form.lecturerId}
        onLecturerChange={(value) => onChange("lecturerId", value)}
      />
    </div>
  );
}
