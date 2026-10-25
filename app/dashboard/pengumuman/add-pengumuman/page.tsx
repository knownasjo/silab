"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import AnnouncementTypeDropdown from "@/app/components/pengumuman/announcement-type-dropdown";
import AnnouncementAudienceField from "@/app/components/pengumuman/announcement-audience-field";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import {
  NEED_TARGET_SUBJECT,
  targetSubjectIds,
} from "@/app/utils/announcement";
import { useEffect, useState } from "react";
import { AnnouncementTypeEnum } from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import useAuthStore from "@/app/store/useAuthStore";

const MAX_BODY_LENGTH = 1000;
const MAX_TITLE_LENGTH = 150;
const DRAFT_KEY = "draf-pengumuman";

type AnnouncementForm = {
  type: AnnouncementTypeEnum;
  title: string;
  body: string;
  audience: string[] | null;
};

const emptyForm: AnnouncementForm = {
  type: AnnouncementTypeEnum.BASIC,
  title: "",
  body: "",
  audience: null,
};

const isEmptyForm = (form: AnnouncementForm) =>
  form.type === emptyForm.type &&
  form.title === "" &&
  form.body === "" &&
  form.audience === null;

const readDraft = (userId: string): AnnouncementForm | null => {
  try {
    const draft = JSON.parse(
      sessionStorage.getItem(`${DRAFT_KEY}:${userId}`) ?? "null",
    );

    if (!draft) return null;

    return {
      type: Object.values(AnnouncementTypeEnum).includes(draft.type)
        ? draft.type
        : emptyForm.type,
      title: typeof draft.title === "string" ? draft.title : "",
      body: typeof draft.body === "string" ? draft.body : "",
      audience: Array.isArray(draft.audience)
        ? draft.audience.filter((id: unknown) => typeof id === "string")
        : null,
    };
  } catch {
    return null;
  }
};

const saveDraft = (userId: string, form: AnnouncementForm) => {
  try {
    if (isEmptyForm(form)) sessionStorage.removeItem(`${DRAFT_KEY}:${userId}`);
    else sessionStorage.setItem(`${DRAFT_KEY}:${userId}`, JSON.stringify(form));
  } catch {}
};

const problemOf = (form: AnnouncementForm) => {
  if (form.title.trim() === "") return "Judul pengumuman wajib diisi!";
  if (form.body.trim() === "") return "Deskripsi pengumuman wajib diisi!";
  if (form.type === AnnouncementTypeEnum.BASIC && form.audience?.length === 0)
    return NEED_TARGET_SUBJECT;
  return null;
};

