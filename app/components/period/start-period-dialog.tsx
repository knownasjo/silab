"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import {
  AcademicTerm,
  IPeriodResponseBody,
} from "@/app/interfaces/period/period.interface";
import usePeriodStore, {
  nextPeriodName,
  TERM_LABELS,
} from "@/app/store/usePeriodStore";

const CONFIRM_WORD = "MULAI";
const TERMS: AcademicTerm[] = ["GANJIL", "GENAP"];

const inputClassName =
  "h-[44px] w-full rounded-xl bg-[#f5f5f5] px-3 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]";

const checkYear = (year: string) => {
  const years = /^(\d{4})\/(\d{4})$/.exec(year);

  return years && Number(years[2]) === Number(years[1]) + 1
    ? null
    : "Tahun ajaran harus seperti 2026/2027.";
};

interface StartPeriodDialogProps {
  activePeriod: IPeriodResponseBody | null;
  onStarted: (message: string) => void;
}

export default function StartPeriodDialog({
  activePeriod,
  onStarted,
}: StartPeriodDialogProps) {
  const { startPeriod } = usePeriodStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [confirmText, setConfirmText] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState<AcademicTerm>("GANJIL");

  const isFirst = !activePeriod;
  const targetName = activePeriod
    ? nextPeriodName(activePeriod)
    : `${year || "…"} ${TERM_LABELS[term]}`;
  const buttonLabel = isFirst
    ? "Mulai Periode Pertama"
    : `Mulai Semester ${targetName}`;

  const open = () => {
    setFeedback(null);
    setConfirmText("");
    setIsOpen(true);
  };

  const close = () => {
    if (!isBusy) setIsOpen(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const problem = isFirst ? checkYear(year) : null;

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsBusy(true);
    setFeedback(null);

    const result = await startPeriod(isFirst ? { year, term } : {});

    setIsBusy(false);

    if (!result.ok) {
      setFeedback(result);
      return;
    }

    setIsOpen(false);
    onStarted(result.message);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="rounded-full bg-[#3272CA] px-[16px] py-[8px] text-[16px] font-semibold text-white"
      >
        {buttonLabel}
      </button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[85vh] w-[560px] max-w-[95vw] flex-col overflow-y-auto rounded-2xl bg-white p-10">
            <form
              noValidate
              onSubmit={submit}
              className="flex flex-col space-y-5"
            >
              <DialogTitle className="font-bold text-[#1d1d1d]">
                {isFirst
                  ? "Mulai periode pertama"
                  : `Mulai semester ${targetName}?`}
              </DialogTitle>

              {isFirst ? (
                <div className="flex flex-col space-y-3">
                  <label className="flex flex-col space-y-2 text-sm font-semibold text-[#5E6278]">
                    <span>Tahun ajaran</span>
                    <input
                      className={inputClassName}
                      placeholder="2026/2027"
                      value={year}
                      onChange={(event) =>
                        setYear(
                          event.target.value.replace(/[^\d/]/g, "").slice(0, 9),
                        )
                      }
                    />
                  </label>
                  <div className="flex flex-row space-x-3">
                    {TERMS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={term === option}
                        onClick={() => setTerm(option)}
                        className={`rounded-full border-2 px-[16px] py-[8px] text-sm font-semibold ${term === option ? "border-[#3272CA] bg-[#3272CA] text-white" : "border-[#BFD9EF] text-[#3272CA]"}`}
                      >
                        {TERM_LABELS[option]}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-[#5E6278]">
                  <li>
                    Semua kelas, pertemuan, presensi, pembayaran, dan asisten{" "}
                    {activePeriod.name} menjadi arsip yang hanya bisa dilihat.
                  </li>
                  <li>Sesi presensi yang masih terbuka akan ditutup.</li>
                  <li>
                    Jam sesi {activePeriod.name} disalin ke semester baru dan
                    bisa diubah tanpa mengubah jam sesi {activePeriod.name}.
                  </li>
                  <li>
                    Mahasiswa mendaftar ulang mata kuliah untuk semester baru.
                  </li>
                  <li className="text-[#F1416C]">
                    Tidak bisa dibatalkan dari aplikasi.
                  </li>
                </ul>
              )}

              <label className="flex flex-col space-y-2 text-sm font-semibold text-[#5E6278]">
                <span>Ketik {CONFIRM_WORD} untuk melanjutkan</span>
                <input
                  aria-label={`Ketik ${CONFIRM_WORD}`}
                  className={inputClassName}
                  autoComplete="off"
                  value={confirmText}
                  onChange={(event) => setConfirmText(event.target.value)}
                />
              </label>

              <FeedbackBox feedback={feedback} />

              <div className="flex w-full flex-row justify-end space-x-3">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isBusy || confirmText.trim() !== CONFIRM_WORD}
                  className="rounded-full bg-[#3272CA] px-[16px] py-[8px] text-[16px] font-semibold text-white disabled:opacity-60"
                >
                  {isBusy ? "Memulai..." : "Mulai Semester"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
