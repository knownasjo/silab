"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import { IChangePasswordRequestBody } from "@/app/interfaces/auth/auth.interface";

const ROLE_LABELS: Record<string, string> = {
  LABORAN: "Laboran",
  DOSEN: "Dosen",
  MAHASISWA: "Mahasiswa (asisten)",
};

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;

type PasswordKey = keyof IChangePasswordRequestBody;

const emptyPasswordForm: IChangePasswordRequestBody = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const inputClassName =
  "h-[54px] w-full rounded-2xl bg-[#f5f5f5] p-5 font-semibold text-[#1D1D1D] focus:outline-[#3272CA] disabled:cursor-not-allowed disabled:opacity-60";

const tidyName = (name: string) => name.trim().replace(/\s+/g, " ");

function Field({
  id,
  label,
  note,
  children,
}: {
  id: string;
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col space-y-3">
      <label htmlFor={id} className="text-base font-semibold text-[#5E6278]">
        {label}
        {note && (
          <>
            {" "}
            <span className="text-xs font-normal text-[#5E6278]/75">
              {note}
            </span>
          </>
        )}
      </label>
      {children}
    </div>
  );
}

function PasswordField({
  id,
  label,
  autoComplete,
  value,
  visible,
  onChange,
  onToggle,
}: {
  id: string;
  label: string;
  autoComplete: string;
  value: string;
  visible: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
}) {
  return (
    <Field id={id} label={label}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClassName} pr-14`}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${visible ? "Sembunyikan" : "Tampilkan"} ${label.toLowerCase()}`}
          className="absolute inset-y-0 right-4 flex items-center disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Image
            alt=""
            src={visible ? "/eye-slash.svg" : "/eye.svg"}
            width={24}
            height={24}
          />
        </button>
      </div>
    </Field>
  );
}

export default function Profile() {
  const {
    userData,
    error: accountError,
    updateProfile,
    changePassword,
  } = useAuthStore();

  const [fullname, setFullname] = useState<string>("");
  const [nameFeedback, setNameFeedback] = useState<Feedback>(null);
  const [isSavingName, setIsSavingName] = useState<boolean>(false);

  const [passwordForm, setPasswordForm] =
    useState<IChangePasswordRequestBody>(emptyPasswordForm);
  const [visiblePasswords, setVisiblePasswords] = useState<PasswordKey[]>([]);
  const [passwordFeedback, setPasswordFeedback] = useState<Feedback>(null);
  const [isSavingPassword, setIsSavingPassword] = useState<boolean>(false);

  useEffect(() => {
    if (userData) setFullname(userData.name);
  }, [userData]);

  const title = <p className="text-[32px] font-bold text-black">Profil</p>;

  if (!userData) {
    return (
      <div className="flex w-full flex-col space-y-8">
        {title}
        {!accountError && (
          <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
        )}
      </div>
    );
  }

  const updateName = (value: string) => {
    setFullname(value);
    setNameFeedback(null);
  };

  const saveName = async (event: FormEvent) => {
    event.preventDefault();

    const name = tidyName(fullname);

    const problem =
      name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH
        ? `Nama lengkap harus ${MIN_NAME_LENGTH} sampai ${MAX_NAME_LENGTH} karakter.`
        : name === userData.name
          ? "Tidak ada perubahan yang perlu disimpan."
          : null;

    if (problem) {
      setNameFeedback({ ok: false, message: problem });
      return;
    }

    setIsSavingName(true);
    setNameFeedback(await updateProfile(name));
    setIsSavingName(false);
  };

  const updatePassword = (key: PasswordKey, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [key]: value }));
    setPasswordFeedback(null);
  };

  const togglePassword = (key: PasswordKey) =>
    setVisiblePasswords((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );

  const savePassword = async (event: FormEvent) => {
    event.preventDefault();

    const { oldPassword, password, confirmPassword } = passwordForm;

    const problem = !oldPassword
      ? "Password lama wajib diisi."
      : password.length < 8
        ? "Password baru minimal 8 karakter."
        : /\s/.test(password)
          ? "Password baru tidak boleh mengandung spasi."
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
    const result = await changePassword(passwordForm);
    setIsSavingPassword(false);
    setPasswordFeedback(result);

    if (result.ok) {
      setPasswordForm(emptyPasswordForm);
      setVisiblePasswords([]);
    }
  };

  const passwordField = (key: PasswordKey, id: string, label: string) => (
    <PasswordField
      id={id}
      label={label}
      autoComplete={key === "oldPassword" ? "current-password" : "new-password"}
      value={passwordForm[key]}
      visible={visiblePasswords.includes(key)}
      onChange={(value) => updatePassword(key, value)}
      onToggle={() => togglePassword(key)}
    />
  );

  const isStudent = userData.role === "MAHASISWA";
  const numberLabel = isStudent ? "NIM" : "NIY";

  return (
    <div className="flex w-full flex-col space-y-8">
      {title}
      <div className="flex w-full flex-col space-y-5">
        <section className="flex w-full flex-col space-y-4 rounded-2xl bg-white p-5">
          <h2 className="font-bold text-[#1d1d1d]">Data Akun</h2>
          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["Nama lengkap", userData.name, "break-words"],
              [numberLabel, userData.nim, "break-all"],
              ["Email", userData.email, "break-all"],
              [
                "Peran",
                ROLE_LABELS[userData.role] ?? userData.role,
                "break-words",
              ],
            ].map(([term, value, wrap]) => (
              <div key={term} className="flex min-w-0 flex-col space-y-1">
                <dt className="text-sm font-semibold text-[#5E6278]">{term}</dt>
                <dd className={`${wrap} font-semibold text-[#1D1D1D]`}>
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
              <fieldset disabled={isSavingName} className="min-w-0">
                <Field
                  id="fullname"
                  label="Nama lengkap"
                  note={`(maks: ${MAX_NAME_LENGTH} karakter)`}
                >
                  <input
                    id="fullname"
                    type="text"
                    maxLength={MAX_NAME_LENGTH}
                    value={fullname}
                    onChange={(event) => updateName(event.target.value)}
                    className={inputClassName}
                  />
                  <p className="text-right text-xs font-semibold text-[#5E6278]/75">
                    {fullname.length}/{MAX_NAME_LENGTH}
                  </p>
                </Field>
              </fieldset>
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
              <fieldset
                disabled={isSavingPassword}
                className="flex min-w-0 flex-col space-y-4"
              >
                {passwordField("oldPassword", "old-password", "Password lama")}
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  {passwordField("password", "new-password", "Password baru")}
                  {passwordField(
                    "confirmPassword",
                    "confirm-password",
                    "Konfirmasi password baru",
                  )}
                </div>
              </fieldset>
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
    </div>
  );
}
