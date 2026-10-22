"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

const noCell = "sticky left-0 w-12 border-[#F1F1F2] bg-white p-2 text-center";
const nimCell =
  "sticky left-12 w-[120px] border-[#F1F1F2] bg-white p-2 text-center";
const nameCell =
  "sticky left-[168px] border-r border-[#F1F1F2] bg-white p-2 text-left";
const meetingCell = "w-12 border-[#F1F1F2] p-2 text-center";
const totalCell =
  "sticky right-0 w-[72px] border-l border-[#F1F1F2] bg-white p-2 text-center";

export default function RecapAttendancesContent({
  classId,
  meetingId,
}: RecapAttendancesContentProps) {
  const {
    getClassById,
    refreshClassById,
    classData,
    error: classError,
  } = useClassStore();
  const { getMeetings, refreshMeetings, meetingsData, loadError } =
    useMeetingStore();

  const [isReady, setIsReady] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const setupScroller = useCallback((scroller: HTMLDivElement) => {
    const measure = () => {
      const box = scroller.getBoundingClientRect();
      const name = scroller.querySelector('[data-kolom="nama"]');
      const total = scroller.querySelector('[data-kolom="hadir"]');

      scroller.style.setProperty(
        "--kolom-kiri",
        `${name ? name.getBoundingClientRect().right - box.left : 0}px`,
      );
      scroller.style.setProperty(
        "--kolom-kanan",
        `${total ? box.right - total.getBoundingClientRect().left : 0}px`,
      );
    };

    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    const table = scroller.querySelector("table");
    if (table) observer.observe(table);

    let lastLeft = scroller.scrollLeft;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    const showScrollbar = () => {
      if (scroller.scrollLeft === lastLeft) return;
      lastLeft = scroller.scrollLeft;
      scroller.dataset.bergeser = "";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => delete scroller.dataset.bergeser, 1000);
    };
    scroller.addEventListener("scroll", showScrollbar, { passive: true });

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", showScrollbar);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    setIsReady(false);
    setIsDeleted(false);
    Promise.all([getClassById(classId), getMeetings(classId)]).finally(() =>
      setIsReady(true),
    );
  }, [classId, getClassById, getMeetings]);

  useRealtimeEvents(({ type, data }) => {
    const reconnected = type === "ready";
    if (!reconnected && data.class_id !== classId) return;

    if (type === "class" && data.action === "deleted") {
      setIsDeleted(true);
      return;
    }

    if (reconnected || ["meeting", "attendance", "class"].includes(type)) {
      refreshMeetings(classId);
    }

    if (reconnected || type === "class") {
      if (classData?.id === classId) refreshClassById(classId);
      else if (isReady) getClassById(classId);
    }
  });

  const meetings = useMemo(
    () =>
      meetingId
        ? meetingsData.filter((meeting) => meeting.id === meetingId)
        : meetingsData,
    [meetingsData, meetingId],
  );

  const recap = useMemo(() => buildRecap(meetings), [meetings]);

  if (isDeleted) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-3">
        <p className="text-base font-semibold text-[#5E6278]">
          Kelas ini sudah dihapus.
        </p>
        <Link
          href="/dashboard/praktikum"
          className="text-sm font-semibold text-[#3272CA] underline"
        >
          Kembali ke Praktikum
        </Link>
      </div>
    );
  }

  if (!isReady) return <p>Loading...</p>;

  const classInfo = classData?.id === classId ? classData : null;
  const singleMeeting = meetingId ? meetings[0] : undefined;
  const showTotal = recap.columns.length > 1;

  const emptyMessage = (() => {
    if (loadError) return loadError;
    if (!classInfo) return classError ?? "Loading...";
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
        periodName: classInfo.period?.name,
        lecturer: classInfo.lecturer,
        meetingName: singleMeeting?.meeting_name,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col space-y-8 overflow-auto overscroll-contain">
      <div className="flex w-full flex-row items-end justify-between gap-6">
        <div className="flex min-w-0 flex-col">
          {classInfo && (
            <p className="text-[18px] font-semibold text-[#5E6278]">
              Semester {classInfo.semester}
            </p>
          )}
          <p className="text-[32px] font-bold text-black">Rekap Presensi</p>
          {classInfo && (
            <>
              <p className="text-base font-semibold text-[#5E6278]">
                Praktikum {classInfo.subject_name} · Kelas {classInfo.name}
                {singleMeeting && ` · ${singleMeeting.meeting_name}`}
              </p>
              <p className="text-sm font-semibold text-[#5E6278]">
                {classInfo.period && `Periode ${classInfo.period.name} · `}
                Dosen pengampu: {classInfo.lecturer}
              </p>
            </>
          )}
        </div>
        <div className="flex shrink-0 flex-row space-x-4">
          <Link
            href={
              classInfo
                ? `/dashboard/praktikum/${classId}`
                : "/dashboard/praktikum"
            }
            className="h-fit content-center whitespace-nowrap rounded-full bg-white p-3 text-sm font-semibold text-[#3272CA]"
          >
            Kembali
          </Link>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!!emptyMessage || !classInfo || isDownloading}
            className="h-fit content-center whitespace-nowrap rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="flex min-h-0 w-full flex-col rounded-2xl bg-white p-5">
          <div
            ref={setupScroller}
            className="scrollbar-pertemuan min-h-0 overflow-auto"
          >
            <table className="w-full border-separate border-spacing-0 text-sm text-[#5E6278]">
              <thead>
                <tr className="text-base font-bold">
                  <th className={`${noCell} top-0 z-30 border-b`}>No</th>
                  <th className={`${nimCell} top-0 z-30 border-b`}>NIM</th>
                  <th
                    data-kolom="nama"
                    className={`${nameCell} top-0 z-30 border-b`}
                  >
                    Nama
                  </th>
                  {recap.columns.map((column) => (
                    <th
                      key={column.meetingId}
                      title={column.meetingName}
                      className={`${meetingCell} sticky top-0 z-20 border-b bg-white`}
                    >
                      {column.label}
                    </th>
                  ))}
                  {showTotal && (
                    <th
                      data-kolom="hadir"
                      className={`${totalCell} top-0 z-30 border-b`}
                    >
                      Hadir
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {recap.rows.map((row, index) => {
                  const line = index > 0 ? "border-t" : "";

                  return (
                    <tr key={row.studentId} className="font-semibold">
                      <td className={`${noCell} z-10 ${line}`}>
                        <div className="min-w-[32px]">{index + 1}</div>
                      </td>
                      <td className={`${nimCell} z-10 ${line}`}>
                        <div className="min-w-[104px]">{row.nim}</div>
                      </td>
                      <td className={`${nameCell} z-10 ${line}`}>
                        <div className="min-w-[200px]">{row.studentName}</div>
                      </td>
                      {row.statuses.map((status, statusIndex) => (
                        <td
                          key={recap.columns[statusIndex].meetingId}
                          className={`${meetingCell} ${line}`}
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
                        <td className={`${totalCell} z-10 ${line}`}>
                          {row.attendedCount}/{recap.columns.length}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className={`${noCell} bottom-0 z-30 border-t`} />
                  <td className={`${nimCell} bottom-0 z-30 border-t`} />
                  <td className={`${nameCell} bottom-0 z-30 border-t`}>
                    Jumlah hadir
                  </td>
                  {recap.columns.map((column) => (
                    <td
                      key={column.meetingId}
                      className={`${meetingCell} sticky bottom-0 z-20 border-t bg-white`}
                    >
                      {column.attendedCount}/{recap.rows.length}
                    </td>
                  ))}
                  {showTotal && (
                    <td className={`${totalCell} bottom-0 z-30 border-t`} />
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-4 shrink-0 text-xs text-[#5E6278]">
            Keterangan: {statusLegend}
          </p>
        </div>
      )}
    </div>
  );
}
