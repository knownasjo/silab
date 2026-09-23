"use client";

import Image from "next/image";
import { useState } from "react";
import ErrorDialog from "../components/error-dialog";
import WelcomeHero from "../components/welcome-hero";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/validation.schema";
import { ILoginRequestBody } from "../interfaces/auth/auth.interface";
import useAuthStore from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Authentication() {
  const router = useRouter();

  const [visible, setVisible] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { error, isLoading, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginRequestBody>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const onSubmit = async () => {
    const body = watch();

    const isSuccess = await login(body);

    if (!isSuccess) {
      setDialogOpen(true);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  };

  const inputClassName = (hasError: boolean) =>
    `h-[56px] w-full rounded-[30px] border px-4 focus:outline-[#3272CA] ${hasError ? "border-[#F1416C]" : "border-[#E1E3EA]"}`;

  return (
    <>
      <div className="flex min-h-screen w-full flex-row items-center justify-between gap-12 px-[60px] py-10">
        <div className="flex min-w-0 flex-1 justify-center">
          <WelcomeHero />
        </div>
        <div className="flex w-full max-w-[448px] shrink-0 flex-col items-center space-y-8 rounded-2xl border border-[#1d1d1d]/30 p-6">
          <h1 className="text-[42px] font-extrabold text-[#3272CA]">Log In</h1>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-5"
          >
            <div className="space-y-2">
              <label htmlFor="nim" className="sr-only">
                NIM
              </label>
              <input
                id="nim"
                type="text"
                inputMode="numeric"
                autoComplete="username"
                className={inputClassName(!!errors.nim)}
                placeholder="NIM"
                aria-invalid={!!errors.nim}
                {...register("nim")}
              />
              {errors.nim && (
                <p
                  role="alert"
                  className="px-4 text-sm font-semibold text-[#F1416C]"
                >
                  {errors.nim.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  className={`${inputClassName(!!errors.password)} pr-14`}
                  placeholder="Password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  aria-label={
                    visible ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute inset-y-0 right-4 flex items-center"
                >
                  <Image
                    alt=""
                    src={visible ? "/eye-slash.svg" : "/eye.svg"}
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              {errors.password && (
                <p
                  role="alert"
                  className="px-4 text-sm font-semibold text-[#F1416C]"
                >
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="h-[48px] w-full rounded-[30px] bg-[#3272CA] text-[18px] font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-md" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
      <ErrorDialog
        title={error ?? "Gagal masuk. Periksa NIM dan password Anda."}
        dialogOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
