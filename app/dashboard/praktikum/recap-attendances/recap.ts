import { IGetAllClassMeetingResponseBody } from "@/app/interfaces/meeting/meeting.interface";
import { AttendanceStatus, getAttendanceStatus } from "@/app/utils/attendance";

export interface RecapColumn {
  meetingId: string;
  label: string;
  meetingName: string;
  attendedCount: number;
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

export const statusCode: Record<AttendanceStatus, string> = {
  Hadir: "H",
  "Tidak Hadir": "A",
  "Belum Presensi": "-",
};

export const statusLegend = Object.entries(statusCode)
  .map(([status, code]) => `${code} = ${status}`)
  .join(", ");

const toColumnLabel = (meetingName: string): string => {
  const match = meetingName.match(/^Pertemuan (\d+)$/);

  return match ? `P${match[1]}` : meetingName;
};

export const buildRecap = (
  meetings: IGetAllClassMeetingResponseBody[],
): Recap => {
  const students = [...(meetings[0]?.students ?? [])].sort((a, b) =>
    a.nim.localeCompare(b.nim),
  );

  const rows = students.map((student) => {
    const statuses = meetings.map((meeting) => {
      const record = meeting.students?.find(
        (s) => s.studentId === student.studentId,
      );

      return record ? getAttendanceStatus(record) : "Belum Presensi";
    });

    return {
      studentId: student.studentId,
      nim: student.nim,
      studentName: student.studentName,
      statuses,
      attendedCount: statuses.filter((status) => status === "Hadir").length,
    };
  });

  const columns = meetings.map((meeting, index) => ({
    meetingId: meeting.id,
    label: toColumnLabel(meeting.meetingName),
    meetingName: meeting.meetingName,
    attendedCount: rows.filter((row) => row.statuses[index] === "Hadir").length,
  }));

  return { columns, rows };
};
