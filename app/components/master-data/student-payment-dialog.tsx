import {
  IAvailableClass,
  IGetActivationResponseBody,
  IStudentActivations,
} from "@/app/interfaces/activation/activation.interface";
import useActivationStore from "@/app/store/useActivationStore";
import { formatDay } from "@/app/utils/day";
import { activationSubjectName, summarizePayment } from "@/app/utils/payment";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

interface StudentPaymentDialogProps {
  student?: IStudentActivations;
  onClose: () => void;
}

export default function StudentPaymentDialog({
  student,
  onClose,
}: StudentPaymentDialogProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<IAvailableClass | null>(
    null,
  );
  const [dialogError, setDialogError] = useState<string>("");
  const [notice, setNotice] = useState<string>("");

  const { updatePaymentStatus, updateStudentClass, isLoading } =
    useActivationStore();

  const editing = student?.activations.find(
    (activation) => activation.id === editingId,
  );

  const openEdit = (activation: IGetActivationResponseBody) => {
    setPaymentStatus(activation.status);
    setSelectedClass(
      activation.registered_class
        ? (activation.available_classes.find(
            (c) => c.id === activation.registered_class!.id,
          ) ?? null)
        : null,
    );
    setDialogError("");
    setNotice("");
    setEditingId(activation.id);
  };

  const finish = (successMessage: string) => {
    setEditingId(null);
    setNotice(successMessage);
  };

  const fail = (errorMessage: string) => {
    setDialogError(errorMessage);
  };

  const handleSave = async () => {
    if (!editing) return;

    const currentClass = editing.registered_class;
    const statusChanged = paymentStatus !== editing.status;

    if (!currentClass) {
      if (!statusChanged && !selectedClass) {
        fail("Tidak ada perubahan yang perlu disimpan.");
        return;
      }

      if (paymentStatus && !selectedClass) {
        fail(
          "Geser tombol ke Sudah Bayar dan pilih kelas praktikum terlebih dahulu!",
        );
        return;
      }

      await updatePaymentStatus(editing.id, paymentStatus, selectedClass?.id);

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
      await updateStudentClass(editing.id, selectedClass!.id);

      const { error } = useActivationStore.getState();

      if (error) return fail(error);
    }

    if (statusChanged) {
      await updatePaymentStatus(editing.id, paymentStatus);

      const { error } = useActivationStore.getState();

      if (error) return fail(error);
    }

    const { message: storeMessage } = useActivationStore.getState();

    return finish(storeMessage ?? "Berhasil");
  };

  const summary = student ? summarizePayment(student) : null;

  return (
    <Dialog
      onClose={onClose}
      open={student !== undefined}
      className={"relative z-50 h-full w-full"}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex h-full w-screen items-center justify-center p-4">
        <DialogPanel
          className={`flex max-h-[85vh] flex-col space-y-4 overflow-y-auto rounded-2xl bg-white p-10 ${editing ? "w-[500px]" : "w-[680px]"}`}
        >
          {student && !editing && (
            <>
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Status Pembayaran Mahasiswa
              </DialogTitle>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-row space-x-12">
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-[#5E6278]">NIM</p>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {student.nim}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-[#5E6278]">
                      Nama Lengkap
                    </p>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {student.student}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center space-x-3">
                  <p
                    className={`h-fit w-fit rounded-md px-3 py-2 text-sm font-semibold ${summary?.className}`}
                  >
                    {summary?.label}
                  </p>
                  <p className="text-sm font-semibold text-[#5E6278]">
                    {student.paid} dari {student.activations.length} mata kuliah
                    sudah lunas
                  </p>
                </div>
                {notice && (
                  <p className="rounded-xl bg-[#E8FFF3] p-3 text-sm font-semibold text-[#50CD89]">
                    {notice}
                  </p>
                )}
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-row px-4 text-xs font-bold text-[#5E6278]">
                    <p className="w-5/12">Mata Kuliah</p>
                    <p className="flex w-2/12 justify-center">Kelas</p>
                    <p className="flex w-3/12 justify-center">
                      Status Pembayaran
                    </p>
                    <p className="w-2/12"></p>
                  </div>
                  {student.activations.map((activation) => (
                    <div
                      key={activation.id}
                      className="flex flex-row items-center rounded-2xl border-2 border-[#F1F1F2] px-4 py-3 text-sm font-semibold text-[#5E6278]"
                    >
                      <div className="flex w-5/12 flex-col">
                        <p className="font-bold text-[#1D1D1D]">
                          {activationSubjectName(activation)}
                        </p>
                        {activation.subjects[0] && (
                          <p className="text-xs">
                            Semester {activation.subjects[0].semester}
                          </p>
                        )}
                      </div>
                      <p className="flex w-2/12 justify-center">
                        {activation.registered_class
                          ? activation.registered_class.name
                          : "-"}
                      </p>
                      <p
                        className={`flex h-fit w-3/12 justify-center rounded-md p-2 ${activation.status ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#F1F1F2]"}`}
                      >
                        {activation.status ? "Sudah Bayar" : "Belum Bayar"}
                      </p>
                      <div className="flex w-2/12 justify-end">
                        <button
                          onClick={() => openEdit(activation)}
                          aria-label={`Ubah ${activationSubjectName(activation)}`}
                          className="h-fit w-fit rounded-full border-2 border-[#BFD9EF] px-4 py-2 text-xs font-semibold text-[#3272CA]"
                        >
                          Ubah
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-full bg-[#D2E3F1] p-4 font-semibold text-[#3272CA]"
              >
                Tutup
              </button>
            </>
          )}
          {student && editing && (
            <>
              <button
                onClick={() => setEditingId(null)}
                className="flex w-fit flex-row items-center space-x-1 text-sm font-semibold text-[#3272CA]"
              >
                <Image
                  src={"/down-blue.png"}
                  alt="kembali"
                  width={16}
                  height={16}
                  className="rotate-90"
                />
                <span>Kembali</span>
              </button>
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Ubah Data Aktivasi Mahasiswa
              </DialogTitle>
              <div className="flex h-full w-full flex-col justify-between space-y-8">
                <div className="flex h-full w-full flex-col space-y-6">
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-[#5E6278]">NIM</p>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {student.nim}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-[#5E6278]">
                      Nama Lengkap
                    </p>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {student.student}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-[#5E6278]">
                      Mata Kuliah
                    </p>
                    <p className="text-sm font-bold text-[#1D1D1D]">
                      {activationSubjectName(editing)}
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
                    {editing.registered_class && (
                      <p className="mt-1 text-xs text-[#5E6278]">
                        Kelas sekarang:{" "}
                        <span className="font-bold text-[#1D1D1D]">
                          {editing.registered_class.name}
                        </span>
                      </p>
                    )}
                    <Listbox value={selectedClass} onChange={setSelectedClass}>
                      <ListboxButton className="mt-2 flex w-full flex-row items-center justify-between rounded-2xl border-2 border-[#BFD9EF] p-3 text-left text-sm font-semibold text-[#3272CA]">
                        <span>
                          {selectedClass
                            ? `Kelas ${selectedClass.name} — ${formatDay(selectedClass.day)}, ${selectedClass.session_time}`
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
                        {editing.available_classes.length === 0 && (
                          <p className="p-2 text-sm text-[#5E6278]">
                            Belum ada kelas untuk mata kuliah ini.
                          </p>
                        )}
                        {editing.available_classes.map((availableClass) => {
                          const isCurrent =
                            editing.registered_class?.id === availableClass.id;

                          return (
                            <ListboxOption
                              key={availableClass.id}
                              value={availableClass}
                              disabled={availableClass.is_full && !isCurrent}
                              className="cursor-pointer rounded-xl p-2 text-sm font-semibold text-[#1D1D1D] data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40 data-[focus]:bg-[#D2E3F1]"
                            >
                              Kelas {availableClass.name} —{" "}
                              {formatDay(availableClass.day)},{" "}
                              {availableClass.session_time} (
                              {availableClass.registered_students}/
                              {availableClass.quota})
                              {isCurrent && " — kelas sekarang"}
                              {availableClass.is_full &&
                                !isCurrent &&
                                " — Penuh"}
                            </ListboxOption>
                          );
                        })}
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
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
