"use client";

import { useEffect } from "react";
import BannerDashboard from "../components/banner-dashboard";
import DashboardDataCards from "../components/dashboard-data-cards";
import useDashboardStore from "../store/useDashboardStore";
import useAuthStore from "../store/useAuthStore";
import useRealtimeEvents from "../hooks/useRealtimeEvents";
import FeedbackBox from "../components/feedback-box";
import PeriodSelector from "../components/period/period-selector";
import ArchiveNotice from "../components/period/archive-notice";
import usePeriodStore, { usePeriodView } from "../store/usePeriodStore";

export default function Dashboard() {
  const {
    getDashboardData,
    refreshDashboardData,
    getLecturerSummary,
    refreshLecturerSummary,
    totalSubject,
    totalClass,
    totalActivation,
    totalPaidStudent,
    totalUnpaidStudent,
    lecturerSummary,
    error,
  } = useDashboardStore();
  const { userData } = useAuthStore();
  const role = userData?.role;
  const { isLoaded, getPeriods, refreshPeriods } = usePeriodStore();
  const { activePeriod, viewedPeriod, viewedPeriodId, isArchive } =
    usePeriodView();

  useEffect(() => {
    if (role === "LABORAN" && !isLoaded) getPeriods();
  }, [role, isLoaded, getPeriods]);

  useEffect(() => {
    if (!role) return;

    if (role === "DOSEN") getLecturerSummary(viewedPeriodId);
    else getDashboardData(role);
  }, [role, getDashboardData, getLecturerSummary, viewedPeriodId]);

  useRealtimeEvents(({ type }) => {
    if (!role) return;

    if (role === "DOSEN") {
      if (
        [
          "ready",
          "class",
          "subject",
          "meeting",
          "attendance",
          "period",
        ].includes(type)
      )
        refreshLecturerSummary();
      return;
    }

    if (role === "LABORAN" && (type === "ready" || type === "period"))
      refreshPeriods();

    if (["ready", "activation", "class", "subject", "period"].includes(type)) {
      refreshDashboardData(role);
    }
  });

  return (
    <div className="flex h-full w-full flex-col space-y-6 overflow-auto overscroll-contain">
      <BannerDashboard />
      {role === "DOSEN" && <PeriodSelector />}
      {role === "DOSEN" && isArchive && viewedPeriod && (
        <ArchiveNotice name={viewedPeriod.name} />
      )}
      {role === "LABORAN" && activePeriod && (
        <p className="text-sm font-semibold text-[#5E6278]">
          Periode aktif: {activePeriod.name}
        </p>
      )}
      <FeedbackBox feedback={error ? { ok: false, message: error } : null} />
      <DashboardDataCards
        totalSubject={totalSubject}
        totalClass={totalClass}
        totalActivation={totalActivation}
        totalPaidStudent={totalPaidStudent}
        totalUnpaidStudent={totalUnpaidStudent}
        lecturerSummary={lecturerSummary}
      />
    </div>
  );
}
