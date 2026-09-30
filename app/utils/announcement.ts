import {
  AnnouncementType,
  AnnouncementTypeEnum,
  IGetAllAnnouncementsResponseBody,
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

export const NEED_TARGET_SUBJECT = "Pilih minimal satu mata kuliah tujuan.";

export const audienceLabel = (
  announcement: Pick<
    IGetAllAnnouncementsResponseBody,
    "for_all" | "subjects" | "period"
  >,
) => {
  if (announcement.for_all !== false) return "Semua mahasiswa";

  const subjects = announcement.subjects?.length
    ? announcement.subjects.map((subject) => subject.subject_name).join(", ")
    : "mata kuliah yang sudah dihapus";

  return announcement.period
    ? `Mahasiswa ${subjects} (${announcement.period})`
    : `Mahasiswa ${subjects}`;
};

export const targetSubjectIds = (
  type: AnnouncementTypeEnum,
  audience: string[] | null,
) => (type === AnnouncementTypeEnum.BASIC && audience ? audience : []);
