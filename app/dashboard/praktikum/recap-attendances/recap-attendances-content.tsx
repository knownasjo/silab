"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useClassStore from "@/app/store/useClassStore";
import useMeetingStore from "@/app/store/useMeetingStore";
import { statusStyle } from "@/app/utils/attendance";
import { buildRecap, statusCode, statusLegend } from "./recap";
import { downloadRecapPdf } from "./recap-pdf";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";

interface RecapAttendancesContentProps {
  classId: string;
  meetingId?: string;
}

export default function RecapAttendancesContent({
  classId,
  meetingId,
}: RecapAttendancesContentProps) {
  const { getClassById, refreshClassById, classData } = useClassStore();
  const { getMeetings, refreshMeetings, meetingsData, error } =
    useMeetingStore();

  const [isReady, setIsReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsReady(false);
    Promise.all([getClassById(classId), getMeetings(classId)]).finally(() =>
      setIsReady(true),
    );
  }, [classId, getClassById, getMeetings]);

  useRealtimeEvents(({ type, data }) => {
    const isReady = type === "ready";
    if (!isReady && data.class_id !== classId) return;

    if (isReady || ["meeting", "attendance", "class"].includes(type)) {
      refreshMeetings(classId);
    }

    if (isReady || type === "class") refreshClassById(classId);
  });

  const meetings = useMemo(
    () =>
      meetingId
        ? meetingsData.filter((meeting) => meeting.id === meetingId)
        : meetingsData,
    [meetingsData, meetingId],
  );

  const recap = useMemo(() => buildRecap(meetings), [meetings]);

  if (!isReady) return <p>Loading...</p>;

  const classInfo = classData?.id === classId ? classData : null;
  const singleMeeting = meetingId ? meetings[0] : undefined;
  const showTotal = recap.columns.length > 1;

  const emptyMessage = (() => {
    if (error) return error;
    if (meetingsData.length === 0)
      return "Kelas ini belum punya pertemuan. Tambahkan pertemuan dulu sebelum membuat rekap.";
    if (meetings.length === 0) return "Pertemuan tidak ditemukan.";
    if (meetings[0].students === undefined)
      return "Rekap presensi hanya bisa dilihat asisten, dosen pengampu, dan laboran.";
    if (recap.rows.length === 0) return "Belum ada mahasiswa di kelas ini.";
    return null;
  })();

  const handleDownload = async () => {
    if (!classInfo) return;

    setIsDownloading(true);
    try {
      await downloadRecapPdf(recap, {
        subjectCode: classInfo.subject_code,
        subjectName: classInfo.subject_name,
        className: classInfo.name,
        semester: classInfo.semester,
        meetingName: singleMeeting?.meeting_name,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col space-y-8 overflow-auto overscroll-contain">
      <div className="flex w-full flex-row items-end justify-between">
        <div className="flex flex-col">
          {classInfo && (
            <p className="text-[18px] font-semibold text-[#5E6278]">
              Semester {classInfo.semester}
            </p>
          )}
          <p className="text-[32px] font-bold text-black">Rekap Presensi</p>
          {classInfo && (
            <p className="text-base font-semibold text-[#5E6278]">
              Praktikum {classInfo.subject_name} · Kelas {classInfo.name}
              {singleMeeting && ` · ${singleMeeting.meeting_name}`}
            </p>
          )}
        </div>
        <div className="flex flex-row space-x-4">
          <Link
            href={`/dashboard/praktikum/${classId}`}
            className="h-fit content-center rounded-full bg-white p-3 text-sm font-semibold text-[#3272CA]"
          >
            Kembali
          </Link>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!!emptyMessage || !classInfo || isDownloading}
            className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDownloading ? "Menyiapkan PDF..." : "Unduh PDF"}
          </button>
        </div>
      </div>

      {emptyMessage ? (
        <div className="flex h-full w-full items-center justify-center">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl bg-white p-5">
          <table className="w-full text-sm text-[#5E6278]">
            <thead>
              <tr className="text-base font-bold">
                <th className="p-2 text-center">No</th>
                <th className="p-2 text-center">NIM</th>
                <th className="p-2 text-left">Nama</th>
                {recap.columns.map((column) => (
                  <th
                    key={column.meetingId}
                    title={column.meetingName}
                    className="p-2 text-center"
                  >
                    {column.label}
                  </th>
                ))}
                {showTotal && <th className="p-2 text-center">Hadir</th>}
              </tr>
            </thead>
            <tbody>
              {recap.rows.map((row, index) => (
                <tr
                  key={row.studentId}
                  className="border-t border-[#F1F1F2] font-semibold"
                >
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{row.nim}</td>
                  <td className="p-2">{row.studentName}</td>
                  {row.statuses.map((status, statusIndex) => (
                    <td
                      key={recap.columns[statusIndex].meetingId}
                      className="p-2 text-center"
                    >
                      <span
                        title={status}
                        className={`inline-block w-7 rounded-md py-1 text-xs font-semibold ${statusStyle[status]}`}
                      >
                        {statusCode[status]}
                      </span>
                    </td>
                  ))}
                  {showTotal && (
                    <td className="p-2 text-center">
                      {row.attendedCount}/{recap.columns.length}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-[#5E6278]">
            Keterangan: {statusLegend}
          </p>
        </div>
      )}
    </div>
  );
}
