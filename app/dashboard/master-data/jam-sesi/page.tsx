"use client";

import { FormEvent, useEffect, useState } from "react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import useSessionStore from "@/app/store/useSessionStore";
import useAuthStore from "@/app/store/useAuthStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import {
  ISessionResponseBody,
  SessionDayGroup,
} from "@/app/interfaces/session/session.interface";
import { DAY_GROUP_LABELS } from "@/app/utils/day";

const DAY_GROUPS: SessionDayGroup[] = ["WEEKDAY", "FRIDAY"];

const inputClassName =
  "h-[44px] w-full rounded-xl bg-[#f5f5f5] px-3 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]";

const buttonClassName =
  "rounded-full px-[14px] py-[6px] text-sm font-semibold disabled:opacity-60";

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(".").map(Number);
  return hours * 60 + minutes;
};

const cleanTime = (value: string) => value.replace(/[^\d.]/g, "").slice(0, 5);

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

function SessionRow({
  session,
  onFeedback,
}: {
  session: ISessionResponseBody;
  onFeedback: (feedback: Feedback) => void;
}) {
  const { updateSession, removeSession } = useSessionStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const label = `Sesi ${session.number} ${DAY_GROUP_LABELS[session.day_group]}`;

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

    const problem =
      checkNumber(draft.number) ?? checkTimes(draft.startAt, draft.endAt);

    if (problem) {
      onFeedback({ ok: false, message: problem });
      return;
    }

    const result = await run(() =>
      updateSession(session.id, {
        number: Number(draft.number),
        startAt: draft.startAt,
        endAt: draft.endAt,
      }),
    );

    if (result?.ok) setIsEditing(false);
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
            onChange={(event) =>
              setDraft({
                ...draft,
                number: event.target.value.replace(/\D/g, "").slice(0, 2),
              })
            }
          />
          <input
            aria-label={`Jam mulai ${label}`}
            className={inputClassName}
            placeholder="07.00"
            value={draft.startAt}
            onChange={(event) =>
              setDraft({ ...draft, startAt: cleanTime(event.target.value) })
            }
          />
          <input
            aria-label={`Jam selesai ${label}`}
            className={inputClassName}
            placeholder="08.40"
            value={draft.endAt}
            onChange={(event) =>
              setDraft({ ...draft, endAt: cleanTime(event.target.value) })
            }
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
              onClick={() => setIsEditing(false)}
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
      </form>
    );
  }

  return (
    <div className="grid grid-cols-[90px_1fr_110px_110px_340px] items-center gap-3 border-t border-[#F1F1F2] py-3 text-sm font-semibold text-[#5E6278]">
      <p className="text-base font-bold text-[#1D1D1D]">
        Sesi {session.number}
      </p>
      <p className="text-base text-[#1D1D1D]">
        {session.startAt} – {session.endAt}
      </p>
      <p>
        <span
          className={`rounded-md px-2 py-1 text-xs ${session.is_active ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#F1F1F2] text-[#181C32]"}`}
        >
          {session.is_active ? "Aktif" : "Nonaktif"}
        </span>
      </p>
      <p>{session.classes} kelas</p>
      <div className="flex flex-row justify-end space-x-2">
        {isConfirmingDelete ? (
          <>
            <span className="self-center text-xs">Hapus {label}?</span>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => run(() => removeSession(session.id))}
              className={`${buttonClassName} bg-[#FFD9D9] text-[#FE2F60]`}
            >
              Ya, hapus
            </button>
            <button
              type="button"
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
              onClick={startEditing}
              className={`${buttonClassName} bg-[#D2E3F1] text-[#3272CA]`}
            >
              Ubah
            </button>
            <button
              type="button"
              aria-label={`${session.is_active ? "Nonaktifkan" : "Aktifkan"} ${label}`}
              disabled={isBusy}
              onClick={() =>
                run(() =>
                  updateSession(session.id, { is_active: !session.is_active }),
                )
              }
              className={`${buttonClassName} bg-[#F1F1F2] text-[#5E6278]`}
            >
              {session.is_active ? "Nonaktifkan" : "Aktifkan"}
            </button>
            {session.classes === 0 && (
              <button
                type="button"
                aria-label={`Hapus ${label}`}
                onClick={() => {
                  setIsConfirmingDelete(true);
                  onFeedback(null);
                }}
                className={`${buttonClassName} bg-[#FFD9D9] text-[#FE2F60]`}
              >
                Hapus
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DayGroupCard({ dayGroup }: { dayGroup: SessionDayGroup }) {
  const { sessionsData, addSession } = useSessionStore();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);
  const sessions = sessionsData.filter(
    (session) => session.day_group === dayGroup,
  );
  const groupLabel = DAY_GROUP_LABELS[dayGroup];

  const add = async (event: FormEvent) => {
    event.preventDefault();

    const problem =
      checkNumber(draft.number) ?? checkTimes(draft.startAt, draft.endAt);

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    setFeedback(null);
    const result = await addSession({
      day_group: dayGroup,
      number: Number(draft.number),
      startAt: draft.startAt,
      endAt: draft.endAt,
    });
    setIsSaving(false);
    setFeedback(result);

    if (result.ok) setDraft(emptyDraft);
  };

  return (
    <section
      aria-label={`Jam sesi ${groupLabel}`}
      className="flex w-full flex-col space-y-3 rounded-2xl bg-white p-5"
    >
      <p className="text-xl font-bold text-[#1D1D1D]">{groupLabel}</p>
      {sessions.length === 0 && (
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
            onFeedback={setFeedback}
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
          <input
            aria-label={`Jam mulai sesi baru ${groupLabel}`}
            className={inputClassName}
            placeholder="07.00"
            value={draft.startAt}
            onChange={(event) =>
              setDraft({ ...draft, startAt: cleanTime(event.target.value) })
            }
          />
        </label>
        <label className="flex flex-col space-y-1 text-xs font-semibold text-[#5E6278]">
          <span>Jam selesai</span>
          <input
            aria-label={`Jam selesai sesi baru ${groupLabel}`}
            className={inputClassName}
            placeholder="08.40"
            value={draft.endAt}
            onChange={(event) =>
              setDraft({ ...draft, endAt: cleanTime(event.target.value) })
            }
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
      <FeedbackBox feedback={feedback} />
    </section>
  );
}

export default function JamSesi() {
  const { getSessions, refreshSessions, error } = useSessionStore();
  const { userData } = useAuthStore();

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "session", "class"].includes(type)) refreshSessions();
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
          Jam kelas mengikuti sesinya. Mengubah jam sesi ikut mengubah jam semua
          kelas di sesi itu. Sesi yang sudah dipakai kelas tidak bisa dihapus,
          hanya dinonaktifkan agar tidak muncul di pilihan kelas baru.
        </p>
      </div>
      {error && <FeedbackBox feedback={{ ok: false, message: error }} />}
      {DAY_GROUPS.map((dayGroup) => (
        <DayGroupCard key={dayGroup} dayGroup={dayGroup} />
      ))}
    </div>
  );
}
