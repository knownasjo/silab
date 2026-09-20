"use client";

import ErrorDialog from "@/app/components/error-dialog";
import SuccessDialog from "@/app/components/success-dialog";
import {
  IAvailableClass,
  IGetActivationResponseBody,
} from "@/app/interfaces/activation/activation.interface";
import useActivationStore from "@/app/store/useActivationStore";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
} from "@headlessui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export default function Pembayaran() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] =
    useState<IGetActivationResponseBody>();
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<IAvailableClass | null>(
    null,
  );
  const [dialogError, setDialogError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

  const {
    activationData,
    getAllActivations,
    updatePaymentStatus,
    updateStudentClass,
    isLoading,
    status,
    setStatusQuery,
    setNameQuery,
  } = useActivationStore();

  useEffect(() => {
    getAllActivations();
  }, [getAllActivations]);

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

  const openDialog = (student: IGetActivationResponseBody) => {
    setSelectedStudent(student);
    setPaymentStatus(student.status);

    const currentClass = student.registered_class
      ? (student.available_classes.find(
          (c) => c.id === student.registered_class!.id,
        ) ?? null)
      : null;

    setSelectedClass(currentClass);
    setDialogError("");
    setIsDialogOpen(true);
  };

  const finish = (successMessage: string) => {
    setIsDialogOpen(false);
    setMessage(successMessage);
    setSuccessDialogOpen(true);
  };

  const fail = (errorMessage: string) => {
    setDialogError(errorMessage);
  };

  const handleSave = async () => {
    if (!selectedStudent) return;

    const currentClass = selectedStudent.registered_class;
    const statusChanged = paymentStatus !== selectedStudent.status;

    if (!currentClass) {
      if (paymentStatus && !selectedClass) {
        fail(
          "Geser tombol ke Sudah Bayar dan pilih kelas praktikum terlebih dahulu!",
        );
        return;
      }

      await updatePaymentStatus(
        selectedStudent.id,
        paymentStatus,
        selectedClass?.id,
      );

      const { error, message: storeMessage } = useActivationStore.getState();

      if (error) return fail(error);

      return finish(storeMessage ?? "Berhasil");
    }

    const classChanged =
      selectedClass !== null && selectedClass.id !== currentClass.id;

    if (!classChanged && !statusChanged) {
      fail("Tidak ada perubahan yang perlu disimpan.");
      return;
    }

    if (classChanged) {
      await updateStudentClass(selectedStudent.id, selectedClass!.id);

      const { error } = useActivationStore.getState();

      if (error) return fail(error);
    }

    if (statusChanged) {
      await updatePaymentStatus(selectedStudent.id, paymentStatus);

      const { error } = useActivationStore.getState();

      if (error) return fail(error);
    }

    const { message: storeMessage } = useActivationStore.getState();

    return finish(storeMessage ?? "Berhasil");
  };

  return (
    <div className="flex h-full w-full flex-col space-y-[38px] overflow-auto overscroll-contain">
      <div className="flex h-fit w-full flex-row space-x-9">
        <div className="flex h-[200px] w-[300px] flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
          <h1 className="text-6xl font-bold text-[#FFBF01]">
            {activationData.filter((student) => student.status === false).length}
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
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${status === "" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Show All
          </button>
          <button
            onClick={() => setStatusQuery("true")}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${status === "true" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Sudah Bayar
          </button>
          <button
            onClick={() => setStatusQuery("false")}
            className={`h-fit w-fit rounded-full p-3 text-xs font-semibold ${status === "false" ? "bg-[#3272CA] text-white" : "border-2 border-[#BFD9EF] text-[#3272CA]"}`}
          >
            Belum Bayar
          </button>
        </div>
        <div className="flex w-full flex-col space-y-9">
          <div className="flex flex-row text-sm font-bold text-[#5E6278]">
            <p className="flex w-2/12 justify-center">NIM</p>
            <p className="flex w-3/12 justify-center">Nama</p>
            <p className="flex w-3/12 justify-center">Mata Kuliah</p>
            <p className="flex w-2/12 justify-center">Kelas</p>
            <p className="flex w-2/12 justify-center">Status Pembayaran</p>
            <p className="flex w-1/12 justify-center"></p>
          </div>
          {isLoading && activationData.length === 0 && (
            <p className="text-sm text-[#5E6278]">Memuat data...</p>
          )}
          {!isLoading && activationData.length === 0 && (
            <p className="text-sm text-[#5E6278]">Tidak ada data.</p>
          )}
          {activationData.map((student) => (
            <div
              key={student.id}
              className="flex flex-row text-sm font-semibold text-[#5E6278]"
            >
              <p className="flex w-2/12 justify-center">{student.nim}</p>
              <p className="flex w-3/12 justify-center">{student.student}</p>
              <div className="flex w-3/12 flex-col justify-center space-y-2">
                {student.subjects.map((subject) => (
                  <li key={subject.subject_name}>{subject.subject_name}</li>
                ))}
              </div>
              <p className="flex w-2/12 justify-center">
                {student.registered_class ? student.registered_class.name : "-"}
              </p>
              <p
                className={`flex h-fit w-2/12 justify-center rounded-md p-2 font-semibold ${student.status === false ? "bg-[#F1F1F2]" : "bg-[#E8FFF3] text-[#50CD89]"}`}
              >
                {student.status === true ? "Sudah Bayar" : "Belum Bayar"}
              </p>
              <button
                onClick={() => openDialog(student)}
                className="relative flex h-6 w-1/12 justify-center"
              >
                <Image
                  src={"/edit-blue.png"}
                  alt="action"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        className={"relative z-50 h-full w-full"}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[85vh] w-[500px] flex-col space-y-4 overflow-y-auto rounded-2xl bg-white p-10">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Ubah Data Aktivasi Mahasiswa
            </DialogTitle>
            <div className="flex h-full w-full flex-col justify-between space-y-8">
              <div className="flex h-full w-full flex-col space-y-6">
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">NIM</p>
                  <p className="text-sm font-bold text-[#1D1D1D]">
                    {selectedStudent?.nim}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">
                    Nama Lengkap
                  </p>
                  <p className="text-sm font-bold text-[#1D1D1D]">
                    {selectedStudent?.student}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">
                    Status Pembayaran
                  </p>
                  <div className="mt-2 flex flex-row items-center space-x-3">
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      Belum Bayar
                    </p>
                    <Switch
                      checked={paymentStatus}
                      onChange={setPaymentStatus}
                      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-[#D9D9D9] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-[#3272CA] data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-[white] shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                      />
                    </Switch>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      Sudah Bayar
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold text-[#5E6278]">
                    Kelas Praktikum
                  </p>
                  {selectedStudent?.registered_class && (
                    <p className="mt-1 text-xs text-[#5E6278]">
                      Kelas sekarang:{" "}
                      <span className="font-bold text-[#1D1D1D]">
                        {selectedStudent.registered_class.name}
                      </span>
                    </p>
                  )}
                  <Listbox value={selectedClass} onChange={setSelectedClass}>
                    <ListboxButton className="mt-2 flex w-full flex-row items-center justify-between rounded-2xl border-2 border-[#BFD9EF] p-3 text-left text-sm font-semibold text-[#3272CA]">
                      <span>
                        {selectedClass
                          ? `Kelas ${selectedClass.name} — ${selectedClass.day}, ${selectedClass.session_time}`
                          : "Pilih Kelas"}
                      </span>
                      <Image
                        src={"/down-blue.png"}
                        alt="chevron down"
                        width={20}
                        height={20}
                      />
                    </ListboxButton>
                    <ListboxOptions className="mt-1 w-full rounded-2xl border-2 border-[#BFD9EF] bg-white p-2">
                      {selectedStudent?.available_classes.length === 0 && (
                        <p className="p-2 text-sm text-[#5E6278]">
                          Belum ada kelas untuk mata kuliah ini.
                        </p>
                      )}
                      {selectedStudent?.available_classes.map(
                        (availableClass) => {
                          const isCurrent =
                            selectedStudent.registered_class?.id ===
                            availableClass.id;

                          return (
                            <ListboxOption
                              key={availableClass.id}
                              value={availableClass}
                              disabled={availableClass.is_full && !isCurrent}
                              className="cursor-pointer rounded-xl p-2 text-sm font-semibold text-[#1D1D1D] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[focus]:bg-[#D2E3F1]"
                            >
                              Kelas {availableClass.name} — {availableClass.day}
                              , {availableClass.session_time} (
                              {availableClass.registered_students}/
                              {availableClass.quota})
                              {isCurrent && " — kelas sekarang"}
                              {availableClass.is_full &&
                                !isCurrent &&
                                " — Penuh"}
                            </ListboxOption>
                          );
                        },
                      )}
                    </ListboxOptions>
                  </Listbox>
                </div>
                {dialogError && (
                  <p className="text-sm font-semibold text-[#F1416C]">
                    {dialogError}
                  </p>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full rounded-full bg-[#D2E3F1] p-4 font-semibold text-[#3272CA] disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <SuccessDialog
        dialogOpen={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        title={message}
      />
      <ErrorDialog
        dialogOpen={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        title={message}
      />
    </div>
  );
}
