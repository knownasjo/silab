"use client";

import StudentPaymentDialog from "@/app/components/master-data/student-payment-dialog";
import useActivationStore from "@/app/store/useActivationStore";
import {
  groupActivationsByStudent,
  isFullyPaid,
  summarizePayment,
} from "@/app/utils/payment";
import { Field, Input } from "@headlessui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";

export default function Pembayaran() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const {
    activationData,
    getAllActivations,
    refreshActivations,
    isLoading,
    status,
    setStatusQuery,
    setNameQuery,
  } = useActivationStore();

  useEffect(() => {
    getAllActivations();
  }, [getAllActivations]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "activation", "class"].includes(type)) refreshActivations();
  });

  const debouncedSetQuery = useMemo(() => {
    return debounce((val: string) => {
      setNameQuery(val);
    }, 400);
  }, [setNameQuery]);

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [debouncedSetQuery]);

  const students = useMemo(
    () => groupActivationsByStudent(activationData),
    [activationData],
  );

  const visibleStudents = students.filter((student) => {
    if (status === "true") return isFullyPaid(student);
    if (status === "false") return !isFullyPaid(student);
    return true;
  });

  const selectedStudent = students.find(
    (student) => student.user_id === selectedUserId,
  );

  return (
    <div className="flex h-full w-full flex-col space-y-[38px] overflow-auto overscroll-contain">
      <div className="flex h-fit w-full flex-row space-x-9">
        <div className="flex h-[200px] w-[300px] flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-6xl font-bold text-[#FFBF01]">
            {
              activationData.filter((student) => student.status === false)
                .length
            }
          </h1>
          <p className="text-base font-semibold text-white">
            Jumlah aktivasi mahasiswa yang{" "}
            <span className="font-extrabold text-[#FFBF01]">belum bayar</span>
          </p>
        </div>
        <div className="flex h-[200px] w-[300px] flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-6xl font-bold text-[#FFBF01]">
            {activationData.filter((student) => student.status === true).length}
          </h1>
          <p className="text-base font-semibold text-white">
            Jumlah aktivasi mahasiswa yang{" "}
            <span className="font-extrabold text-[#FFBF01]">sudah bayar</span>
          </p>
        </div>
      </div>
      <div className="relative h-fit w-full">
        <Field className={"h-12 w-full"}>
          <div className="absolute z-10 size-[24px] translate-x-2 translate-y-1/2">
            <Image
              src={"/search.png"}
              alt="search"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <Input
            className={
              "h-full w-full rounded-2xl pl-10 data-[focus]:outline-[#3272CA]"
            }
            placeholder="Cari Mahasiswa"
            onChange={(e) => debouncedSetQuery(e.target.value)}
          />
        </Field>
      </div>
      <div className="flex h-fit w-full flex-col space-y-14 rounded-2xl bg-white p-7">
        <div className="flex w-full flex-row space-x-3">
          <button
            onClick={() => setStatusQuery("")}
            className={`h-fit w-fit rounded-full border-2 p-3 text-xs font-semibold ${status === "" ? "border-[#3272CA] bg-[#3272CA] text-white" : "border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Show All
          </button>
          <button
            onClick={() => setStatusQuery("true")}
            className={`h-fit w-fit rounded-full border-2 p-3 text-xs font-semibold ${status === "true" ? "border-[#3272CA] bg-[#3272CA] text-white" : "border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Sudah Bayar
          </button>
          <button
            onClick={() => setStatusQuery("false")}
            className={`h-fit w-fit rounded-full border-2 p-3 text-xs font-semibold ${status === "false" ? "border-[#3272CA] bg-[#3272CA] text-white" : "border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Belum Bayar
          </button>
        </div>
        <div className="flex w-full flex-col space-y-9">
          <div className="flex flex-row text-sm font-bold text-[#5E6278]">
            <p className="flex w-2/12 justify-center">NIM</p>
            <p className="flex w-3/12 justify-center">Nama</p>
            <p className="flex w-2/12 justify-center">Mata Kuliah</p>
            <p className="flex w-3/12 justify-center">Status Pembayaran</p>
            <p className="flex w-2/12 justify-center"></p>
          </div>
          {isLoading && activationData.length === 0 && (
            <p className="text-sm text-[#5E6278]">Memuat data...</p>
          )}
          {!isLoading && visibleStudents.length === 0 && (
            <p className="text-sm text-[#5E6278]">Tidak ada data.</p>
          )}
          {visibleStudents.map((student) => {
            const summary = summarizePayment(student);

            return (
              <div
                key={student.user_id}
                onClick={() => setSelectedUserId(student.user_id)}
                className="flex cursor-pointer flex-row items-center rounded-xl py-2 text-sm font-semibold text-[#5E6278] hover:bg-[#F5F8FA]"
              >
                <p className="flex w-2/12 justify-center">{student.nim}</p>
                <p className="flex w-3/12 justify-center">{student.student}</p>
                <p className="flex w-2/12 justify-center">
                  {student.activations.length} mata kuliah
                </p>
                <p
                  className={`flex h-fit w-3/12 justify-center rounded-md p-2 font-semibold ${summary.className}`}
                >
                  {summary.label}
                </p>
                <div className="flex w-2/12 justify-center">
                  <button
                    aria-label={`Lihat pembayaran ${student.student}`}
                    className="h-fit w-fit rounded-full border-2 border-[#BFD9EF] px-4 py-2 text-xs font-semibold text-[#3272CA]"
                  >
                    Lihat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <StudentPaymentDialog
        key={selectedUserId ?? ""}
        student={selectedStudent}
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
}
