"use client";

import Link from "next/link";
import { useEffect } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import useAuthStore from "@/app/store/useAuthStore";
import usePeriodStore from "@/app/store/usePeriodStore";

export default function NoPeriodNotice() {
  const { userData } = useAuthStore();
  const { periodsData, isLoaded, error, getPeriods, refreshPeriods } =
    usePeriodStore();

  useEffect(() => {
    if (!isLoaded) getPeriods();
  }, [isLoaded, getPeriods]);

  useRealtimeEvents(({ type }) => {
    if (type === "ready" || type === "period") refreshPeriods();
  });

  if (!userData || !isLoaded || error || periodsData.length > 0) return null;

  const isLaboran = userData.role === "LABORAN";

  return (
    <div
      role="status"
      className="flex flex-row items-center justify-between gap-4 rounded-xl bg-[#FFF8DD] p-3 text-sm font-semibold text-[#B58100]"
    >
      <p>
        {isLaboran
          ? "Belum ada periode akademik. Mulai periode pertama dulu sebelum mengisi jam sesi, kelas, dan pendaftaran."
          : "Belum ada periode akademik. Data praktikum muncul setelah laboran memulai semester."}
      </p>
      {isLaboran && (
        <Link
          href="/dashboard/master-data/periode"
          className="shrink-0 rounded-full bg-[#3272CA] px-4 py-2 text-sm font-semibold text-white"
        >
          Buka Periode Akademik
        </Link>
      )}
    </div>
  );
}
