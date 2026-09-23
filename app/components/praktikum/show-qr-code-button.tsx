"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import QRCode from "react-qr-code";
import useMeetingStore from "@/app/store/useMeetingStore";

interface ShowQrCodeButtonProps {
  meetingId: string;
  meetingName?: string;
}

const REFRESH_DELAY_MS = 300;
const RETRY_DELAY_MS = 3000;

export default function ShowQrCodeButton({
  meetingId,
  meetingName,
}: ShowQrCodeButtonProps) {
  const [isQrDialogOpen, setIsQrDialogOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsQrDialogOpen(true)}
        className="flex flex-row items-center space-x-3 rounded-2xl bg-[#FFBF01] p-3"
      >
        <Image alt="QR Code Icon" src={"/qr.png"} width={32} height={32} />
      </button>
      <Dialog
        onClose={() => setIsQrDialogOpen(false)}
        open={isQrDialogOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex h-3/4 w-[500px] flex-col space-y-4 rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Kode QR Presensi{meetingName && ` · ${meetingName}`}
            </DialogTitle>
            <RotatingQrCode meetingId={meetingId} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function RotatingQrCode({ meetingId }: { meetingId: string }) {
  const { qrToken, qrError, getQrToken, clearQrToken } = useMeetingStore();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let isActive = true;

    const refresh = async () => {
      await getQrToken(meetingId);
      if (!isActive) return;

      const { qrToken } = useMeetingStore.getState();
      const delay = qrToken
        ? Math.max(qrToken.expiresAt - Date.now(), 0) + REFRESH_DELAY_MS
        : RETRY_DELAY_MS;

      timer = setTimeout(refresh, delay);
    };

    clearQrToken();
    refresh();

    return () => {
      isActive = false;
      clearTimeout(timer);
      clearQrToken();
    };
  }, [meetingId, getQrToken, clearQrToken]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 250);

    return () => clearInterval(interval);
  }, []);

  const current = qrToken?.meetingId === meetingId ? qrToken : null;

  if (!current) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center">
        <p
          className={
            qrError ? "font-semibold text-[#F1416C]" : "text-[#5E6278]"
          }
        >
          {qrError ?? "Memuat kode QR..."}
        </p>
      </div>
    );
  }

  const periodMs = current.periodSeconds * 1000;
  const remainingMs = Math.min(Math.max(current.expiresAt - now, 0), periodMs);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
      <QRCode value={current.token} />
      <div className="w-64 space-y-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F1F2]">
          <div
            className="h-full rounded-full bg-[#3272CA] transition-[width] duration-200 ease-linear"
            style={{ width: `${(remainingMs / periodMs) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-[#5E6278]">
          {remainingMs > 0
            ? `QR berganti dalam ${Math.ceil(remainingMs / 1000)} detik`
            : "Memperbarui QR..."}
        </p>
      </div>
    </div>
  );
}
