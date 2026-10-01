"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SignOutButton({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { logout, sessionEnded } = useAuthStore();

  useEffect(() => {
    if (sessionEnded) router.replace("/auth?sesi=berakhir");
  }, [router, sessionEnded]);

  return (
    <div className="group/sidebaritem">
      <button
        onClick={() => setIsOpen(true)}
        title={collapsed ? "Sign Out" : undefined}
        aria-label={collapsed ? "Sign Out" : undefined}
        className={`flex w-full flex-row rounded-full py-3 font-semibold text-[#FE2F60] transition-all duration-300 group-hover/sidebaritem:bg-[#FBEFEF] ${collapsed ? "justify-center" : "space-x-3 px-4"}`}
      >
        <Image
          className={
            collapsed
              ? ""
              : "transition-all duration-300 group-hover/sidebaritem:translate-x-3"
          }
          src={"/logout.png"}
          height={24}
          width={24}
          alt={"logout"}
        />
        {!collapsed && (
          <p className="whitespace-nowrap transition-all duration-300 group-hover/sidebaritem:translate-x-3">
            Sign Out
          </p>
        )}
      </button>
      <Dialog
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className={"relative z-50"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex w-[500px] max-w-[95vw] flex-col space-y-5 rounded-2xl bg-white p-10">
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Sign Out
              </DialogTitle>
              <p className="text-sm font-semibold text-[#5E6278]">
                Apakah Anda ingin keluar?
              </p>
            </div>
            <div className="flex w-full flex-row justify-end space-x-3">
              <button
                type="button"
                className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </button>
              <button
                type="button"
                className="rounded-full bg-[#F1416C] px-[16px] py-[8px] text-[16px] font-semibold text-white"
                onClick={async () => {
                  await logout();
                  setIsOpen(false);
                  router.replace("/auth");
                }}
              >
                Keluar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
