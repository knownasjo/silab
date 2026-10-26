"use client";

import { useEffect, useState } from "react";
import AddMeetingButton from "./add-meeting-button";
import EditMeetingButton from "./edit-meeting-button";
import DeleteMeetingButton from "./delete-meeting-button";
import FeedbackBox, { Feedback } from "../feedback-box";
import MeetingsDropDown from "../meetings-dropdown";
import OpenAttendancesButton from "../open-attendance-button";
import ShowQrCodeButton from "./show-qr-code-button";
import DeviceCheckBox from "./device-check-box";
import StudentAttendanceEditButton from "../student-attendance-edit-button";
import Link from "next/link";
import Image from "next/image";
import { IGetAllClassMeetingResponseBody } from "@/app/interfaces/meeting/meeting.interface";
import { getAttendanceStatus, statusStyle } from "@/app/utils/attendance";
import useAuthStore from "@/app/store/useAuthStore";
import useMeetingStore from "@/app/store/useMeetingStore";

interface ClassMeetingsContentProps {
  classId?: string;
  meetingData: IGetAllClassMeetingResponseBody[];
  readOnly?: boolean;
}

const SELECTED_MEETING_KEY = "pertemuan-terpilih";

const readSelectedMeeting = (classId?: string) => {
  try {
    return sessionStorage.getItem(`${SELECTED_MEETING_KEY}:${classId}`) ?? "";
  } catch {
    return "";
  }
};

