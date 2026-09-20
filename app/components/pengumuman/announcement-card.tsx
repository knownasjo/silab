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
  Menu,
  MenuButton,
  MenuItems,
} from "@headlessui/react";
import AnnouncementSettingsDropdownItem from "./announcement-settings-dropdown-item";
import Image from "next/image";
import { useState } from "react";
import {
  AnnouncementTypeEnum,
  IGetAllAnnouncementsResponseBody,
} from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";

interface AnnouncementCardProps {
  announcement: IGetAllAnnouncementsResponseBody;
}

const MAX_BODY_LENGTH = 200;
const MAX_TITLE_LENGTH = 150;

const typeOptions: { title: string; value: AnnouncementTypeEnum }[] = [
  { title: "Pengumuman", value: AnnouncementTypeEnum.BASIC },
  { title: "Pendaftaran Praktikum", value: AnnouncementTypeEnum.PRACTICUM },
  { title: "Pendaftaran Inhal", value: AnnouncementTypeEnum.INHALL },
  {
    title: "Pendaftaran Asisten Praktikum",
    value: AnnouncementTypeEnum.ASSISTANT,
  },
];

export default function AnnouncementCard({
  announcement,
}: AnnouncementCardProps) {
  const { updateAnnouncement, removeAnnouncement, isLoading } =
    useAnnouncementStore();

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const [title, setTitle] = useState<string>(announcement.title);
  const [body, setBody] = useState<string>(announcement.body);
  const [type, setType] = useState<AnnouncementTypeEnum>(
    announcement.type ?? AnnouncementTypeEnum.BASIC,
  );

  const openEdit = () => {
    setTitle(announcement.title);
    setBody(announcement.body);
    setType(announcement.type ?? AnnouncementTypeEnum.BASIC);
    setFormError("");
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (title.trim() === "") {
      setFormError("Judul pengumuman wajib diisi!");
      return;
    }

    if (body.trim() === "") {
      setFormError("Deskripsi pengumuman wajib diisi!");
      return;
    }

    const isSuccess = await updateAnnouncement(announcement.id, {
      type,
      title: title.trim(),
      body: body.trim(),
    });

    if (!isSuccess) {
      setFormError(
        useAnnouncementStore.getState().error ?? "Gagal memperbarui pengumuman",
      );
      return;
    }

    setIsEditOpen(false);
  };

  const handleDelete = async () => {
    const isSuccess = await removeAnnouncement(announcement.id);

    if (!isSuccess) {
      setFormError(
        useAnnouncementStore.getState().error ?? "Gagal menghapus pengumuman",
      );
      return;
    }

    setIsDeleteOpen(false);
  };

  return (
    <div className="flex w-full flex-row space-x-3">
      <div className="flex h-[210px] w-full flex-col space-y-8 rounded-2xl bg-white p-8 text-[#1d1d1d]">
        <div className="flex flex-col">
          <p className="text-[22px] font-bold">{announcement.title}</p>
          <p className="text-[16px] font-light">
            {new Date(announcement.created_at).toLocaleString("id-ID")} oleh{" "}
            {announcement.author}
          </p>
        </div>
        <p className="text-[18px] font-semibold">{announcement.body}</p>
      </div>
      <Menu>
        <MenuButton className="relative h-[24px] w-[24px]">
          <Image
            src={"/dots-vertical.png"}
            alt="announcement settings"
            className="static"
            style={{ objectFit: "contain" }}
            fill
            priority
          />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className={`flex w-[220px] flex-col space-y-2 rounded-2xl bg-white p-4 shadow-[#1D1D1D]/10 drop-shadow-md`}
        >
          <AnnouncementSettingsDropdownItem
            hoverIcon="/details-hovered.png"
            icon="/details.png"
            title="Lihat Detail"
            href={`/dashboard/pengumuman/${announcement.id}`}
          />
          <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
          <AnnouncementSettingsDropdownItem
            hoverIcon="/edit-hovered.png"
            icon="/edit.png"
            title="Edit"
            onClick={openEdit}
          />
          <div className="h-[1px] w-full bg-[#1D1D1D]/10" />
          <AnnouncementSettingsDropdownItem
            hoverIcon="/delete-hovered.png"
            icon="/delete.png"
            title="Hapus"
            danger
            onClick={() => {
              setFormError("");
              setIsDeleteOpen(true);
            }}
          />
        </MenuItems>
      </Menu>

      <Dialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex max-h-[85vh] w-[520px] flex-col space-y-5 overflow-y-auto rounded-2xl bg-white p-8">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Edit Pengumuman
            </DialogTitle>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-[#5E6278]">
                Judul Pengumuman
              </label>
              <input
                className="h-[46px] w-full rounded-2xl bg-[#F5F5F5] px-5 focus:outline-[#3272CA]"
                maxLength={MAX_TITLE_LENGTH}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setFormError("");
                }}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-[#5E6278]">
                Jenis Pengumuman
              </label>
              <Listbox value={type} onChange={setType}>
                <ListboxButton className="flex h-[46px] w-full flex-row items-center justify-between rounded-2xl bg-[#F5F5F5] px-5 text-left font-semibold text-[#1D1D1D]">
                  {typeOptions.find((option) => option.value === type)?.title ??
                    "Pengumuman"}
                  <Image
                    src={"/down.png"}
                    alt="chevron down"
                    width={20}
                    height={20}
                  />
                </ListboxButton>
                <ListboxOptions className="mt-1 w-[var(--button-width)] rounded-2xl bg-[#F5F5F5] p-2">
                  {typeOptions.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer rounded-xl px-3 py-2 font-semibold text-[#1D1D1D] data-[focus]:bg-[#3272CA] data-[focus]:text-white"
                    >
                      {option.title}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-[#5E6278]">
                Deskripsi Pengumuman{" "}
                <span className="text-xs font-normal text-[#5E6278]/75">
                  (maks: {MAX_BODY_LENGTH} karakter)
                </span>
              </label>
              <textarea
                className="h-[140px] w-full resize-none rounded-2xl bg-[#F5F5F5] p-5 focus:outline-[#3272CA]"
                maxLength={MAX_BODY_LENGTH}
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                  setFormError("");
                }}
              />
              <p className="text-right text-xs font-semibold text-[#5E6278]/75">
                {body.length}/{MAX_BODY_LENGTH}
              </p>
            </div>

            {formError && (
              <p className="text-sm font-semibold text-[#F1416C]">
                {formError}
              </p>
            )}

            <div className="flex flex-row justify-end space-x-4">
              <button
                onClick={() => setIsEditOpen(false)}
                disabled={isLoading}
                className="rounded-full bg-[#F1F1F2] px-5 py-3 font-semibold text-[#5E6278] disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="rounded-full bg-[#D2E3F1] px-5 py-3 font-semibold text-[#3272CA] disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex w-[460px] flex-col space-y-5 rounded-2xl bg-white p-8">
            <DialogTitle className="font-bold text-[#1d1d1d]">
              Hapus Pengumuman
            </DialogTitle>
            <p className="text-sm font-semibold text-[#5E6278]">
              Pengumuman{" "}
              <span className="font-bold text-[#1D1D1D]">
                {announcement.title}
              </span>{" "}
              akan dihapus dari daftar. Lanjutkan?
            </p>

            {formError && (
              <p className="text-sm font-semibold text-[#F1416C]">
                {formError}
              </p>
            )}

            <div className="flex flex-row justify-end space-x-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                disabled={isLoading}
                className="rounded-full bg-[#F1F1F2] px-5 py-3 font-semibold text-[#5E6278] disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="rounded-full bg-[#FFD9D9] px-5 py-3 font-semibold text-[#FE2F60] disabled:opacity-50"
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
