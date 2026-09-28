"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import StartPeriodDialog from "@/app/components/period/start-period-dialog";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import useAuthStore from "@/app/store/useAuthStore";
import usePeriodStore, { usePeriodView } from "@/app/store/usePeriodStore";

export default function PeriodeAkademik() {
  const router = useRouter();
  const { userData } = useAuthStore();
  const {
    periodsData,
    isLoaded,
    error,
    getPeriods,
    refreshPeriods,
    selectPeriod,
  } = usePeriodStore();
  const { activePeriod } = usePeriodView();
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    getPeriods();
  }, [getPeriods]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "period", "class", "activation"].includes(type))
      refreshPeriods();
  });

  if (userData && userData.role !== "LABORAN") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-base font-semibold text-[#5E6278]">
          Hanya laboran yang dapat mengatur periode akademik.
        </p>
      </div>
    );
  }

  const openPeriod = (id: string, isActive: boolean) => {
    selectPeriod(isActive ? null : id);
    router.push("/dashboard/praktikum");
  };

  return (
    <div className="flex h-full w-full flex-col space-y-6 overflow-auto overscroll-contain">
      <div className="flex flex-col">
        <p className="text-[32px] font-bold text-black">Periode Akademik</p>
        <p className="text-base font-semibold text-[#5E6278]">
          Kelas dan pendaftaran mata kuliah dikelompokkan per semester. Setelah
          semester baru dimulai, data semester sebelumnya menjadi arsip yang
          hanya bisa dilihat.
        </p>
      </div>
      <FeedbackBox feedback={feedback} />
      {error && <FeedbackBox feedback={{ ok: false, message: error }} />}
      <div className="flex flex-row items-center justify-between rounded-2xl bg-white p-7">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-[#5E6278]">Periode aktif</p>
          <p className="text-2xl font-bold text-[#1D1D1D]">
            {activePeriod?.name ?? (isLoaded ? "Belum ada periode" : "–")}
          </p>
        </div>
        {isLoaded && (
          <StartPeriodDialog
            activePeriod={activePeriod}
            onStarted={(message) => setFeedback({ ok: true, message })}
          />
        )}
      </div>
      <div className="flex flex-col rounded-2xl bg-white p-7">
        <div className="grid grid-cols-[1fr_120px_100px_120px_90px] gap-3 pb-3 text-sm font-bold text-[#5E6278]">
          <p>Periode</p>
          <p>Status</p>
          <p>Kelas</p>
          <p>Pendaftaran</p>
          <p></p>
        </div>
        {isLoaded && periodsData.length === 0 && !error && (
          <p className="border-t border-[#F1F1F2] py-3 text-sm font-semibold text-[#5E6278]">
            Belum ada periode.
          </p>
        )}
        {periodsData.map((period) => (
          <div
            key={period.id}
            className="grid grid-cols-[1fr_120px_100px_120px_90px] items-center gap-3 border-t border-[#F1F1F2] py-3 text-sm font-semibold text-[#5E6278]"
          >
            <p className="text-base font-bold text-[#1D1D1D]">{period.name}</p>
            <p>
              <span
                className={`rounded-md px-2 py-1 ${period.is_active ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#F1F1F2]"}`}
              >
                {period.is_active ? "Aktif" : "Selesai"}
              </span>
            </p>
            <p>{period.classes}</p>
            <p>{period.activations}</p>
            <button
              type="button"
              aria-label={`Lihat kelas ${period.name}`}
              onClick={() => openPeriod(period.id, period.is_active)}
              className="w-fit rounded-full border-2 border-[#BFD9EF] px-4 py-1 text-xs font-semibold text-[#3272CA]"
            >
              Lihat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
