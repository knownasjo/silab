"use client";

import useAuthStore from "../store/useAuthStore";
import DashboardDataContainer from "./dashboard-data-container";

interface DashboardDataCardsProps {
  totalSubject: number | null;
  totalClass: number | null;
  totalActivation: number | null;
  totalPaidStudent: number | null;
  totalUnpaidStudent: number | null;
}

export default function DashboardDataCards({
  totalSubject,
  totalClass,
  totalActivation,
  totalPaidStudent,
  totalUnpaidStudent,
}: DashboardDataCardsProps) {
  const { userData } = useAuthStore();

  return (
    <div className="flex w-full flex-col space-y-5">
      <div className="mt-6 flex w-full flex-row space-x-5">
        {userData?.role === "LABORAN" && (
          <>
            <DashboardDataContainer
              data={totalSubject}
              title="Jumlah Praktikum"
              subTitle="Mata kuliah praktikum terdaftar"
            />
            <DashboardDataContainer
              data={totalPaidStudent}
              data2={totalActivation}
              title="Jumlah Mahasiswa"
              subTitle="Yang sudah membayar praktikum"
            />
            <DashboardDataContainer
              data={totalUnpaidStudent}
              data2={totalActivation}
              title="Jumlah Mahasiswa"
              subTitle="Yang belum membayar praktikum"
            />
          </>
        )}
        {userData?.role === "MAHASISWA" && (
          <>
            <DashboardDataContainer
              data={totalSubject}
              title="Jumlah Praktikum"
              subTitle="Mata kuliah praktikum terdaftar"
            />
            <DashboardDataContainer
              data={totalClass}
              title="Jumlah Kelas Praktikum"
              subTitle="Kelas yang Anda pegang sebagai asisten"
            />
          </>
        )}
      </div>
    </div>
  );
}
