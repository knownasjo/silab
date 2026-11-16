import {
  ActivityActorRole,
  ActivityGroup,
  IActivityActor,
  IActivityFilters,
  IActivityResponseBody,
} from "../interfaces/activity/activity.interface";
import { IPeriodResponseBody } from "../interfaces/period/period.interface";

export const MAX_KEYWORD_LENGTH = 100;

export const EMPTY_ACTIVITY_FILTERS: IActivityFilters = {
  periodId: "",
  group: "",
  from: "",
  to: "",
  q: "",
};

export const ACTIVITY_GROUPS: { value: ActivityGroup; label: string }[] = [
  { value: "LOGIN", label: "Login" },
  { value: "PAYMENT", label: "Pembayaran" },
  { value: "MEETING", label: "Pertemuan" },
  { value: "ATTENDANCE", label: "Presensi" },
  { value: "CLASS", label: "Kelas" },
  { value: "SESSION", label: "Jam Sesi" },
  { value: "SUBJECT", label: "Mata Kuliah" },
  { value: "ANNOUNCEMENT", label: "Pengumuman" },
  { value: "ASSISTANT", label: "Asisten" },
  { value: "ACCOUNT", label: "Akun" },
  { value: "PERIOD", label: "Periode Akademik" },
];

const ROLE_LABELS: Record<ActivityActorRole, string> = {
  LABORAN: "Laboran",
  DOSEN: "Dosen",
  ASISTEN: "Asisten",
  TERMINAL: "Lewat terminal",
};

const TIME_ZONE = "Asia/Jakarta";

export const periodOptionLabel = (period: IPeriodResponseBody) =>
  period.isActive ? `${period.name} (aktif)` : period.name;

export const actorDetail = (actor: IActivityActor) =>
  actor.role === "TERMINAL"
    ? null
    : [actor.nim, ROLE_LABELS[actor.role]].filter(Boolean).join(" · ");

export const formatActivityDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatClock = (date: string) =>
  new Date(date).toLocaleTimeString("id-ID", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatActivityTime = (activity: IActivityResponseBody) =>
  activity.attempts > 1 && activity.updatedAt
    ? `${formatClock(activity.createdAt)}–${formatClock(activity.updatedAt)}`
    : formatClock(activity.createdAt);

export const activityChange = (activity: IActivityResponseBody) =>
  activity.action === "LOGIN_FAILED"
    ? `Gagal masuk ${activity.attempts} kali`
    : (activity.change ?? "–");

export const isCompleteDate = (value: string) =>
  value === "" || /^[1-9]\d{3}-\d{2}-\d{2}$/.test(value);

export const activityDateError = (filters: IActivityFilters) =>
  filters.from && filters.to && filters.from > filters.to
    ? "Tanggal awal tidak boleh setelah tanggal akhir."
    : null;

export const hasActivityFilters = ({
  periodId,
  group,
  from,
  to,
  q,
}: IActivityFilters) => [periodId, group, from, to, q].some(Boolean);
