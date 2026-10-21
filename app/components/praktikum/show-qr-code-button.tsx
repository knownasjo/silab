"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFullscreen = () =>
      setIsFullscreen(
        !!panelRef.current && document.fullscreenElement === panelRef.current,
      );

    document.addEventListener("fullscreenchange", syncFullscreen);

    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const exitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  };

  const closeDialog = () => {
    exitFullscreen();
    setIsQrDialogOpen(false);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
      return;
    }

    panelRef.current?.requestFullscreen().catch(() => {});
  };

  return (
    <>
      <button
        onClick={() => setIsQrDialogOpen(true)}
        aria-label="Tampilkan kode QR"
        className="flex flex-row items-center space-x-3 rounded-2xl bg-[#FFBF01] p-3"
      >
        <Image alt="QR Code Icon" src={"/qr.png"} width={32} height={32} />
      </button>
      <Dialog
        onClose={closeDialog}
        open={isQrDialogOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel
            ref={panelRef}
            className={`flex w-[500px] max-w-[95vw] flex-col space-y-6 bg-white p-10 ${isFullscreen ? "rounded-none" : "rounded-2xl"}`}
          >
            <DialogTitle
              className={`font-bold text-[#1d1d1d] ${isFullscreen ? "text-center text-3xl" : ""}`}
            >
              Kode QR Presensi{meetingName && ` · ${meetingName}`}
            </DialogTitle>
            <RotatingQrCode meetingId={meetingId} isFullscreen={isFullscreen} />
            <div className="flex w-full flex-row justify-end space-x-3">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]"
              >
                {isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
              </button>
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
              >
                Tutup
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function RotatingQrCode({
  meetingId,
  isFullscreen,
}: {
  meetingId: string;
  isFullscreen: boolean;
}) {
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
      <div className="flex min-h-[320px] w-full flex-1 items-center justify-center text-center">
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
    <div className="flex min-h-[320px] w-full flex-1 flex-col items-center justify-center space-y-6">
      <div
        style={{ width: isFullscreen ? "min(70vh, 70vw)" : 256 }}
        className="max-w-full"
      >
        <QRCode
          value={current.token}
          size={256}
          viewBox="0 0 256 256"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
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
