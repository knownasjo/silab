"use client";

import useAuthStore from "../store/useAuthStore";
import useRealtimeEvents from "../hooks/useRealtimeEvents";

export default function AccountLoadNotice() {
  const { userData, isLoading, error, me } = useAuthStore();

  useRealtimeEvents(({ type }) => {
    const { userData, error } = useAuthStore.getState();

    if (type === "ready" && !userData && error) me();
  });

  if (userData || isLoading || !error) return null;

  return (
    <div
      role="alert"
      className="mb-6 flex w-full flex-row items-center justify-between space-x-4 rounded-xl bg-[#FFF5F8] p-3 text-sm font-semibold text-[#F1416C]"
    >
      <p>Data akun gagal dimuat. {error}</p>
      <button
        type="button"
        onClick={() => me()}
        className="shrink-0 rounded-full bg-[#F1416C] px-[14px] py-[6px] text-white"
      >
        Coba lagi
      </button>
    </div>
  );
}
