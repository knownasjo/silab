"use client";

import { useState } from "react";
import AddMeetingButton from "./add-meeting-button";
import MeetingsDropDown from "../meetings-dropdown";
import OpenAttendancesButton from "../open-attendance-button";
import ShowQrCodeButton from "./show-qr-code-button";
import StudentAttendanceEditButton from "../student-attendance-edit-button";
import Link from "next/link";
import Image from "next/image";
import {
  IGetAllClassMeetingResponseBody,
  IMeetingParticipants,
} from "@/app/interfaces/meeting/meeting.interface";

interface ClassMeetingsContentProps {
  classId?: string;
  meetingData: IGetAllClassMeetingResponseBody[];
}

type AttendanceStatus = "Hadir" | "Tidak Hadir" | "Belum Presensi";

const getAttendanceStatus = (
  student: IMeetingParticipants,
): AttendanceStatus => {
  if (student.submitted_at === null) return "Belum Presensi";

  return student.is_attended ? "Hadir" : "Tidak Hadir";
};

const statusStyle: Record<AttendanceStatus, string> = {
  Hadir: "bg-[#E8FFF3] text-[#50CD89]",
  "Tidak Hadir": "bg-[#FFF5F8] text-[#F1416C]",
  "Belum Presensi": "bg-[#F1F1F2] text-[#181C32]",
};

export default function ClassMeetingsContent({
  classId,
  meetingData,
}: ClassMeetingsContentProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<string>("");

  const currentMeeting = meetingData?.find(
    (meeting) => meeting.id === selectedMeeting,
  );

  const students = currentMeeting?.students ?? [];

  const attendedCount = students.filter(
    (student) => getAttendanceStatus(student) === "Hadir",
  ).length;

  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <div className="flex h-1/6 flex-row space-x-4">
          <AddMeetingButton classId={classId} />
          <MeetingsDropDown onMeetingSelected={setSelectedMeeting} />
        </div>
        <div className="flex h-1/6 flex-row space-x-4">
          <OpenAttendancesButton
            classId={classId}
            meeting={meetingData}
            selectedMeeting={selectedMeeting}
          />
          <Link
            href={{
              pathname: "recap-attendances",
              query: {
                classId: classId,
              },
            }}
            className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white"
          >
            Rekap All
          </Link>
        </div>
      </div>
      {!selectedMeeting && (
        <div className="flex h-full w-full items-center justify-center">
          <p>Pilih Pertemuan untuk Melihat Daftar Presensi! </p>
        </div>
      )}
      {selectedMeeting && (
        <div className="h-full w-full space-y-14 bg-white p-5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-4">
              <ShowQrCodeButton
                meetings={meetingData}
                selectedMeeting={selectedMeeting}
              />
              <Link
                href={{
                  pathname: "recap-attendances",
                  query: {
                    classId: classId,
                    meetingId: selectedMeeting,
                  },
                }}
                aria-disabled={selectedMeeting === "" || !selectedMeeting}
                className={
                  selectedMeeting === "" || !selectedMeeting
                    ? "pointer-events-none"
                    : "flex flex-row items-center space-x-3 rounded-2xl bg-[#3272CA] p-3"
                }
              >
                <Image
                  alt="QR Code Icon"
                  src={"/pdf.png"}
                  width={32}
                  height={32}
                />
              </Link>
              <p className="text-base font-bold">
                {currentMeeting?.meeting_name}
              </p>
              <p
                className={`rounded-md p-2 text-xs font-semibold ${
                  currentMeeting?.is_open
                    ? "bg-[#E8FFF3] text-[#50CD89]"
                    : "bg-[#F1F1F2] text-[#181C32]"
                }`}
              >
                {currentMeeting?.is_open
                  ? "Presensi Dibuka"
                  : "Presensi Ditutup"}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p>Tanggal Meeting</p>
              <p>
                Jumlah hadir {attendedCount}/{students.length}
              </p>
            </div>
          </div>
          <div id="recap-attendances">
            <div className="flex w-full flex-row text-base font-bold text-[#5E6278]">
              <p className="flex w-2/12 items-center justify-center">NIM</p>
              <p className="flex w-5/12 items-center justify-center">Nama</p>
              <p className="flex w-3/12 items-center justify-center">
                Presensi
              </p>
              <div className="flex w-2/12 items-center justify-center" />
            </div>
            {students.map((student) => {
              const status = getAttendanceStatus(student);

              return (
                <div
                  key={student.student_id}
                  className="flex w-full flex-row text-base font-semibold text-[#5E6278]"
                >
                  <p className="flex w-2/12 items-center justify-center">
                    {student.nim}
                  </p>
                  <p className="flex w-5/12 items-center justify-center">
                    {student.student_name}
                  </p>
                  <div className="flex w-3/12 items-center justify-center">
                    <p
                      className={`rounded-md p-2 text-sm font-semibold ${statusStyle[status]}`}
                    >
                      {status}
                    </p>
                  </div>
                  {classId && (
                    <StudentAttendanceEditButton
                      student={student}
                      meetingId={selectedMeeting}
                      classId={classId}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
