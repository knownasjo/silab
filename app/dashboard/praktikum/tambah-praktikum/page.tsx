"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import SubjectDropdownMenu from "@/app/components/praktikum/subject-dropdown-menu";
import ClassNameField from "@/app/components/praktikum/class-name-field";
import ClassQuotaField from "@/app/components/praktikum/class-quota-field";
import ClassDayDropdown from "@/app/components/praktikum/class-day-dropdown";
import ClassRoomDropdown from "@/app/components/praktikum/class-room-dropdown";
import ClassSessionListbox from "@/app/components/praktikum/class-sessions-listbox";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import ClassesPreview from "./components/classes-preview";
import { SubjectBySemester } from "@/app/types/subject-by-semester";
import useClassStore from "@/app/store/useClassStore";
import useSessionStore from "@/app/store/useSessionStore";
import useAuthStore from "@/app/store/useAuthStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import { dayGroupOf } from "@/app/utils/day";

type ClassForm = {
  name: string;
  quota: string;
  day: string;
  room: string;
  sessionId: string;
};

const emptyForm: ClassForm = {
  name: "",
  quota: "",
  day: "",
  room: "",
  sessionId: "",
};

const validate = (form: ClassForm) => {
  const quota = Number(form.quota);

  if (!/^[A-Z]$/.test(form.name)) return "Nama kelas harus satu huruf A–Z.";
  if (!Number.isInteger(quota) || quota < 1 || quota > 99)
    return "Kuota harus angka 1 sampai 99.";
  if (!form.day) return "Pilih hari kelas.";
  if (!form.room) return "Pilih ruangan kelas.";
  if (!form.sessionId) return "Pilih sesi kelas.";
  return null;
};

export default function TambahPraktikum() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectBySemester>();
  const [form, setForm] = useState<ClassForm>(emptyForm);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { getAllClass, refreshAllClass, classesData, addClass } =
    useClassStore();
  const { sessionsData, getSessions, refreshSessions } = useSessionStore();
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

  const daySessions = useMemo(
    () =>
      form.day
        ? sessionsData.filter(
            (session) =>
              session.is_active && session.day_group === dayGroupOf(form.day),
          )
        : [],
    [sessionsData, form.day],
  );

  useEffect(() => {
    if (
      form.sessionId &&
      !daySessions.some((session) => session.id === form.sessionId)
    )
      setForm((prev) => ({ ...prev, sessionId: "" }));
  }, [daySessions, form.sessionId]);

  const updateForm = (key: keyof ClassForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFeedback(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedSubject) return;

    const problem = validate(form);

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

    if (result.ok) setForm(emptyForm);
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

  const noSessionForDay = !!form.day && daySessions.length === 0;
  const sessionPlaceholder = !form.day
    ? "Pilih hari dulu"
    : noSessionForDay
      ? "Belum ada sesi"
      : "Sesi Kelas";

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
        <div className="mt-5 flex h-[90px] w-full flex-row space-x-8">
          <ClassNameField
            value={form.name}
            onClassNameChange={(value) => updateForm("name", value)}
          />
          <ClassQuotaField
            value={form.quota}
            onClassQuotaChange={(value) => updateForm("quota", value)}
          />
          <ClassDayDropdown
            value={form.day}
            onDayChange={(value) => updateForm("day", value)}
          />
          <ClassRoomDropdown
            value={form.room}
            onRoomChange={(value) => updateForm("room", value)}
          />
          <ClassSessionListbox
            sessions={daySessions}
            value={form.sessionId}
            placeholder={sessionPlaceholder}
            disabled={daySessions.length === 0}
            onClassSessionChange={(value) => updateForm("sessionId", value)}
          />
        </div>
        {noSessionForDay && (
          <p className="text-sm font-semibold text-[#F1416C]">
            Jam sesi{" "}
            {dayGroupOf(form.day) === "FRIDAY" ? "hari Jumat" : "Senin–Kamis"}{" "}
            belum diatur. Atur di{" "}
            <Link href="/dashboard/master-data/jam-sesi" className="underline">
              Master Data → Jam Sesi
            </Link>
            .
          </p>
        )}
        <FeedbackBox feedback={feedback} />
        <div className="flex w-full flex-row justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
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
