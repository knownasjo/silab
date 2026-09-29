import {
  AnnouncementType,
  AnnouncementTypeEnum,
} from "../interfaces/announcement/announcement.interface";

export const ANNOUNCEMENT_TYPES: AnnouncementType[] = [
  { title: "Pengumuman", value: AnnouncementTypeEnum.BASIC },
  { title: "Pendaftaran Praktikum", value: AnnouncementTypeEnum.PRACTICUM },
  { title: "Pendaftaran Inhal", value: AnnouncementTypeEnum.INHALL },
  {
    title: "Pendaftaran Asisten Praktikum",
    value: AnnouncementTypeEnum.ASSISTANT,
  },
];

export const announcementTypeTitle = (type?: AnnouncementTypeEnum | null) =>
  ANNOUNCEMENT_TYPES.find((option) => option.value === type)?.title ??
  "Pengumuman";

export const formatPostedAt = (date: string) =>
  new Date(date).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
