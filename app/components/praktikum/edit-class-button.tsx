"use client";

import { FormEvent, useCallback, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ClassFormFields, {
  ClassForm,
  validateClassForm,
} from "@/app/components/praktikum/class-form-fields";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import { IGetClassByIdResponseBody } from "@/app/interfaces/class/class.interface";
import useClassStore from "@/app/store/useClassStore";
import useSessionStore from "@/app/store/useSessionStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";

interface EditClassButtonProps {
  data: IGetClassByIdResponseBody;
  onSaved: (message: string) => void;
}

const formOf = (data: IGetClassByIdResponseBody): ClassForm => ({
  name: data.name,
  quota: String(data.quota),
  day: data.day,
  room: data.room,
  sessionId: data.sessionId ?? "",
});

export default function EditClassButton({
  data,
  onSaved,
}: EditClassButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ClassForm>(() => formOf(data));
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { updateClass } = useClassStore();
  const { sessionsData, isLoaded, getSessions, refreshSessions } =
    useSessionStore();

  useRealtimeEvents(({ type }) => {
    if (isOpen && ["ready", "session"].includes(type)) refreshSessions();
  });

  const updateForm = useCallback((key: keyof ClassForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFeedback(null);
  }, []);

  const open = () => {
    setForm(formOf(data));
    setFeedback(null);
    setIsOpen(true);
    getSessions();
  };

  const close = () => {
    if (!isSaving) setIsOpen(false);
  };

  const initial = formOf(data);
  const isUnchanged = (Object.keys(initial) as (keyof ClassForm)[]).every(
    (key) => initial[key] === form[key],
  );
  const isRescheduled =
    form.day !== initial.day || form.sessionId !== initial.sessionId;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const problem = validateClassForm(form);

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    if (Number(form.quota) < data.participants) {
      setFeedback({
        ok: false,
        message: `Kuota tidak boleh kurang dari jumlah peserta (${data.participants}).`,
      });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await updateClass(data.id, {
      name: form.name,
      quota: Number(form.quota),
      day: form.day,
      room: form.room,
      sessionId: form.sessionId,
    });

    setIsSaving(false);

    if (!result.ok) {
      setFeedback(result);
      return;
    }

    setIsOpen(false);
    onSaved(result.message);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA]"
      >
        Ubah Kelas
      </button>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[90vh] w-[1100px] max-w-[95vw] flex-col space-y-6 overflow-y-auto rounded-2xl bg-white p-10">
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Ubah Kelas
              </DialogTitle>
              <p className="text-sm font-semibold text-[#5E6278]">
                {data.subject_name} — Kelas {data.name}. Mata kuliah tidak bisa
                diubah.
              </p>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6"
            >
              <ClassFormFields
                form={form}
                sessions={sessionsData}
                sessionsLoaded={isLoaded}
                currentSessionId={data.sessionId}
                onChange={updateForm}
              />
              {data.participants > 0 && (
                <p className="text-sm font-semibold text-[#5E6278]">
                  Kuota minimal {data.participants}, sesuai jumlah peserta
                  sekarang.
                </p>
              )}
              {isRescheduled && data.meetings > 0 && (
                <p className="text-sm font-semibold text-[#5E6278]">
                  Jadwal baru berlaku untuk pertemuan berikutnya. Presensi yang
                  sudah tercatat tetap tersimpan.
                </p>
              )}
              <FeedbackBox feedback={feedback} />
              <div className="flex w-full flex-row justify-end space-x-4">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUnchanged}
                  className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <span className="loading loading-dots loading-sm" />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
