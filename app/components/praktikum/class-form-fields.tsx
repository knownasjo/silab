"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import ClassNameField from "@/app/components/praktikum/class-name-field";
import ClassQuotaField from "@/app/components/praktikum/class-quota-field";
import ClassDayDropdown from "@/app/components/praktikum/class-day-dropdown";
import ClassRoomDropdown from "@/app/components/praktikum/class-room-dropdown";
import ClassSessionListbox from "@/app/components/praktikum/class-sessions-listbox";
import { ISessionResponseBody } from "@/app/interfaces/session/session.interface";
import { dayGroupOf } from "@/app/utils/day";

export type ClassForm = {
  name: string;
  quota: string;
  day: string;
  room: string;
  sessionId: string;
};

export const emptyClassForm: ClassForm = {
  name: "",
  quota: "",
  day: "",
  room: "",
  sessionId: "",
};

export const validateClassForm = (form: ClassForm) => {
  const quota = Number(form.quota);

  if (!/^[A-Z]$/.test(form.name)) return "Nama kelas harus satu huruf A–Z.";
  if (!Number.isInteger(quota) || quota < 1 || quota > 99)
    return "Kuota harus angka 1 sampai 99.";
  if (!form.day) return "Pilih hari kelas.";
  if (!form.room) return "Pilih ruangan kelas.";
  if (!form.sessionId) return "Pilih sesi kelas.";
  return null;
};

interface ClassFormFieldsProps {
  form: ClassForm;
  sessions: ISessionResponseBody[];
  sessionsLoaded: boolean;
  currentSessionId?: string | null;
  onChange: (key: keyof ClassForm, value: string) => void;
}

export default function ClassFormFields({
  form,
  sessions,
  sessionsLoaded,
  currentSessionId,
  onChange,
}: ClassFormFieldsProps) {
  const daySessions = useMemo(
    () =>
      form.day
        ? sessions.filter(
            (session) =>
              (session.is_active || session.id === currentSessionId) &&
              session.day_group === dayGroupOf(form.day),
          )
        : [],
    [sessions, form.day, currentSessionId],
  );

  useEffect(() => {
    if (
      sessionsLoaded &&
      form.sessionId &&
      !daySessions.some((session) => session.id === form.sessionId)
    )
      onChange("sessionId", "");
  }, [sessionsLoaded, daySessions, form.sessionId, onChange]);

  const noSessionForDay =
    !!form.day && sessionsLoaded && daySessions.length === 0;
  const sessionPlaceholder = !form.day
    ? "Pilih hari dulu"
    : noSessionForDay
      ? "Belum ada sesi"
      : "Sesi Kelas";

  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="flex h-[90px] w-full flex-row space-x-8">
        <ClassNameField
          value={form.name}
          onClassNameChange={(value) => onChange("name", value)}
        />
        <ClassQuotaField
          value={form.quota}
          onClassQuotaChange={(value) => onChange("quota", value)}
        />
        <ClassDayDropdown
          value={form.day}
          onDayChange={(value) => onChange("day", value)}
        />
        <ClassRoomDropdown
          value={form.room}
          onRoomChange={(value) => onChange("room", value)}
        />
        <ClassSessionListbox
          sessions={daySessions}
          value={form.sessionId}
          placeholder={sessionPlaceholder}
          disabled={daySessions.length === 0}
          onClassSessionChange={(value) => onChange("sessionId", value)}
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
    </div>
  );
}
