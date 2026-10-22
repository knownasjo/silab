"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import useSessionStore from "@/app/store/useSessionStore";
import useClassStore from "@/app/store/useClassStore";
import useAuthStore from "@/app/store/useAuthStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import {
  ISessionResponseBody,
  SessionDayGroup,
} from "@/app/interfaces/session/session.interface";
import { IGetClassResponseBody } from "@/app/interfaces/class/class.interface";
import { DAY_GROUP_LABELS, DAY_LABELS, formatDay } from "@/app/utils/day";

const DAY_GROUPS: SessionDayGroup[] = ["WEEKDAY", "FRIDAY"];

const inputClassName =
  "h-[44px] w-full rounded-xl bg-[#f5f5f5] px-3 font-semibold text-[#1D1D1D] focus:outline-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60";

const buttonClassName =
  "rounded-full px-[14px] py-[6px] text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60";

const ROW_GRID =
  "grid grid-cols-[90px_130px_96px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 xl:grid-cols-[90px_130px_96px_minmax(0,1fr)_320px]";

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(".").map(Number);
  return hours * 60 + minutes;
};

const typedTime = (value: string) =>
  value
    .replace(/:/g, ".")
    .replace(/[^\d.]/g, "")
    .slice(0, 5);

const tidyTime = (value: string) => {
  const text = value.trim();
  const parts =
    /^(\d{1,2})\.(\d{2})$/.exec(text) ??
    /^(\d{1,2})(\d{2})$/.exec(text) ??
    /^(\d{1,2})$/.exec(text);

  if (!parts) return text;

  const hours = Number(parts[1]);
  const minutes = Number(parts[2] ?? "0");

  if (hours > 23 || minutes > 59) return text;

  return `${String(hours).padStart(2, "0")}.${String(minutes).padStart(2, "0")}`;
};

const checkTimes = (startAt: string, endAt: string) => {
  const format = /^([01]\d|2[0-3])\.[0-5]\d$/;

  if (!format.test(startAt) || !format.test(endAt))
    return "Jam harus berformat JJ.MM, misalnya 07.00.";
  if (toMinutes(startAt) >= toMinutes(endAt))
    return "Jam mulai harus sebelum jam selesai.";
  return null;
};

const checkNumber = (value: string) => {
  const number = Number(value);

  return Number.isInteger(number) && number >= 1 && number <= 20
    ? null
    : "Nomor sesi harus angka 1 sampai 20.";
};

type Draft = { number: string; startAt: string; endAt: string };

const emptyDraft: Draft = { number: "", startAt: "", endAt: "" };

const tidyDraft = (draft: Draft): Draft => ({
  ...draft,
  startAt: tidyTime(draft.startAt),
  endAt: tidyTime(draft.endAt),
});

const checkDraft = (draft: Draft) =>
  checkNumber(draft.number) ?? checkTimes(draft.startAt, draft.endAt);

const DAY_ORDER = Object.keys(DAY_LABELS);

const byDayThenRoom = (a: IGetClassResponseBody, b: IGetClassResponseBody) =>
  DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) ||
  a.room.localeCompare(b.room) ||
  a.subject_name.localeCompare(b.subject_name);

function TimeInput({
  label,
  placeholder,
  value,
  disabled,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <input
      aria-label={label}
      className={inputClassName}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(typedTime(event.target.value))}
      onBlur={() => onChange(tidyTime(value))}
    />
  );
}

