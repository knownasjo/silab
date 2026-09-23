import { IGetAllClassMeetingResponseBody } from "@/app/interfaces/meeting/meeting.interface";
import { AttendanceStatus, getAttendanceStatus } from "@/app/utils/attendance";

export interface RecapColumn {
  meetingId: string;
  label: string;
  meetingName: string;
}

export interface RecapRow {
  studentId: string;
  nim: string;
  studentName: string;
  statuses: AttendanceStatus[];
  attendedCount: number;
}

export interface Recap {
  columns: RecapColumn[];
  rows: RecapRow[];
}

/** Kode satu huruf, dipakai di sel tabel web maupun PDF. */
export const statusCode: Record<AttendanceStatus, string> = {
  Hadir: "H",
  "Tidak Hadir": "A",
  "Belum Presensi": "-",
};

export const statusLegend = Object.entries(statusCode)
  .map(([status, code]) => `${code} = ${status}`)
  .join(", ");

/**
 * Backend menyeragamkan nama pertemuan menjadi "Pertemuan <angka>", jadi
 * label kolom bisa diambil dari nama, bukan dari urutan array. Nama lain
 * (misal "Responsi") ditampilkan apa adanya.
 */
const toColumnLabel = (meetingName: string): string => {
  const match = meetingName.match(/^Pertemuan (\d+)$/);

  return match ? `P${match[1]}` : meetingName;
};

export const buildRecap = (meetings: IGetAllClassMeetingResponseBody[]): Recap => {
  const columns = meetings.map((meeting) => ({
    meetingId: meeting.id,
    label: toColumnLabel(meeting.meeting_name),
    meetingName: meeting.meeting_name,
  }));

  // Setiap pertemuan membawa daftar peserta kelas yang sama.
  const students = [...(meetings[0]?.students ?? [])].sort((a, b) =>
    a.nim.localeCompare(b.nim),
  );

  const rows = students.map((student) => {
    const statuses = meetings.map((meeting) => {
      const record = meeting.students?.find(
        (s) => s.student_id === student.student_id,
      );

      return record ? getAttendanceStatus(record) : "Belum Presensi";
    });

    return {
      studentId: student.student_id,
      nim: student.nim,
      studentName: student.student_name,
      statuses,
      attendedCount: statuses.filter((status) => status === "Hadir").length,
    };
  });

  return { columns, rows };
};
