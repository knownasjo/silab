"use client";

import { useState } from "react";
import AddMeetingButton from "./add-meeting-button";
import EditMeetingButton from "./edit-meeting-button";
import DeleteMeetingButton from "./delete-meeting-button";
import FeedbackBox, { Feedback } from "../feedback-box";
import MeetingsDropDown from "../meetings-dropdown";
import OpenAttendancesButton from "../open-attendance-button";
import ShowQrCodeButton from "./show-qr-code-button";
import StudentAttendanceEditButton from "../student-attendance-edit-button";
import Link from "next/link";
import Image from "next/image";
import { IGetAllClassMeetingResponseBody } from "@/app/interfaces/meeting/meeting.interface";
import { getAttendanceStatus, statusStyle } from "@/app/utils/attendance";
import useAuthStore from "@/app/store/useAuthStore";

interface ClassMeetingsContentProps {
  classId?: string;
  meetingData: IGetAllClassMeetingResponseBody[];
}

export default function ClassMeetingsContent({
  classId,
  meetingData,
}: ClassMeetingsContentProps) {
  const [pickedMeeting, setPickedMeeting] = useState<string>("");
  const [notice, setNotice] = useState<Feedback>(null);
  const { userData } = useAuthStore();
  const canManage = !!userData && userData.role !== "DOSEN";

  const currentMeeting = meetingData?.find(
    (meeting) => meeting.id === pickedMeeting,
  );
  const selectedMeeting = currentMeeting ? pickedMeeting : "";

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
      <div className="flex w-full flex-row justify-between">
        <div className="flex h-1/6 flex-row space-x-4">
          {canManage && <AddMeetingButton classId={classId} />}
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
        <div className="flex h-1/6 flex-row space-x-4">
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
            className="h-fit content-center rounded-full bg-[#3272CA] p-3 text-sm font-semibold text-white"
          >
            Rekap All
          </Link>
        </div>
      </div>
      <FeedbackBox feedback={notice} />
      {!selectedMeeting && (
        <div className="flex w-full flex-1 items-center justify-center">
          <p>Pilih Pertemuan untuk Melihat Daftar Presensi! </p>
        </div>
      )}
      {selectedMeeting && (
        <div className="w-full flex-1 space-y-10 rounded-[20px] bg-white p-5">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-4">
              {canManage && (
                <ShowQrCodeButton
                  meetingId={selectedMeeting}
                  meetingName={currentMeeting?.meeting_name}
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
            <p className="text-base font-semibold text-[#5E6278]">
              Jumlah hadir {attendedCount}/{students.length}
            </p>
          </div>
          <div id="recap-attendances">
            <div className="flex w-full flex-row border-b border-[#F1F1F2] pb-3 text-base font-bold text-[#5E6278]">
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
                  className="flex w-full flex-row items-center border-b border-[#F1F1F2] py-3 text-base font-semibold text-[#5E6278] last:border-b-0"
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
          </div>
        </div>
      )}
    </>
  );
}