function SessionRow({
  session,
  classes,
  feedback,
  onFeedback,
  onDeleted,
}: {
  session: ISessionResponseBody;
  classes: IGetClassResponseBody[];
  feedback: Feedback;
  onFeedback: (feedback: Feedback) => void;
  onDeleted: (message: string) => void;
}) {
  const { updateSession, removeSession } = useSessionStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isShowingClasses, setIsShowingClasses] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const label = `Sesi ${session.number} ${DAY_GROUP_LABELS[session.day_group]}`;
  const listId = `kelas-sesi-${session.id}`;

  useEffect(() => {
    if (session.classes === 0) setIsShowingClasses(false);
  }, [session.classes]);

  const run = async (action: () => Promise<Feedback>) => {
    setIsBusy(true);
    onFeedback(null);
    const result = await action();
    setIsBusy(false);
    onFeedback(result);
    return result;
  };

  const startEditing = () => {
    setDraft({
      number: session.number.toString(),
      startAt: session.startAt,
      endAt: session.endAt,
    });
    setIsEditing(true);
    setIsConfirmingDelete(false);
    onFeedback(null);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();

    const tidy = tidyDraft(draft);
    setDraft(tidy);

    const problem = checkDraft(tidy);

    if (problem) {
      onFeedback({ ok: false, message: problem });
      return;
    }

    const result = await run(() =>
      updateSession(session.id, {
        number: Number(tidy.number),
        startAt: tidy.startAt,
        endAt: tidy.endAt,
      }),
    );

    if (result?.ok) setIsEditing(false);
  };

  const remove = async () => {
    setIsBusy(true);
    onFeedback(null);
    const result = await removeSession(session.id);
    setIsBusy(false);

    if (result.ok) onDeleted(result.message);
    else onFeedback(result);
  };

  if (isEditing) {
    return (
      <form
        noValidate
        onSubmit={save}
        className="flex flex-col space-y-2 border-t border-[#F1F1F2] py-3"
      >
        <div className="grid grid-cols-[90px_1fr_1fr_auto] items-center gap-3">
          <input
            aria-label={`Nomor ${label}`}
            className={inputClassName}
            inputMode="numeric"
            value={draft.number}
            disabled={isBusy}
            onChange={(event) =>
              setDraft({
                ...draft,
                number: event.target.value.replace(/\D/g, "").slice(0, 2),
              })
            }
          />
          <TimeInput
            label={`Jam mulai ${label}`}
            placeholder="07.00"
            value={draft.startAt}
            disabled={isBusy}
            onChange={(startAt) => setDraft((prev) => ({ ...prev, startAt }))}
          />
          <TimeInput
            label={`Jam selesai ${label}`}
            placeholder="08.40"
            value={draft.endAt}
            disabled={isBusy}
            onChange={(endAt) => setDraft((prev) => ({ ...prev, endAt }))}
          />
          <div className="flex flex-row space-x-2">
            <button
              type="submit"
              disabled={isBusy}
              className={`${buttonClassName} bg-[#D2E3F1] text-[#3272CA]`}
            >
              Simpan
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => {
                setIsEditing(false);
                onFeedback(null);
              }}
              className={`${buttonClassName} bg-[#F1F1F2] text-[#5E6278]`}
            >
              Batal
            </button>
          </div>
        </div>
        {session.classes > 0 && (
          <p className="text-xs font-semibold text-[#5E6278]">
            Jam {session.classes} kelas di sesi ini ikut berubah.
          </p>
        )}
        <FeedbackBox feedback={feedback} />
      </form>
    );
  }

  return (
    <div className="border-t border-[#F1F1F2]">
      <div className={`${ROW_GRID} py-3 text-sm font-semibold text-[#5E6278]`}>
        <p className="text-base font-bold text-[#1D1D1D]">
          Sesi {session.number}
        </p>
        <p className="whitespace-nowrap text-base text-[#1D1D1D]">
          {session.startAt} – {session.endAt}
        </p>
        <p>
          <span
            className={`rounded-md px-2 py-1 text-xs ${session.is_active ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#F1F1F2] text-[#181C32]"}`}
          >
            {session.is_active ? "Aktif" : "Nonaktif"}
          </span>
        </p>
        {session.classes > 0 ? (
          <button
            type="button"
            aria-expanded={isShowingClasses}
            aria-controls={listId}
            aria-label={`${isShowingClasses ? "Tutup" : "Lihat"} kelas ${label}`}
            onClick={() => setIsShowingClasses((prev) => !prev)}
            className="flex w-fit flex-row items-center space-x-1 text-[#3272CA] hover:opacity-70"
          >
            <span>{session.classes} kelas</span>
            <Image
              src="/down.png"
              alt=""
              width={16}
              height={16}
              className={isShowingClasses ? "" : "-rotate-90"}
            />
          </button>
        ) : (
          <p>0 kelas</p>
        )}
        <div className="col-span-3 col-start-2 flex flex-row items-center space-x-2 xl:col-span-1 xl:col-start-auto xl:justify-end">
          {isConfirmingDelete ? (
            <>
              <span className="text-xs">Hapus {label}?</span>
              <button
                type="button"
                disabled={isBusy}
                onClick={remove}
                className={`${buttonClassName} bg-[#FFD9D9] text-[#FE2F60]`}
              >
                Ya, hapus
              </button>
              <button
                type="button"
                disabled={isBusy}
                onClick={() => setIsConfirmingDelete(false)}
                className={`${buttonClassName} bg-[#F1F1F2] text-[#5E6278]`}
              >
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                aria-label={`Ubah ${label}`}
                disabled={isBusy}
                onClick={startEditing}
                className={`${buttonClassName} w-[64px] bg-[#D2E3F1] text-[#3272CA]`}
              >
                Ubah
              </button>
              <button
                type="button"
                aria-label={`${session.is_active ? "Nonaktifkan" : "Aktifkan"} ${label}`}
                disabled={isBusy}
                onClick={() =>
                  run(() =>
                    updateSession(session.id, {
                      is_active: !session.is_active,
                    }),
                  )
                }
                className={`${buttonClassName} w-[110px] bg-[#F1F1F2] text-[#5E6278]`}
              >
                {session.is_active ? "Nonaktifkan" : "Aktifkan"}
              </button>
              {session.classes === 0 ? (
                <button
                  type="button"
                  aria-label={`Hapus ${label}`}
                  disabled={isBusy}
                  onClick={() => {
                    setIsConfirmingDelete(true);
                    onFeedback(null);
                  }}
                  className={`${buttonClassName} w-[72px] bg-[#FFD9D9] text-[#FE2F60]`}
                >
                  Hapus
                </button>
              ) : (
                <span aria-hidden className="w-[72px] shrink-0" />
              )}
            </>
          )}
        </div>
      </div>
      {feedback && (
        <div className="pb-3">
          <FeedbackBox feedback={feedback} />
        </div>
      )}
      {isShowingClasses && session.classes > 0 && (
        <ul
          id={listId}
          className="list-disc space-y-1 pb-3 pl-[120px] text-sm font-semibold text-[#5E6278]"
        >
          {classes.length === 0 && <li className="list-none">Loading...</li>}
          {classes.map((subjectClass) => (
            <li key={subjectClass.id}>
              <Link
                href={`/dashboard/praktikum/${subjectClass.id}`}
                className="text-[#1D1D1D] hover:text-[#3272CA]"
              >
                {subjectClass.subject_name} — Kelas {subjectClass.name}
              </Link>{" "}
              · {formatDay(subjectClass.day)} · {subjectClass.room}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DayGroupCard({ dayGroup }: { dayGroup: SessionDayGroup }) {
  const { sessionsData, addSession, isLoaded, error } = useSessionStore();
  const { classesData } = useClassStore();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [placed, setPlaced] = useState<{ at: string; feedback: Feedback }>({
    at: "",
    feedback: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const sessions = sessionsData.filter(
    (session) => session.day_group === dayGroup,
  );
  const groupLabel = DAY_GROUP_LABELS[dayGroup];
  const feedbackAt = (at: string) =>
    placed.at === at ? placed.feedback : null;
  const place = (at: string) => (feedback: Feedback) =>
    setPlaced({ at, feedback });

  const add = async (event: FormEvent) => {
    event.preventDefault();

    const tidy = tidyDraft(draft);
    setDraft(tidy);

    const problem = checkDraft(tidy);

    if (problem) {
      place("add")({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    place("add")(null);
    const result = await addSession({
      day_group: dayGroup,
      number: Number(tidy.number),
      startAt: tidy.startAt,
      endAt: tidy.endAt,
    });
    setIsSaving(false);
    place("add")(result);

    if (result.ok) setDraft(emptyDraft);
  };

  return (
    <section
      aria-label={`Jam sesi ${groupLabel}`}
      className="flex w-full flex-col space-y-3 rounded-2xl bg-white p-5"
    >
      <p className="text-xl font-bold text-[#1D1D1D]">{groupLabel}</p>
      <FeedbackBox feedback={feedbackAt("top")} />
      {!isLoaded && !error && (
        <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
      )}
      {isLoaded && !error && sessions.length === 0 && (
        <p className="text-sm font-semibold text-[#5E6278]">
          Belum ada sesi. Kelas{" "}
          {dayGroup === "FRIDAY" ? "hari Jumat" : "Senin–Kamis"} belum bisa
          dibuat sebelum sesinya ditambahkan.
        </p>
      )}
      <div>
        {sessions.map((session) => (
          <SessionRow
            key={session.id}
            session={session}
            classes={classesData
              .filter((subjectClass) => subjectClass.sessionId === session.id)
              .sort(byDayThenRoom)}
            feedback={feedbackAt(session.id)}
            onFeedback={place(session.id)}
            onDeleted={(message) => place("top")({ ok: true, message })}
          />
        ))}
      </div>
      <form
        noValidate
        onSubmit={add}
        className="grid grid-cols-[90px_1fr_1fr_auto] items-end gap-3 border-t border-[#F1F1F2] pt-4"
      >
        <label className="flex flex-col space-y-1 text-xs font-semibold text-[#5E6278]">
          <span>Sesi ke-</span>
          <input
            aria-label={`Nomor sesi baru ${groupLabel}`}
            className={inputClassName}
            inputMode="numeric"
            placeholder="1"
            value={draft.number}
            disabled={isSaving}
            onChange={(event) =>
              setDraft({
                ...draft,
                number: event.target.value.replace(/\D/g, "").slice(0, 2),
              })
            }
          />
        </label>
        <label className="flex flex-col space-y-1 text-xs font-semibold text-[#5E6278]">
          <span>Jam mulai</span>
          <TimeInput
            label={`Jam mulai sesi baru ${groupLabel}`}
            placeholder="07.00"
            value={draft.startAt}
            disabled={isSaving}
            onChange={(startAt) => setDraft((prev) => ({ ...prev, startAt }))}
          />
        </label>
        <label className="flex flex-col space-y-1 text-xs font-semibold text-[#5E6278]">
          <span>Jam selesai</span>
          <TimeInput
            label={`Jam selesai sesi baru ${groupLabel}`}
            placeholder="08.40"
            value={draft.endAt}
            disabled={isSaving}
            onChange={(endAt) => setDraft((prev) => ({ ...prev, endAt }))}
          />
        </label>
        <button
          type="submit"
          disabled={isSaving}
          className="h-[44px] rounded-full bg-[#3272CA] px-[16px] text-sm font-semibold text-white disabled:opacity-60"
        >
          Tambah Sesi
        </button>
      </form>
      <FeedbackBox feedback={feedbackAt("add")} />
    </section>
  );
}

export default function JamSesi() {
  const { getSessions, refreshSessions, error } = useSessionStore();
  const { getAllClass, refreshAllClass } = useClassStore();
  const { userData } = useAuthStore();

  useEffect(() => {
    getSessions();
    getAllClass();
  }, [getSessions, getAllClass]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "session", "class", "period"].includes(type))
      refreshSessions();
    if (["ready", "class", "subject", "period"].includes(type))
      refreshAllClass();
  });

  if (userData && userData.role !== "LABORAN") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-base font-semibold text-[#5E6278]">
          Hanya laboran yang dapat mengatur jam sesi.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-6 overflow-auto overscroll-contain">
      <div className="flex flex-col">
        <p className="text-[32px] font-bold text-black">Jam Sesi</p>
        <p className="text-base font-semibold text-[#5E6278]">
          Jam sesi berlaku untuk semester yang sedang aktif; setiap semester
          baru mendapat salinannya sendiri. Jam kelas mengikuti sesinya.
          Mengubah jam sesi ikut mengubah jam semua kelas di sesi itu. Sesi yang
          sudah dipakai kelas tidak bisa dihapus, hanya dinonaktifkan agar tidak
          muncul di pilihan kelas baru.
        </p>
      </div>
      {error && <FeedbackBox feedback={{ ok: false, message: error }} />}
      {DAY_GROUPS.map((dayGroup) => (
        <DayGroupCard key={dayGroup} dayGroup={dayGroup} />
      ))}
    </div>
  );
}
