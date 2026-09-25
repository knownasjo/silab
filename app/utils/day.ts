export const DAY_LABELS: Record<string, string> = {
  MONDAY: "Senin",
  TUESDAY: "Selasa",
  WEDNESDAY: "Rabu",
  THURSDAY: "Kamis",
  FRIDAY: "Jumat",
};

export const formatDay = (day?: string | null): string =>
  day ? (DAY_LABELS[day] ?? day) : "";

export const DAY_GROUP_LABELS: Record<string, string> = {
  WEEKDAY: "Senin–Kamis",
  FRIDAY: "Jumat",
};

export const dayGroupOf = (day: string) =>
  day === "FRIDAY" ? "FRIDAY" : "WEEKDAY";
