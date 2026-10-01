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

const attendanceNote = (summary: ILecturerDashboardResponseBody | null) => {
  if (!summary) return "Kehadiran mahasiswa di pertemuan";
  if (!summary.total_expected_attendance) return "Belum ada data presensi";

  return `${summary.total_attended} dari ${summary.total_expected_attendance} kesempatan hadir`;
};

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
            data={lecturerSummary?.total_class ?? null}
            title="Jumlah Kelas"
            subTitle="Kelas praktikum mata kuliah Anda"
          />
          <DashboardDataContainer
            data={lecturerSummary?.total_student ?? null}
            title="Jumlah Mahasiswa"
            subTitle="Mahasiswa di kelas praktikum Anda"
          />
          <DashboardDataContainer
            data={lecturerSummary?.total_meeting ?? null}
            title="Jumlah Pertemuan"
            subTitle="Pertemuan yang sudah berjalan"
          />
          <DashboardDataContainer
            data={lecturerSummary?.attendance_rate ?? null}
            suffix="%"
            title="Rata-rata Kehadiran"
            subTitle={attendanceNote(lecturerSummary)}
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
