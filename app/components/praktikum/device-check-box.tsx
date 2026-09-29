"use client";

import { useState } from "react";
import { Feedback } from "../feedback-box";
import { IMeetingParticipants } from "@/app/interfaces/meeting/meeting.interface";
import useMeetingStore from "@/app/store/useMeetingStore";

interface DeviceCheckBoxProps {
  students: IMeetingParticipants[];
  meetingId: string;
  classId?: string;
  canManage: boolean;
  onAnswered: (feedback: Feedback) => void;
}

export default function DeviceCheckBox({
  students,
  meetingId,
  classId,
  canManage,
  onAnswered,
}: DeviceCheckBoxProps) {
  const { checkStudentDevice } = useMeetingStore();
  const [isSending, setIsSending] = useState<boolean>(false);

  const flagged = students.filter(
    (student) => student.device_check === "TIDAK_BIASA",
  );

  if (flagged.length === 0) return null;

  const answer = async (student: IMeetingParticipants, present: boolean) => {
    if (!classId) return;

    setIsSending(true);
    onAnswered(
      await checkStudentDevice(meetingId, student.student_id, present, classId),
    );
    setIsSending(false);
  };

  return (
    <section
      aria-label="HP tidak biasa"
      className="space-y-3 rounded-xl bg-[#FFF8DD] p-4"
    >
      <p className="text-sm font-semibold text-[#B58100]">
        ⚠ {flagged.length} mahasiswa presensi dari HP yang tidak biasa.{" "}
        {canManage
          ? "Panggil namanya, lalu pilih Ada atau Tidak ada."
          : "Menunggu dicek asisten."}
      </p>
      {flagged.map((student) => (
        <div
          key={student.student_id}
          className="flex flex-row items-center justify-between rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#5E6278]"
        >
          <p>
            {student.nim} &middot; {student.student_name}
          </p>
          {canManage && (
            <div className="flex flex-row space-x-2">
              <button
                onClick={() => answer(student, true)}
                disabled={isSending}
                aria-label={`Ada: ${student.student_name}`}
                className="rounded-full bg-[#E8FFF3] px-4 py-2 text-[#50CD89] disabled:opacity-50"
              >
                Ada
              </button>
              <button
                onClick={() => answer(student, false)}
                disabled={isSending}
                aria-label={`Tidak ada: ${student.student_name}`}
                className="rounded-full bg-[#FFF5F8] px-4 py-2 text-[#F1416C] disabled:opacity-50"
              >
                Tidak ada
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
