"use client";

import { useEffect } from "react";
import BannerDashboard from "../components/banner-dashboard";
import DashboardDataCards from "../components/dashboard-data-cards";
import useDashboardStore from "../store/useDashboardStore";
import useRealtimeEvents from "../hooks/useRealtimeEvents";

export default function Dashboard() {
  const {
    getDashboardData,
    refreshDashboardData,
    totalSubject,
    totalClass,
    totalActivation,
    totalPaidStudent,
    totalUnpaidStudent,
  } = useDashboardStore();

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "activation", "class", "subject"].includes(type)) {
      refreshDashboardData();
    }
  });

  return (
    <div className="flex h-full w-full flex-col space-y-6 overflow-auto overscroll-contain">
      <BannerDashboard />
      <DashboardDataCards
        totalSubject={totalSubject}
        totalClass={totalClass}
        totalActivation={totalActivation}
        totalPaidStudent={totalPaidStudent}
        totalUnpaidStudent={totalUnpaidStudent}
      />
    </div>
  );
}
