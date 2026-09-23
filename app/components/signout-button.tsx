"use client";

import {
  Description,
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

  let [isOpen, setIsOpen] = useState(false);

  const { logout, userData, isLoading, error } = useAuthStore();

  // Tunggu sampai me() benar-benar gagal. Saat halaman baru dimuat, userData
  // masih null karena me() belum selesai; mengalihkan pada saat itu membuat
  // middleware memantulkan /auth ke /dashboard, sehingga halaman apa pun yang
  // di-refresh selalu terlempar ke /dashboard.
  useEffect(() => {
    if (!userData && !isLoading && error) {
      router.replace("/auth");
    }
  }, [router, userData, isLoading, error]);

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
          <DialogPanel className="flex h-[200px] w-[500px] flex-col justify-between rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#FE2F60]">
              Sign Out
            </DialogTitle>
            <p>Apakah anda ingin keluar?</p>
            <div className="flex gap-4">
              <button
                className="rounded-full bg-[#FF0000] px-4 py-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </button>
              <button
                className="text-[#FF0000]"
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
