"use client";

import StudentPaymentDialog from "@/app/components/master-data/student-payment-dialog";
import useActivationStore from "@/app/store/useActivationStore";
import {
  groupActivationsByStudent,
  isFullyPaid,
  matchesStudent,
  summarizePayment,
} from "@/app/utils/payment";
import { Field, Input } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import PeriodSelector from "@/app/components/period/period-selector";
import ArchiveNotice from "@/app/components/period/archive-notice";
import NoPeriodNotice from "@/app/components/period/no-period-notice";
import { usePeriodView } from "@/app/store/usePeriodStore";
import useAuthStore from "@/app/store/useAuthStore";

type PaymentFilter = "all" | "paid" | "unpaid";

const FILTERS: { value: PaymentFilter; label: string }[] = [
  { value: "all", label: "Show All" },
  { value: "paid", label: "Sudah Bayar" },
  { value: "unpaid", label: "Belum Bayar" },
];

const ROW_GRID =
  "grid grid-cols-[minmax(0,1fr)_104px_144px_72px] items-center gap-x-3 xl:grid-cols-[112px_minmax(0,1fr)_104px_144px_72px]";

export default function Pembayaran() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PaymentFilter>("all");

  const {
    activationData,
    getAllActivations,
    refreshActivations,
    isLoading,
    loadError,
    setPeriodQuery,
  } = useActivationStore();
  const { viewedPeriod, viewedPeriodId, isArchive } = usePeriodView();
  const { userData } = useAuthStore();

  useEffect(() => {
    setFeedback(null);
    setPeriodQuery(viewedPeriodId);
    getAllActivations();
  }, [getAllActivations, setPeriodQuery, viewedPeriodId]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "activation", "class", "period"].includes(type))
      refreshActivations();
  });

  const students = useMemo(
    () => groupActivationsByStudent(activationData),
    [activationData],
  );

  const visibleStudents = students.filter(
    (student) =>
      matchesStudent(student, search) &&
      (filter === "all" || (filter === "paid") === isFullyPaid(student)),
  );

  const selectedStudent = students.find(
    (student) => student.userId === selectedUserId,
  );

  const countByStatus = (paid: boolean) =>
    loadError && activationData.length === 0
      ? "–"
      : activationData.filter((activation) => activation.status === paid)
          .length;

  const emptyMessage = () => {
    if (students.length === 0)
      return "Belum ada mahasiswa yang mendaftar praktikum di periode ini.";

    if (search.trim()) {
      const label = FILTERS.find((item) => item.value === filter)?.label;

      return `Tidak ada mahasiswa yang cocok dengan "${search.trim()}"${filter === "all" ? "" : ` di pilihan ${label}`}.`;
    }

    return filter === "unpaid"
      ? "Semua mahasiswa sudah bayar."
      : "Belum ada mahasiswa yang lunas.";
  };

  if (userData && userData.role !== "LABORAN") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-base font-semibold text-[#5E6278]">
          Hanya laboran yang dapat melihat data pembayaran.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-5 overflow-auto overscroll-contain">
      <PeriodSelector />
      <NoPeriodNotice />
      {isArchive && viewedPeriod && <ArchiveNotice name={viewedPeriod.name} />}
      <FeedbackBox
        feedback={loadError ? { ok: false, message: loadError } : feedback}
      />
      <div className="flex h-fit w-full flex-row space-x-6">
        <div className="flex w-[300px] min-w-0 flex-col space-y-3 rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-5xl font-bold leading-none text-[#FFBF01]">
            {countByStatus(false)}
          </h1>
          <p className="text-base font-semibold text-white">
            Jumlah aktivasi mahasiswa yang{" "}
            <span className="font-extrabold text-[#FFBF01]">belum bayar</span>
          </p>
        </div>
        <div className="flex w-[300px] min-w-0 flex-col space-y-3 rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-5xl font-bold leading-none text-[#FFBF01]">
            {countByStatus(true)}
          </h1>
          <p className="text-base font-semibold text-white">
            Jumlah aktivasi mahasiswa yang{" "}
            <span className="font-extrabold text-[#FFBF01]">sudah bayar</span>
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center space-x-3">
        <Field className="relative h-12 min-w-0 flex-1">
          <div className="pointer-events-none absolute left-2 top-1/2 z-10 size-[24px] -translate-y-1/2">
            <Image
              src={"/search.png"}
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau NIM"
            className={
              "h-full w-full rounded-2xl pl-10 data-[focus]:outline-[#3272CA]"
            }
          />
        </Field>
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
            className={`h-fit w-fit shrink-0 rounded-full border-2 p-3 text-xs font-semibold ${filter === item.value ? "border-[#3272CA] bg-[#3272CA] text-white" : "border-[#BFD9EF] bg-white text-[#3272CA]"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex h-fit w-full flex-col rounded-2xl bg-white px-5 pb-3 pt-2">
        <div
          className={`${ROW_GRID} sticky top-0 z-10 border-b border-[#F1F1F2] bg-white py-3 text-sm font-bold text-[#5E6278]`}
        >
          <p className="hidden xl:block">NIM</p>
          <p>
            <span className="xl:hidden">Mahasiswa</span>
            <span className="hidden xl:inline">Nama</span>
          </p>
          <p>Mata Kuliah</p>
          <p>Status Pembayaran</p>
          <p></p>
        </div>
        {isLoading && activationData.length === 0 && (
          <p className="py-4 text-sm font-semibold text-[#5E6278]">
            Loading...
          </p>
        )}
        {!isLoading && !loadError && visibleStudents.length === 0 && (
          <p className="py-4 text-sm font-semibold text-[#5E6278]">
            {emptyMessage()}
          </p>
        )}
        {visibleStudents.map((student) => {
          const summary = summarizePayment(student);

          return (
            <div
              key={student.userId}
              onClick={() => {
                setFeedback(null);
                setSelectedUserId(student.userId);
              }}
              className={`${ROW_GRID} cursor-pointer border-b border-[#F1F1F2] py-2 text-sm font-semibold text-[#5E6278] last:border-b-0 hover:bg-[#F5F8FA]`}
            >
              <p className="hidden xl:block">{student.nim}</p>
              <div className="flex min-w-0 flex-col">
                <p className="break-words">{student.student}</p>
                <p className="text-xs xl:hidden">{student.nim}</p>
              </div>
              <p>{student.activations.length} mata kuliah</p>
              <p className={`rounded-md p-2 text-center ${summary.className}`}>
                {summary.label}
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label={`Lihat pembayaran ${student.student}`}
                  className="h-fit w-fit rounded-full border-2 border-[#BFD9EF] px-4 py-2 text-xs font-semibold text-[#3272CA]"
                >
                  Lihat
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <StudentPaymentDialog
        key={selectedUserId ?? ""}
        student={selectedStudent}
        readOnly={isArchive}
        onClose={() => setSelectedUserId(null)}
        onDeletedLast={(message) => {
          setSelectedUserId(null);
          setFeedback({ ok: true, message });
        }}
      />
    </div>
  );
}
