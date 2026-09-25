"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import { IGetAllClassMeetingResponseBody } from "@/app/interfaces/meeting/meeting.interface";
import useMeetingStore from "@/app/store/useMeetingStore";

interface DeleteMeetingButtonProps {
  meeting: IGetAllClassMeetingResponseBody;
  classId: string;
  onDeleted: (message: string) => void;
}

export default function DeleteMeetingButton({
  meeting,
  classId,
  onDeleted,
}: DeleteMeetingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { removeMeeting } = useMeetingStore();

  const recorded = (meeting.students ?? []).filter(
    (student) => student.submitted_at,
  ).length;
  const blocker = meeting.is_open
    ? "Sesi presensi pertemuan ini sedang dibuka. Tutup sesinya dulu sebelum menghapus."
    : recorded > 0
      ? `Pertemuan ini sudah punya ${recorded} presensi, jadi tidak bisa dihapus. Hapus presensinya dulu atau ubah judulnya.`
      : null;

  const open = () => {
    setFeedback(null);
    setIsOpen(true);
  };

  const close = () => {
    if (!isDeleting) setIsOpen(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setFeedback(null);

    const result = await removeMeeting(meeting.id, classId);

    setIsDeleting(false);

    if (!result.ok) {
      setFeedback(result);
      return;
    }

    setIsOpen(false);
    onDeleted(result.message);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Hapus ${meeting.meeting_name}`}
        className="h-fit content-center rounded-full bg-[#FFD9D9] p-3 text-sm font-semibold text-[#FE2F60]"
      >
        Hapus
      </button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex w-[500px] max-w-[95vw] flex-col space-y-5 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Hapus {meeting.meeting_name}?
            </DialogTitle>

            {blocker ? (
              <p
                role="alert"
                className="rounded-xl bg-[#FFF5F8] p-3 text-sm font-semibold text-[#F1416C]"
              >
                {blocker}
              </p>
            ) : (
              <div className="flex flex-col space-y-2 text-sm font-semibold">
                <p className="text-[#1D1D1D]">
                  Pertemuan ini belum punya presensi.
                </p>
                <p className="text-[#F1416C]">
                  Penghapusan tidak bisa dibatalkan.
                </p>
              </div>
            )}

            <FeedbackBox feedback={feedback} />

            <div className="flex w-full flex-row justify-end space-x-3">
              <button
                type="button"
                onClick={close}
                className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
              >
                {blocker ? "Tutup" : "Batal"}
              </button>
              {!blocker && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-full bg-[#F1416C] px-[16px] py-[8px] text-[16px] font-semibold text-white disabled:opacity-60"
                >
                  {isDeleting ? "Menghapus..." : "Ya, hapus"}
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
