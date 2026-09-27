"use client";

import { useEffect } from "react";
import BannerDashboard from "../components/banner-dashboard";
import DashboardDataCards from "../components/dashboard-data-cards";
import useDashboardStore from "../store/useDashboardStore";
import useAuthStore from "../store/useAuthStore";
import useRealtimeEvents from "../hooks/useRealtimeEvents";
import FeedbackBox from "../components/feedback-box";

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

  useEffect(() => {
    if (!role) return;

    if (role === "DOSEN") getLecturerSummary();
    else getDashboardData();
  }, [role, getDashboardData, getLecturerSummary]);

  useRealtimeEvents(({ type }) => {
    if (!role) return;

    if (role === "DOSEN") {
      if (["ready", "class", "subject", "meeting", "attendance"].includes(type))
        refreshLecturerSummary();
      return;
    }

    if (["ready", "activation", "class", "subject"].includes(type)) {
      refreshDashboardData();
    }
  });

  return (
    <div className="flex h-full w-full flex-col space-y-6 overflow-auto overscroll-contain">
      <BannerDashboard />
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