export default function Pengumuman() {
  const { userData, error: accountError } = useAuthStore();
  const { addAnnouncement } = useAnnouncementStore();
  const userId = userData?.id;

  const [form, setForm] = useState<AnnouncementForm>(
    () => (userId && readDraft(userId)) || emptyForm,
  );
  const [draftOwner, setDraftOwner] = useState(userId);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isClearOpen, setIsClearOpen] = useState(false);

  const isReady = !!userId && draftOwner === userId;
  const hasText = form.title.trim() !== "" || form.body.trim() !== "";

  useEffect(() => {
    if (!userId || draftOwner === userId) return;

    setForm(readDraft(userId) ?? emptyForm);
    setDraftOwner(userId);
  }, [userId, draftOwner]);

  useEffect(() => {
    if (userId && draftOwner === userId) saveDraft(userId, form);
  }, [userId, draftOwner, form]);

  const updateForm = <K extends keyof AnnouncementForm>(
    key: K,
    value: AnnouncementForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFeedback(null);
  };

  const clearForm = () => {
    setForm(emptyForm);
    setFeedback(null);
    setIsClearOpen(false);
  };

  const handleSave = async () => {
    const problem = problemOf(form);

    if (problem) {
      setFeedback({ ok: false, message: problem });
      return;
    }

    setIsSaving(true);
    setFeedback(null);

    const result = await addAnnouncement({
      type: form.type,
      title: form.title.trim(),
      body: form.body.trim(),
      subjectIds: targetSubjectIds(form.type, form.audience),
    });

    setIsSaving(false);
    setFeedback(result);

    if (result.ok) setForm(emptyForm);
  };

  if (userData && userData.role !== "LABORAN") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-base font-semibold text-[#5E6278]">
          Hanya laboran yang dapat membuat pengumuman.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-10">
      <p className="text-[32px] font-bold text-black">Buat Pengumuman</p>
      {!isReady ? (
        !accountError && (
          <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
        )
      ) : (
        <div className="flex w-full flex-col space-y-10 rounded-[20px] bg-white p-5">
          <fieldset
            disabled={isSaving}
            className="flex min-w-0 flex-col space-y-10"
          >
            <div className="w-full space-y-3">
              <label
                htmlFor="announcement-title"
                className="text-base font-semibold text-[#5E6278]"
              >
                Judul Pengumuman{" "}
                <span className="text-xs font-normal text-[#5E6278]/75">
                  (maks: {MAX_TITLE_LENGTH} karakter)
                </span>
              </label>
              <input
                id="announcement-title"
                required
                className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
                placeholder="Judul pengumuman"
                maxLength={MAX_TITLE_LENGTH}
                onChange={(e) => updateForm("title", e.target.value)}
                value={form.title}
              />
              <p className="text-right text-xs font-semibold text-[#5E6278]/75">
                {form.title.length}/{MAX_TITLE_LENGTH}
              </p>
            </div>
            <div className="h-[85px]">
              <AnnouncementTypeDropdown
                onAnnouncementTypeChange={(value) => updateForm("type", value)}
                value={form.type}
              />
            </div>
            <AnnouncementAudienceField
              type={form.type}
              value={form.audience}
              onChange={(value) => updateForm("audience", value)}
            />
            <div className="w-full space-y-3">
              <label
                htmlFor="announcement-body"
                className="text-base font-semibold text-[#5E6278]"
              >
                Deskripsi Pengumuman{" "}
                <span className="text-xs font-normal text-[#5E6278]/75">
                  (maks: {MAX_BODY_LENGTH} karakter)
                </span>
              </label>
              <textarea
                id="announcement-body"
                required
                className="h-[220px] w-full resize-none rounded-2xl bg-[#F5F5F5] px-5 pt-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
                placeholder="Deskripsi pengumuman"
                maxLength={MAX_BODY_LENGTH}
                inputMode="text"
                onChange={(e) => updateForm("body", e.target.value)}
                value={form.body}
              />
              <p className="text-right text-xs font-semibold text-[#5E6278]/75">
                {form.body.length}/{MAX_BODY_LENGTH}
              </p>
            </div>
          </fieldset>
          <FeedbackBox feedback={feedback} />
          <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/30" />
          <div className="flex w-full flex-row justify-end space-x-6">
            <button
              type="button"
              onClick={() => (hasText ? setIsClearOpen(true) : clearForm())}
              disabled={isSaving}
              className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Kosongkan
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:opacity-60"
            >
              {isSaving ? (
                <span className="loading loading-dots loading-sm" />
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </div>
      )}
      <Dialog
        open={isClearOpen}
        onClose={() => setIsClearOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex w-[500px] max-w-[95vw] flex-col space-y-5 rounded-2xl bg-white p-10">
            <div className="flex flex-col">
              <DialogTitle className="font-bold text-[#1d1d1d]">
                Kosongkan isian?
              </DialogTitle>
              <p className="text-sm font-semibold text-[#5E6278]">
                Judul dan deskripsi yang sudah diketik akan hilang.
              </p>
            </div>
            <div className="flex w-full flex-row justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsClearOpen(false)}
                className="rounded-full border-2 border-[#F1F1F2] px-[16px] py-[8px] text-[16px] font-semibold text-[#5E6278]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="rounded-full bg-[#F1416C] px-[16px] py-[8px] text-[16px] font-semibold text-white"
              >
                Kosongkan
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
