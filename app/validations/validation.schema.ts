import { z } from "zod";

export const loginSchema = z.object({
  nim: z.string().trim().min(1, "NIM wajib diisi!"),
  password: z.string().min(1, "Password wajib diisi!"),
});

export const addClassSchema = z.object({
  name: z
    .string()
    .trim()
    .max(1, "Class name maximum character is 1!")
    .min(1, "Class name can't be empty!"),
  quota: z
    .number()
    .int("Quota must be an integer")
    .positive("Quota must be greater than 0"),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]),
  startAt: z
    .string()
    .trim()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format (HH:mm)"),
  endAt: z
    .string()
    .trim()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format (HH:mm)"),
  room: z.enum(["PSI", "SBTI"]),
});
