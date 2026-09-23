import { IMeetingParticipants } from "@/app/interfaces/meeting/meeting.interface";

export type AttendanceStatus = "Hadir" | "Tidak Hadir" | "Belum Presensi";

export const statusStyle: Record<AttendanceStatus, string> = {
  Hadir: "bg-[#E8FFF3] text-[#50CD89]",
  "Tidak Hadir": "bg-[#FFF5F8] text-[#F1416C]",
  "Belum Presensi": "bg-[#F1F1F2] text-[#181C32]",
};

export const getAttendanceStatus = (
  student: IMeetingParticipants,
): AttendanceStatus => {
  if (student.submitted_at === null) return "Belum Presensi";

  return student.is_attended ? "Hadir" : "Tidak Hadir";
};
