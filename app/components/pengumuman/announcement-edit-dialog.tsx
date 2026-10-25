"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import AnnouncementAudienceField from "./announcement-audience-field";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import {
  AnnouncementTypeEnum,
  IGetAllAnnouncementsResponseBody,
} from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import {
  ANNOUNCEMENT_GONE,
  ANNOUNCEMENT_TYPES,
  AnnouncementForm,
  MAX_BODY_LENGTH,
  MAX_TITLE_LENGTH,
  tidyAnnouncementForm,
  validateAnnouncementForm,
} from "@/app/utils/announcement";

const formOf = (
  announcement: IGetAllAnnouncementsResponseBody,
): AnnouncementForm => ({
  type: announcement.type ?? AnnouncementTypeEnum.BASIC,
  title: announcement.title,
  body: announcement.body,
  audience:
    announcement.forAll === false
      ? announcement.subjects.map((subject) => subject.id)
      : null,
});

const isUnchanged = (form: AnnouncementForm, saved: AnnouncementForm) => {
  const next = tidyAnnouncementForm(form);
  const before = tidyAnnouncementForm(saved);
  const nextIds = next.subjectIds ?? [];
  const beforeIds = before.subjectIds ?? [];

  return (
    next.title === before.title &&
    next.body === before.body &&
    next.type === before.type &&
    nextIds.length === beforeIds.length &&
    nextIds.every((id) => beforeIds.includes(id))
  );
};

interface AnnouncementEditDialogProps {
  announcement: IGetAllAnnouncementsResponseBody;
  isGone: boolean;
  onClose: () => void;
  onSaved: (message: string) => void;
}

export default function AnnouncementEditDialog({
  announcement,
  isGone,
  onClose,
  onSaved,
}: AnnouncementEditDialogProps) {
  const { updateAnnouncement } = useAnnouncementStore();
  const [form, setForm] = useState<AnnouncementForm>(() =>
    formOf(announcement),
  );
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateForm = <K extends keyof AnnouncementForm>(
    key: K,
    value: AnnouncementForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFeedback(null);
  };

  const close = () => {
    if (!isSaving) onClose();
  };

  const handleUpdate = async () => {
    const problem =
      validateAnnouncementForm(form) ??
      (isUnchanged(form, formOf(announcement))
        ? "Tidak ada perubahan yang perlu disimpan."
        : null);

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await updateAnnouncement(
      announcement.id,
      tidyAnnouncementForm(form),
    );

    setIsSaving(false);

    if (result.ok) {
      onSaved(result.message);
      return;
    }

    setFeedback(result);
  };

  return (
    <Dialog open onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="flex max-h-[85vh] w-[560px] max-w-[95vw] flex-col space-y-5 overflow-y-auto rounded-2xl bg-white p-10">
          <DialogTitle className="font-bold text-[#1d1d1d]">
            Edit Pengumuman
          </DialogTitle>

          {isGone && (
            <FeedbackBox
              feedback={{
                ok: false,
                message: `${ANNOUNCEMENT_GONE} Isian di bawah tidak bisa disimpan, tetapi masih bisa disalin.`,
              }}
            />
          )}

          <fieldset
            disabled={isSaving}
            className="flex min-w-0 flex-col space-y-5"
          >
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="edit-announcement-title"
                className="text-sm font-semibold text-[#5E6278]"
              >
                Judul Pengumuman{" "}
                <span className="text-xs font-normal text-[#5E6278]/75">
                  (maks: {MAX_TITLE_LENGTH} karakter)
                </span>
              </label>
              <input
                id="edit-announcement-title"
                className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 focus:outline-[#3272CA]"
                maxLength={MAX_TITLE_LENGTH}
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
              />
              <p className="text-right text-xs font-semibold text-[#5E6278]/75">
                {form.title.length}/{MAX_TITLE_LENGTH}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-sm font-semibold text-[#5E6278]">
                Jenis Pengumuman
              </p>
              <Listbox
                value={form.type}
                onChange={(value) => updateForm("type", value)}
              >
                <ListboxButton className="flex h-[46px] w-full flex-row items-center justify-between rounded-2xl bg-[#F5F5F5] px-5 text-left font-semibold text-[#1D1D1D]">
                  {ANNOUNCEMENT_TYPES.find(
                    (option) => option.value === form.type,
                  )?.title ?? "Pengumuman"}
                  <Image
                    src={"/down.png"}
                    alt="chevron down"
                    width={20}
                    height={20}
                  />
                </ListboxButton>
                <ListboxOptions className="mt-1 w-[var(--button-width)] overflow-hidden rounded-2xl bg-[#F5F5F5]">
                  {ANNOUNCEMENT_TYPES.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer px-5 py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
                    >
                      {option.title}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>

            <AnnouncementAudienceField
              type={form.type}
              value={form.audience}
              onChange={(value) => updateForm("audience", value)}
            />

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="edit-announcement-body"
                className="text-sm font-semibold text-[#5E6278]"
              >
                Deskripsi Pengumuman{" "}
                <span className="text-xs font-normal text-[#5E6278]/75">
                  (maks: {MAX_BODY_LENGTH} karakter)
                </span>
              </label>
              <textarea
                id="edit-announcement-body"
                className="h-[220px] w-full resize-none rounded-2xl bg-[#F5F5F5] p-5 focus:outline-[#3272CA]"
                maxLength={MAX_BODY_LENGTH}
                value={form.body}
                onChange={(e) => updateForm("body", e.target.value)}
              />
              <p className="text-right text-xs font-semibold text-[#5E6278]/75">
                {form.body.length}/{MAX_BODY_LENGTH}
              </p>
            </div>
          </fieldset>

          {!isGone && <FeedbackBox feedback={feedback} />}

          <div className="flex flex-row justify-end space-x-3">
            <button
              type="button"
              onClick={close}
              disabled={isSaving}
              className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278] disabled:opacity-60"
            >
              {isGone ? "Tutup" : "Batal"}
            </button>
            {!isGone && (
              <button
                type="button"
                onClick={handleUpdate}
                disabled={isSaving}
                className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:opacity-60"
              >
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
