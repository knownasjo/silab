import {
  AnnouncementType,
  AnnouncementTypeEnum,
  IAddAnnouncementRequestBody,
  IGetAllAnnouncementsResponseBody,
} from "../interfaces/announcement/announcement.interface";

export const MAX_TITLE_LENGTH = 150;
export const MAX_BODY_LENGTH = 1000;
export const ANNOUNCEMENT_GONE = "Pengumuman ini sudah dihapus.";

export type AnnouncementForm = {
  type: AnnouncementTypeEnum;
  title: string;
  body: string;
  audience: string[] | null;
};

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
    "forAll" | "subjects" | "period"
  >,
) => {
  if (announcement.forAll !== false) return "Semua mahasiswa";

  const subjects = announcement.subjects?.length
    ? announcement.subjects.map((subject) => subject.subjectName).join(", ")
    : "mata kuliah yang sudah dihapus";

  return announcement.period
    ? `Mahasiswa ${subjects} (${announcement.period})`
    : `Mahasiswa ${subjects}`;
};

export const targetSubjectIds = (
  type: AnnouncementTypeEnum,
  audience: string[] | null,
) => (type === AnnouncementTypeEnum.BASIC && audience ? audience : []);

export const validateAnnouncementForm = (form: AnnouncementForm) => {
  if (form.title.trim() === "") return "Judul pengumuman wajib diisi!";
  if (form.body.trim() === "") return "Deskripsi pengumuman wajib diisi!";
  if (form.type === AnnouncementTypeEnum.BASIC && form.audience?.length === 0)
    return NEED_TARGET_SUBJECT;
  return null;
};

export const tidyAnnouncementForm = (
  form: AnnouncementForm,
): IAddAnnouncementRequestBody => ({
  type: form.type,
  title: form.title.trim(),
  body: form.body.trim(),
  subjectIds: targetSubjectIds(form.type, form.audience),
});
