"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import { IGetAllAnnouncementsResponseBody } from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { ANNOUNCEMENT_GONE } from "@/app/utils/announcement";

interface AnnouncementDeleteDialogProps {
  announcement: IGetAllAnnouncementsResponseBody;
  isGone: boolean;
  onClose: () => void;
  onDeleted: (message: string) => void;
}

export default function AnnouncementDeleteDialog({
  announcement,
  isGone,
  onClose,
  onDeleted,
}: AnnouncementDeleteDialogProps) {
  const { removeAnnouncement } = useAnnouncementStore();
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const showGone = isGone && !isDeleting;

  const close = () => {
    if (!isDeleting) onClose();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setFeedback(null);

    const result = await removeAnnouncement(announcement.id);

    setIsDeleting(false);

    if (result.ok) {
      onDeleted(result.message);
      return;
    }

    setFeedback(result);
  };

  return (
    <Dialog open onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="flex w-[500px] max-w-[95vw] flex-col space-y-5 rounded-2xl bg-white p-10">
          <DialogTitle className="font-bold text-[#1d1d1d]">
            Hapus pengumuman?
          </DialogTitle>

          {showGone ? (
            <FeedbackBox feedback={{ ok: false, message: ANNOUNCEMENT_GONE }} />
          ) : (
            <>
              <p className="break-words text-sm font-semibold text-[#5E6278]">
                Pengumuman{" "}
                <span className="font-bold text-[#1D1D1D]">
                  {announcement.title}
                </span>{" "}
                akan dihapus dan tidak tampil lagi di HP mahasiswa.
              </p>
              <FeedbackBox feedback={feedback} />
            </>
          )}

          <div className="flex w-full flex-row justify-end space-x-3">
            <button
              type="button"
              onClick={close}
              disabled={isDeleting}
              className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278] disabled:opacity-60"
            >
              {showGone ? "Tutup" : "Batal"}
            </button>
            {!showGone && (
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
  );
}