export default function ClassMeetingsContent({
  classId,
  meetingData,
  readOnly = false,
}: ClassMeetingsContentProps) {
  const [pickedMeeting, setPickedMeeting] = useState<string>(() =>
    readSelectedMeeting(classId),
  );
  const [notice, setNotice] = useState<Feedback>(null);
  const { userData } = useAuthStore();
  const { isLoading, loadError } = useMeetingStore();
  const canManage = !!userData && userData.role !== "DOSEN" && !readOnly;

  const pickedInList = meetingData.find(
    (meeting) => meeting.id === pickedMeeting,
  );
  const fallbackMeeting =
    meetingData.find((meeting) => meeting.isOpen) ??
    meetingData.findLast((meeting) => meeting.isHeld) ??
    meetingData[meetingData.length - 1];
  const currentMeeting = pickedInList ?? fallbackMeeting;
  const selectedMeeting = currentMeeting?.id ?? "";

  useEffect(() => {
    if (!pickedInList && fallbackMeeting) setPickedMeeting(fallbackMeeting.id);
  }, [pickedInList, fallbackMeeting]);

  useEffect(() => {
    if (!classId || !pickedMeeting) return;

    try {
      sessionStorage.setItem(
        `${SELECTED_MEETING_KEY}:${classId}`,
        pickedMeeting,
      );
    } catch {}
  }, [classId, pickedMeeting]);

  const pickMeeting = (meetingId: string) => {
    setPickedMeeting(meetingId);
    setNotice(null);
  };

  const students = currentMeeting?.students ?? [];

  const attendedCount = students.filter(
    (student) => getAttendanceStatus(student) === "Hadir",
  ).length;

  return (
    <>
      <div className="flex w-full flex-row flex-wrap items-start justify-between gap-4">
        <div className="flex flex-row flex-wrap gap-4">
          {canManage && (
            <AddMeetingButton classId={classId} onAdded={pickMeeting} />
          )}
          <MeetingsDropDown
            selectedMeeting={selectedMeeting}
            onMeetingSelected={pickMeeting}
          />
          {canManage && classId && currentMeeting && (
            <>
              <EditMeetingButton
                meeting={currentMeeting}
                classId={classId}
                onSaved={(message) => setNotice({ ok: true, message })}
              />
              <DeleteMeetingButton
                meeting={currentMeeting}
                classId={classId}
                onDeleted={(message) => {
                  setPickedMeeting("");
                  setNotice({ ok: true, message });
                }}
              />
            </>
          )}
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {canManage && (
            <OpenAttendancesButton
              classId={classId}
              meeting={meetingData}
              selectedMeeting={selectedMeeting}
            />
          )}
          <Link
            href={{
              pathname: "recap-attendances",
              query: {
                classId: classId,
              },
            }}
            className="h-fit content-center whitespace-nowrap rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white"
          >
            Rekap All
          </Link>
        </div>
      </div>
      <FeedbackBox
        feedback={loadError ? { ok: false, message: loadError } : notice}
      />
      {!currentMeeting && !loadError && (
        <div className="flex w-full flex-1 items-center justify-center">
          <p className="text-sm font-semibold text-[#5E6278]">
            {isLoading
              ? "Loading..."
              : canManage
                ? "Belum ada pertemuan. Klik Tambah Pertemuan untuk memulai."
                : "Belum ada pertemuan."}
          </p>
        </div>
      )}
      {currentMeeting && (
        <div className="w-full flex-1 space-y-10 rounded-[20px] bg-white p-5">
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <div className="flex flex-row flex-wrap items-center gap-4">
              {canManage && (
                <ShowQrCodeButton
                  meetingId={selectedMeeting}
                  meetingName={currentMeeting.meetingName}
                />
              )}
              <Link
                href={{
                  pathname: "recap-attendances",
                  query: {
                    classId: classId,
                    meetingId: selectedMeeting,
                  },
                }}
                title={`Rekap ${currentMeeting.meetingName}`}
                aria-label={`Rekap ${currentMeeting.meetingName}`}
                className="flex flex-row items-center space-x-3 rounded-2xl bg-[#3272CA] p-3"
              >
                <Image alt="" src={"/pdf.png"} width={32} height={32} />
              </Link>
              <p className="text-base font-bold">
                {currentMeeting.meetingName}
              </p>
              <p
                className={`rounded-md p-2 text-xs font-semibold ${
                  currentMeeting.isOpen
                    ? "bg-[#E8FFF3] text-[#50CD89]"
                    : "bg-[#F1F1F2] text-[#181C32]"
                }`}
              >
                {currentMeeting.isOpen
                  ? "Presensi Dibuka"
                  : "Presensi Ditutup"}
              </p>
            </div>
            <p className="text-base font-semibold text-[#5E6278]">
              Jumlah hadir {attendedCount}/{students.length}
            </p>
          </div>
          <DeviceCheckBox
            students={students}
            meetingId={selectedMeeting}
            classId={classId}
            canManage={canManage}
            onAnswered={setNotice}
          />
          <div id="recap-attendances">
            {students.length === 0 ? (
              <p className="py-6 text-center text-sm font-semibold text-[#5E6278]">
                Belum ada mahasiswa di kelas ini.
              </p>
            ) : (
              <>
                <div className="flex w-full flex-row border-b border-[#F1F1F2] pb-3 text-sm font-bold text-[#5E6278] xl:text-base">
                  <p className="flex w-3/12 items-center justify-center px-2 text-center xl:w-2/12">
                    NIM
                  </p>
                  <p className="flex w-4/12 items-center justify-center px-2 text-center xl:w-5/12">
                    Nama
                  </p>
                  <p className="flex w-3/12 items-center justify-center px-2 text-center">
                    Presensi
                  </p>
                  <div className="flex w-2/12 items-center justify-center" />
                </div>
                {students.map((student) => {
                  const status = getAttendanceStatus(student);

                  return (
                    <div
                      key={student.studentId}
                      className="flex w-full flex-row items-center border-b border-[#F1F1F2] py-3 text-sm font-semibold text-[#5E6278] last:border-b-0 xl:text-base"
                    >
                      <p className="flex w-3/12 items-center justify-center whitespace-nowrap px-2 text-center xl:w-2/12">
                        {student.nim}
                      </p>
                      <p className="flex w-4/12 min-w-0 items-center justify-center break-words px-2 text-center xl:w-5/12">
                        {student.studentName}
                      </p>
                      <div className="flex w-3/12 items-center justify-center">
                        <div className="relative">
                          <p
                            className={`rounded-md p-2 text-sm font-semibold ${statusStyle[status]}`}
                          >
                            {status}
                          </p>
                          {student.deviceCheck === "TIDAK_BIASA" && (
                            <Image
                              src={"/warning-yellow.png"}
                              alt="HP tidak biasa"
                              title="HP tidak biasa, belum dicek"
                              width={20}
                              height={20}
                              className="absolute left-full top-1/2 ml-2 -translate-y-1/2"
                            />
                          )}
                        </div>
                      </div>
                      {classId && canManage && (
                        <StudentAttendanceEditButton
                          student={student}
                          meetingId={selectedMeeting}
                          classId={classId}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
