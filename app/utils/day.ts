export const DAY_LABELS: Record<string, string> = {
  MONDAY: "Senin",
  TUESDAY: "Selasa",
  WEDNESDAY: "Rabu",
  THURSDAY: "Kamis",
  FRIDAY: "Jumat",
};

export const formatDay = (day?: string | null): string =>
  day ? (DAY_LABELS[day] ?? day) : "";
