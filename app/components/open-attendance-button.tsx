"use client";

import { useState } from "react";
import SuccessDialog from "./success-dialog";
import ErrorDialog from "./error-dialog";
import useMeetingStore from "../store/useMeetingStore";
import { IGetAllClassMeetingResponseBody } from "../interfaces/meeting/meeting.interface";

interface OpenAttendancesButtonProps {
  classId?: string;
  meeting?: IGetAllClassMeetingResponseBody[];
  selectedMeeting?: string;
}

export default function OpenAttendancesButton({
  classId,
  meeting,
  selectedMeeting,
}: OpenAttendancesButtonProps) {
  const { updateMeetingStatus, isLoading } = useMeetingStore();

  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState<boolean>(false);

  const currentMeeting = meeting?.find((m) => m.id === selectedMeeting);
  const isOpen = currentMeeting?.is_open === true;
  const isDisabled = !classId || !currentMeeting || isLoading;

  const handleToggleAttendance = async () => {
    if (!classId || !currentMeeting) return;

    await updateMeetingStatus(currentMeeting.id, !isOpen, classId);

    const { error, message } = useMeetingStore.getState();

    if (error) {
      setDialogMessage(error);
      setIsErrorDialogOpen(true);
    } else {
      setDialogMessage(message ?? "Berhasil");
      setIsSuccessDialogOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleToggleAttendance}
        disabled={isDisabled}
        className={`h-fit content-center rounded-full p-3 text-sm font-semibold text-white ${
          isDisabled
            ? "cursor-not-allowed bg-[#B5B5C3]"
            : isOpen
              ? "bg-[#F1416C]"
              : "bg-[#3272CA]"
        }`}
      >
        {isLoading
          ? "Memproses..."
          : isOpen
            ? "Tutup Presensi"
            : "Buka Presensi"}
      </button>
      <SuccessDialog
        dialogOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={dialogMessage}
      />
      <ErrorDialog
        dialogOpen={isErrorDialogOpen}
        onClose={() => setIsErrorDialogOpen(false)}
        title={dialogMessage}
      />
    </>
  );
}
