"use client";

import AnnouncementTypeDropdown from "@/app/components/pengumuman/announcement-type-dropdown";
import ErrorDialog from "@/app/components/error-dialog";
import SuccessDialog from "@/app/components/success-dialog";
import { useState } from "react";
import AddPengumumanTitle from "@/app/components/pengumuman/add-pengumuman/add-pengumuman-title";
import {
  AnnouncementTypeEnum,
  IAddAnnouncementRequestBody,
} from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";

const MAX_BODY_LENGTH = 200;
const MAX_TITLE_LENGTH = 150;

const emptyAnnouncement: IAddAnnouncementRequestBody = {
  type: AnnouncementTypeEnum.BASIC,
  title: "",
  body: "",
};

export default function Pengumuman() {
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [announcement, setAnnouncement] =
    useState<IAddAnnouncementRequestBody>(emptyAnnouncement);

  const { isLoading, addAnnouncement } = useAnnouncementStore();

  const handleValueChange = (
    field: keyof IAddAnnouncementRequestBody,
    value: any,
  ) => {
    setAnnouncement((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormError("");
  };

  const resetAnnouncement = () => {
    setAnnouncement(emptyAnnouncement);
    setFormError("");
  };

  const handleAddNewAnnouncement = async () => {
    const title = announcement.title.trim();
    const body = announcement.body.trim();

    if (title === "") {
      setFormError("Judul pengumuman wajib diisi!");
      return;
    }

    if (body === "") {
      setFormError("Deskripsi pengumuman wajib diisi!");
      return;
    }

    if (!announcement.type) {
      setFormError("Jenis pengumuman wajib dipilih!");
      return;
    }

    const isSuccess = await addAnnouncement({
      type: announcement.type,
      title,
      body,
    });

    const { error, message } = useAnnouncementStore.getState();

    if (!isSuccess) {
      setDialogMessage(error ?? "Gagal menerbitkan pengumuman");
      setErrorDialogOpen(true);
      return;
    }

    resetAnnouncement();
    setDialogMessage(message ?? "Pengumuman berhasil diterbitkan");
    setSuccessDialogOpen(true);
  };

  return (
    <div className="flex h-full w-full flex-col space-y-10">
      <AddPengumumanTitle />
      <div className="flex h-screen w-full flex-col space-y-10 overflow-auto overscroll-contain rounded-[20px] bg-white p-5">
        <p className="text-[22px] font-bold text-[#1D1D1D]">Buat Pengumuman</p>
        <div className="w-full space-y-3">
          <label className="text-base font-semibold text-[#5E6278]">
            Judul Pengumuman{" "}
            <span className="text-xs font-normal text-[#5E6278]/75">
              (maks: {MAX_TITLE_LENGTH} karakter)
            </span>
          </label>
          <input
            required
            className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
            placeholder="Judul pengumuman"
            maxLength={MAX_TITLE_LENGTH}
            onChange={(e) => handleValueChange("title", e.target.value)}
            value={announcement.title ?? ""}
          />
        </div>
        <div className="h-[85px]">
          <AnnouncementTypeDropdown
            onAnnouncementTypeChange={(value) =>
              handleValueChange("type", value)
            }
            value={announcement.type}
          />
        </div>
        <div className="w-full space-y-3">
          <label className="text-base font-semibold text-[#5E6278]">
            Deskripsi Pengumuman{" "}
            <span className="text-xs font-normal text-[#5E6278]/75">
              (maks: {MAX_BODY_LENGTH} karakter)
            </span>
          </label>
          <textarea
            required
            className="h-[140px] w-full resize-none rounded-2xl bg-[#F5F5F5] pl-5 pt-5 placeholder:text-base placeholder:font-semibold placeholder:text-[#1D1D1D]/30 focus:outline-[#3272CA]"
            placeholder="Deskripsi pengumuman"
            maxLength={MAX_BODY_LENGTH}
            inputMode="text"
            onChange={(e) => handleValueChange("body", e.target.value)}
            value={announcement.body ?? ""}
          />
          <p className="text-right text-xs font-semibold text-[#5E6278]/75">
            {announcement.body.length}/{MAX_BODY_LENGTH}
          </p>
        </div>
        {formError && (
          <p className="text-sm font-semibold text-[#F1416C]">{formError}</p>
        )}
        <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/30" />
        <div className="flex w-full flex-row justify-end space-x-6">
          <button
            onClick={resetAnnouncement}
            disabled={isLoading}
            className="rounded-full bg-[#FFD9D9] px-[16px] py-[8px] text-[16px] font-semibold text-[#FE2F60] disabled:opacity-50"
          >
            Hapus
          </button>
          <button
            onClick={handleAddNewAnnouncement}
            disabled={isLoading}
            className="rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:opacity-50"
          >
            {!isLoading ? (
              "Simpan"
            ) : (
              <span className="loading loading-dots loading-sm" />
            )}
          </button>
        </div>
      </div>
      <SuccessDialog
        dialogOpen={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        title={dialogMessage}
      />
      <ErrorDialog
        dialogOpen={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        title={dialogMessage}
      />
    </div>
  );
}
