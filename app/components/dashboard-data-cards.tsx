"use client";

import useAuthStore from "../store/useAuthStore";
import DashboardDataContainer from "./dashboard-data-container";
import { ILecturerDashboardResponseBody } from "../interfaces/dashboard/dashboard.interface";

interface DashboardDataCardsProps {
  totalSubject: number | null;
  totalClass: number | null;
  totalActivation: number | null;
  totalPaidStudent: number | null;
  totalUnpaidStudent: number | null;
  lecturerSummary: ILecturerDashboardResponseBody | null;
}

export default function DashboardDataCards({
  totalSubject,
  totalClass,
  totalActivation,
  totalPaidStudent,
  totalUnpaidStudent,
  lecturerSummary,
}: DashboardDataCardsProps) {
  const { userData } = useAuthStore();
  const columns =
    userData?.role === "MAHASISWA"
      ? "grid-cols-2"
      : userData?.role === "DOSEN"
        ? "grid-cols-3"
        : "grid-cols-2 xl:grid-cols-4";

  return (
    <div className={`mt-6 grid w-full gap-5 ${columns}`}>
      {userData?.role === "LABORAN" && (
        <>
          <DashboardDataContainer
            data={totalSubject}
            title="Jumlah Praktikum"
            subTitle="Mata kuliah praktikum terdaftar"
          />
          <DashboardDataContainer
            data={totalClass}
            title="Jumlah Kelas"
            subTitle="Kelas praktikum di periode aktif"
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
      {userData?.role === "DOSEN" && (
        <>
          <DashboardDataContainer
            data={lecturerSummary?.totalClass ?? null}
            title="Jumlah Kelas"
            subTitle="Kelas praktikum mata kuliah Anda"
          />
          <DashboardDataContainer
            data={lecturerSummary?.totalStudent ?? null}
            title="Jumlah Mahasiswa"
            subTitle="Mahasiswa di kelas praktikum Anda"
          />
          <DashboardDataContainer
            data={lecturerSummary?.totalMeeting ?? null}
            title="Jumlah Pertemuan"
            subTitle="Pertemuan yang sudah berjalan"
          />
        </>
      )}
      {userData?.role === "MAHASISWA" && (
        <>
          <DashboardDataContainer
            data={totalSubject}
            title="Jumlah Praktikum"
            subTitle="Mata kuliah dari kelas yang Anda pegang"
          />
          <DashboardDataContainer
            data={totalClass}
            title="Jumlah Kelas Praktikum"
            subTitle="Kelas yang Anda pegang sebagai asisten"
          />
        </>
      )}
    </div>
  );
}
