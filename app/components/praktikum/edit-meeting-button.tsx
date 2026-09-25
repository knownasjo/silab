"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import { IGetAllClassMeetingResponseBody } from "@/app/interfaces/meeting/meeting.interface";
import useMeetingStore from "@/app/store/useMeetingStore";

interface EditMeetingButtonProps {
  meeting: IGetAllClassMeetingResponseBody;
  classId: string;
  onSaved: (message: string) => void;
}

const tidyMeetingName = (value: string) => {
  const text = value.trim().replace(/\s+/g, " ");

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function EditMeetingButton({
  meeting,
  classId,
  onSaved,
}: EditMeetingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [meetingName, setMeetingName] = useState(meeting.meeting_name);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { updateMeeting } = useMeetingStore();

  const tidied = tidyMeetingName(meetingName);
  const isUnchanged = tidied === meeting.meeting_name;

  const open = () => {
    setMeetingName(meeting.meeting_name);
    setFeedback(null);
    setIsOpen(true);
  };

  const close = () => {
    if (!isSaving) setIsOpen(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!tidied) {
      setFeedback({ ok: false, message: "Judul pertemuan wajib diisi!" });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await updateMeeting(meeting.id, tidied, classId);

    setIsSaving(false);

    if (!result.ok) {
      setFeedback(result);
      return;
    }

    setIsOpen(false);
    onSaved(result.message);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Ubah judul ${meeting.meeting_name}`}
        className="h-fit content-center rounded-full bg-[#D2E3F1] p-3 text-sm font-semibold text-[#3272CA]"
      >
        Ubah
      </button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex w-[500px] max-w-[95vw] flex-col space-y-5 rounded-2xl bg-white p-10">
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Ubah Judul Pertemuan
              </DialogTitle>
              <p className="text-sm font-semibold text-[#5E6278]">
                {meeting.meeting_name}
              </p>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="meeting-name"
                  className="text-base font-semibold text-[#5E6278]"
                >
                  Judul Pertemuan
                </label>
                <input
                  id="meeting-name"
                  type="text"
                  autoComplete="off"
                  maxLength={50}
                  value={meetingName}
                  onChange={(event) => {
                    setMeetingName(event.target.value);
                    setFeedback(null);
                  }}
                  className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]"
                />
                <p className="text-xs font-semibold text-[#5E6278]">
                  Presensi pertemuan ini tidak berubah, hanya judulnya.
                </p>
              </div>
              <FeedbackBox feedback={feedback} />
              <div className="flex w-full flex-row justify-end space-x-4">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUnchanged}
                  className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
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
    </>
  );
}
