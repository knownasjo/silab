"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FormEvent, useState } from "react";
import SuccessDialog from "../success-dialog";
import useMeetingStore from "@/app/store/useMeetingStore";
import { IGetAllClassMeetingResponseBody } from "@/app/interfaces/meeting/meeting.interface";

interface AddMeetingButtonProps {
  classId?: string;
  onAdded?: (meetingId: string) => void;
}

const nextMeetingName = (meetings: IGetAllClassMeetingResponseBody[]) => {
  const numbers = meetings
    .map((meeting) => /^pertemuan\s+(\d+)$/i.exec(meeting.meeting_name.trim()))
    .filter((match) => match !== null)
    .map((match) => Number(match[1]));

  return `Pertemuan ${Math.max(0, ...numbers) + 1}`;
};

export default function AddMeetingButton({
  classId,
  onAdded,
}: AddMeetingButtonProps) {
  const [isAddMeetingOpen, setIsAddMeetingOpen] = useState<boolean>(false);
  const [meetingName, setMeetingName] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [dialogError, setDialogError] = useState<string>("");

  const { addMeeting, isLoading } = useMeetingStore();

  const openDialog = () => {
    setMeetingName(nextMeetingName(useMeetingStore.getState().meetingsData));
    setDialogError("");
    setIsAddMeetingOpen(true);
  };

  const closeDialog = () => {
    if (!isLoading) setIsAddMeetingOpen(false);
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();

    if (isLoading) return;

    if (!classId) {
      setDialogError("Kelas tidak ditemukan!");
      return;
    }

    if (meetingName.trim() === "") {
      setDialogError("Judul pertemuan wajib diisi!");
      return;
    }

    const meetingId = await addMeeting({
      classId,
      meetingName: meetingName.trim(),
    });

    const { error, message } = useMeetingStore.getState();

    if (error) {
      setDialogError(error);
      return;
    }

    if (meetingId) onAdded?.(meetingId);
    setIsAddMeetingOpen(false);
    setMeetingName("");
    setSuccessMessage(message ?? "Pertemuan berhasil ditambahkan");
    setIsSuccessDialogOpen(true);
  };

  return (
    <>
      <button
        onClick={openDialog}
        className="h-fit content-center whitespace-nowrap rounded-full bg-[#D2E3F1] p-3 text-sm font-semibold text-[#3272CA]"
      >
        Tambah Pertemuan
      </button>
      <Dialog
        onClose={closeDialog}
        open={isAddMeetingOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex w-[500px] max-w-[95vw] flex-col space-y-5 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Tambah Pertemuan Praktikum
            </DialogTitle>
            <form
              noValidate
              onSubmit={handleSave}
              className="flex w-full flex-col space-y-5"
            >
              <fieldset className="w-full space-y-4">
                <label
                  htmlFor="new-meeting-name"
                  className="text-base font-semibold text-[#5E6278]"
                >
                  Judul Pertemuan{" "}
                  <p className="text-xs font-light text-gray-500">
                    e.g Pertemuan 1
                  </p>
                </label>
                <input
                  id="new-meeting-name"
                  required
                  autoComplete="off"
                  maxLength={50}
                  className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
                  placeholder="Judul pertemuan"
                  onChange={(e) => {
                    setMeetingName(e.target.value);
                    setDialogError("");
                  }}
                  value={meetingName}
                />
                {dialogError && (
                  <p className="text-sm font-semibold text-[#F1416C]">
                    {dialogError}
                  </p>
                )}
              </fieldset>
              <div className="flex w-full flex-row justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
      <SuccessDialog
        dialogOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        title={successMessage}
      />
    </>
  );
}
