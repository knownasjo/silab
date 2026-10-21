"use client";

import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/app/store/useAuthStore";

export default function AddPracticumBanner() {
  const { userData } = useAuthStore();

  if (userData?.role === "LABORAN") {
    return (
      <div className="flex min-h-[215px] w-full flex-row justify-between space-x-4 rounded-3xl bg-white p-5">
        <div className="flex min-w-0 max-w-[593px] flex-1 flex-col justify-between space-y-4">
          <p className="text-[24px] font-bold text-black xl:text-[30px]">
            Ingin menambahkan praktikum baru? Klik tombol di bawah ini untuk
            memulai.
          </p>
          <Link
            href={"praktikum/tambah-praktikum"}
            className="flex h-[54px] w-[200px] shrink-0 flex-row items-center justify-center rounded-[30px] bg-[#3272CA] text-white"
          >
            Tambah Praktikum
          </Link>
        </div>
        <div className="relative h-[170px] w-[180px] shrink-0 self-end xl:w-[300px]">
          <Image
            src={"/praktikum.png"}
            alt="illustration"
            fill
            style={{ objectFit: "contain" }}
            className="bg-re self-end"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-[215px] w-full flex-row justify-between space-x-4 rounded-3xl bg-white p-5">
        <div className="flex min-w-0 max-w-[593px] flex-1 flex-col justify-between space-y-4">
          <p className="text-[24px] font-bold text-black xl:text-[30px]">
            {userData?.role === "DOSEN"
              ? "Berikut adalah daftar mata kuliah praktikum yang Anda ampu"
              : "Berikut adalah daftar kelas praktikum anda"}
          </p>
        </div>
        <div className="relative h-[170px] w-[180px] shrink-0 self-end xl:w-[300px]">
          <Image
            src={"/praktikum.png"}
            alt="illustration"
            fill
            style={{ objectFit: "contain" }}
            className="bg-re self-end"
          />
        </div>
      </div>
    );
  }
}
