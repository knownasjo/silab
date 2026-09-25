"use client";

import { FormEvent, useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";

const ROLE_LABELS: Record<string, string> = {
  LABORAN: "Laboran",
  DOSEN: "Dosen",
  MAHASISWA: "Mahasiswa (asisten)",
};

const inputClassName =
  "h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA]";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col space-y-3">
      <label htmlFor={id} className="text-base font-semibold text-[#5E6278]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Profile() {
  const { userData, updateProfile, changePassword } = useAuthStore();

  const [fullname, setFullname] = useState<string>("");
  const [nameFeedback, setNameFeedback] = useState<Feedback>(null);
  const [isSavingName, setIsSavingName] = useState<boolean>(false);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordFeedback, setPasswordFeedback] = useState<Feedback>(null);
  const [isSavingPassword, setIsSavingPassword] = useState<boolean>(false);

  useEffect(() => {
    if (userData) setFullname(userData.name);
  }, [userData]);

  if (!userData) {
    return (
      <div className="w-full rounded-2xl bg-white p-5 text-[#5E6278]">
        Memuat profil...
      </div>
    );
  }

  const saveName = async (event: FormEvent) => {
    event.preventDefault();

    const name = fullname.trim().replace(/\s+/g, " ");

    if (name.length < 3 || name.length > 100) {
      setNameFeedback({
        ok: false,
        message: "Nama lengkap harus 3 sampai 100 karakter.",
      });
      return;
    }

    setIsSavingName(true);
    setNameFeedback(await updateProfile(name));
    setIsSavingName(false);
  };

  const savePassword = async (event: FormEvent) => {
    event.preventDefault();

    const problem = !oldPassword
      ? "Password lama wajib diisi."
      : password.length < 8
        ? "Password baru minimal 8 karakter."
        : password === oldPassword
          ? "Password baru harus berbeda dari password lama."
          : password !== confirmPassword
            ? "Konfirmasi password tidak sama."
            : null;

    if (problem) {
      setPasswordFeedback({ ok: false, message: problem });
      return;
    }

    setIsSavingPassword(true);
    const result = await changePassword({
      oldPassword,
      password,
      confirmPassword,
    });
    setIsSavingPassword(false);
    setPasswordFeedback(result);

    if (result.ok) {
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const isStudent = userData.role === "MAHASISWA";
  const numberLabel = isStudent ? "NIM" : "NIY";

  return (
    <div className="flex w-full flex-col space-y-5">
      <section className="flex w-full flex-col space-y-4 rounded-2xl bg-white p-5">
        <h2 className="font-bold text-[#1d1d1d]">Data Akun</h2>
        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            ["Nama lengkap", userData.name],
            [numberLabel, userData.nim],
            ["Email", userData.email],
            ["Peran", ROLE_LABELS[userData.role] ?? userData.role],
          ].map(([term, value]) => (
            <div key={term} className="flex flex-col space-y-1">
              <dt className="text-sm font-semibold text-[#5E6278]">{term}</dt>
              <dd className="break-all font-semibold text-[#1D1D1D]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-[#5E6278]">
          {numberLabel} dan email tidak bisa diubah.
        </p>
      </section>

      {isStudent ? (
        <section className="w-full rounded-2xl bg-white p-5 text-[#5E6278]">
          Ubah nama dan password lewat aplikasi SILAB di HP.
        </section>
      ) : (
        <>
          <form
            noValidate
            onSubmit={saveName}
            className="flex w-full flex-col space-y-4 rounded-2xl bg-white p-5"
          >
            <h2 className="font-bold text-[#1d1d1d]">Ubah Nama</h2>
            <Field id="fullname" label="Nama lengkap">
              <input
                id="fullname"
                type="text"
                value={fullname}
                onChange={(event) => setFullname(event.target.value)}
                className={inputClassName}
              />
            </Field>
            <FeedbackBox feedback={nameFeedback} />
            <button
              type="submit"
              disabled={isSavingName}
              className="h-[54px] w-[160px] self-end rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:opacity-60"
            >
              {isSavingName ? (
                <span className="loading loading-dots loading-md" />
              ) : (
                "Simpan Nama"
              )}
            </button>
          </form>

          <form
            noValidate
            onSubmit={savePassword}
            className="flex w-full flex-col space-y-4 rounded-2xl bg-white p-5"
          >
            <h2 className="font-bold text-[#1d1d1d]">Ganti Password</h2>
            <p className="text-sm text-[#5E6278]">
              Setelah password diganti, perangkat lain yang masuk dengan akun
              ini akan dikeluarkan.
            </p>
            <Field id="old-password" label="Password lama">
              <input
                id="old-password"
                type="password"
                autoComplete="current-password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                className={inputClassName}
              />
            </Field>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <Field id="new-password" label="Password baru">
                <input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClassName}
                />
              </Field>
              <Field id="confirm-password" label="Konfirmasi password baru">
                <input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={inputClassName}
                />
              </Field>
            </div>
            <FeedbackBox feedback={passwordFeedback} />
            <button
              type="submit"
              disabled={isSavingPassword}
              className="h-[54px] w-[180px] self-end rounded-full bg-[#D2E3F1] px-[16px] py-[8px] text-[16px] font-semibold text-[#3272CA] disabled:opacity-60"
            >
              {isSavingPassword ? (
                <span className="loading loading-dots loading-md" />
              ) : (
                "Simpan Password"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
