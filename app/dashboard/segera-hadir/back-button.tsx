"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const goBack = () =>
    window.history.length > 1 ? router.back() : router.push("/dashboard");

  return (
    <button
      onClick={goBack}
      className="rounded-full bg-[#3272CA] px-6 py-3 text-sm font-semibold text-white"
    >
      Kembali
    </button>
  );
}
