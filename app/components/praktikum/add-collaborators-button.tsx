"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IGetUserResponseBody } from "@/app/interfaces/user/user.interface";
import useCollaboratorStore from "@/app/store/useCollaboratorStore";
import { getMahasiswa } from "@/app/services/user/api";

interface AddCollaboratorsButtonProps {
  classId: string;
  classLabel: string;
}

type Feedback = { ok: boolean; message: string } | null;

export default function AddCollaboratorsButton({
  classId,
  classLabel,
}: AddCollaboratorsButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [candidates, setCandidates] = useState<IGetUserResponseBody[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const { collaboratorsData, addClassCollaborators, removeClassCollaborator } =
    useCollaboratorStore();

  useEffect(() => {
    if (!isOpen) return;

    let isCurrent = true;
    const timer = setTimeout(async () => {
      setIsSearching(true);

      try {
        const res = await getMahasiswa(query.trim());
        if (isCurrent) setCandidates(res.data ?? []);
      } catch {
        if (isCurrent) setCandidates([]);
      } finally {
        if (isCurrent) setIsSearching(false);
      }
    }, 300);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [isOpen, query]);

  const open = () => {
    setQuery("");
    setFeedback(null);
    setConfirmingId(null);
    setIsOpen(true);
  };

  const add = async (student: IGetUserResponseBody) => {
    setPendingId(student.id);
    setConfirmingId(null);
    setFeedback(
      await addClassCollaborators({ classId, collaborators: [student.id] }),
    );
    setPendingId(null);
  };

  const remove = async (userId: string) => {
    setPendingId(userId);
    setConfirmingId(null);
    setFeedback(await removeClassCollaborator(classId, userId));
    setPendingId(null);
  };

  const available = candidates.filter(
    (candidate) =>
      !collaboratorsData.some((assistant) => assistant.id === candidate.id),
  );

  return (
    <>
      <button
        onClick={open}
        aria-label="Kelola asisten"
        className="relative size-4"
      >
        <Image
          src={"/edit.png"}
          alt={"Kelola asisten"}
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      <Dialog
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[85vh] w-[560px] flex-col space-y-5 overflow-y-auto rounded-2xl bg-white p-10">
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Asisten Praktikum
              </DialogTitle>
              <p className="text-sm font-semibold text-[#5E6278]">
                {classLabel}
              </p>
            </div>

            {feedback && (
              <p
                className={`rounded-xl p-3 text-sm font-semibold ${feedback.ok ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#FFF5F8] text-[#F1416C]"}`}
              >
                {feedback.message}
              </p>
            )}

            <div className="flex flex-col space-y-3">
              <p className="text-xs font-bold text-[#5E6278]">
                Asisten saat ini
              </p>
              {collaboratorsData.length === 0 && (
                <p className="text-sm text-[#5E6278]">Belum ada asisten.</p>
              )}
              {collaboratorsData.map((assistant) => (
                <div
                  key={assistant.id}
                  className="flex flex-row items-center justify-between rounded-2xl border-2 border-[#F1F1F2] px-4 py-3"
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {assistant.fullname}
                    </p>
                    <p className="text-xs font-semibold text-[#5E6278]">
                      {assistant.nim}
                    </p>
                  </div>
                  {confirmingId === assistant.id ? (
                    <div className="flex flex-row items-center space-x-2">
                      <button
                        onClick={() => remove(assistant.id)}
                        className="rounded-full bg-[#F1416C] px-4 py-2 text-xs font-semibold text-white"
                      >
                        Ya, hapus
                      </button>
                      <button
                        onClick={() => setConfirmingId(null)}
                        className="rounded-full border-2 border-[#F1F1F2] px-4 py-2 text-xs font-semibold text-[#5E6278]"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmingId(assistant.id)}
                      disabled={pendingId !== null}
                      aria-label={`Hapus asisten ${assistant.fullname}`}
                      className="rounded-full border-2 border-[#FFE2E5] px-4 py-2 text-xs font-semibold text-[#F1416C] disabled:opacity-50"
                    >
                      {pendingId === assistant.id ? "Menghapus..." : "Hapus"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-3">
              <p className="text-xs font-bold text-[#5E6278]">Tambah asisten</p>
              <div className="relative">
                <Image
                  alt=""
                  src={"/search.png"}
                  width={20}
                  height={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari nama atau NIM mahasiswa"
                  className="h-12 w-full rounded-2xl bg-[#F5F5F5] pl-12 pr-4 text-sm focus:outline-[#3272CA]"
                />
              </div>
              {isSearching && available.length === 0 && (
                <p className="text-sm text-[#5E6278]">Mencari...</p>
              )}
              {!isSearching && available.length === 0 && (
                <p className="text-sm text-[#5E6278]">
                  {candidates.length > 0
                    ? "Mahasiswa yang cocok sudah menjadi asisten kelas ini."
                    : "Mahasiswa tidak ditemukan."}
                </p>
              )}
              {available.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-row items-center justify-between rounded-2xl bg-[#F5F8FA] px-4 py-3"
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {student.fullname}
                    </p>
                    <p className="text-xs font-semibold text-[#5E6278]">
                      {student.nim}
                    </p>
                  </div>
                  <button
                    onClick={() => add(student)}
                    disabled={pendingId !== null}
                    aria-label={`Tambah asisten ${student.fullname}`}
                    className="rounded-full border-2 border-[#BFD9EF] px-4 py-2 text-xs font-semibold text-[#3272CA] disabled:opacity-50"
                  >
                    {pendingId === student.id ? "Menambahkan..." : "Tambah"}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full rounded-full bg-[#D2E3F1] p-4 font-semibold text-[#3272CA]"
            >
              Tutup
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
