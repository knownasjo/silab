"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import { IGetClassByIdResponseBody } from "@/app/interfaces/class/class.interface";
import useClassStore from "@/app/store/useClassStore";

interface DeleteClassButtonProps {
  data: IGetClassByIdResponseBody;
  assistants: number;
}

export default function DeleteClassButton({
  data,
  assistants,
}: DeleteClassButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { removeClass } = useClassStore();

  const isBlocked = data.recorded_meetings > 0;
  const impacts = [
    data.participants > 0 &&
      `${data.participants} peserta kembali ke status lunas tanpa kelas dan bisa memilih kelas lain.`,
    assistants > 0 && `${assistants} asisten dilepas dari kelas ini.`,
    data.meetings > 0 &&
      `${data.meetings} pertemuan tanpa presensi ikut terhapus.`,
  ].filter((impact): impact is string => Boolean(impact));

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

    const result = await removeClass(data.id);

    if (result.ok) {
      router.replace("/dashboard/praktikum");
      return;
    }

    setIsDeleting(false);
    setFeedback(result);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60]"
      >
        Hapus Kelas
      </button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[85vh] w-[560px] max-w-[95vw] flex-col space-y-5 overflow-y-auto rounded-2xl bg-white p-10">
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Hapus Kelas
              </DialogTitle>
              <p className="text-sm font-semibold text-[#5E6278]">
                {data.subject_name} — Kelas {data.name}
              </p>
            </div>

            {isBlocked ? (
              <p
                role="alert"
                className="rounded-xl bg-[#FFF5F8] p-3 text-sm font-semibold text-[#F1416C]"
              >
                Kelas ini sudah punya presensi di {data.recorded_meetings}{" "}
                pertemuan, jadi tidak bisa dihapus. Ubah kelasnya bila ada data
                yang salah.
              </p>
            ) : (
              <div className="flex flex-col space-y-3">
                <p className="text-sm font-semibold text-[#1D1D1D]">
                  {impacts.length > 0
                    ? "Yang terjadi bila kelas ini dihapus:"
                    : "Kelas ini belum punya peserta, asisten, atau pertemuan."}
                </p>
                {impacts.length > 0 && (
                  <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-[#5E6278]">
                    {impacts.map((impact) => (
                      <li key={impact}>{impact}</li>
                    ))}
                  </ul>
                )}
                <p className="text-sm font-semibold text-[#F1416C]">
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
                {isBlocked ? "Tutup" : "Batal"}
              </button>
              {!isBlocked && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-full bg-[#F1416C] px-[16px] py-[8px] text-[16px] font-semibold text-white disabled:opacity-60"
                >
                  {isDeleting ? "Menghapus..." : "Ya, hapus kelas"}
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
