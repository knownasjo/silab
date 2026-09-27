"use client";

import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import FeedbackBox from "@/app/components/feedback-box";

export default function AnnouncementDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const {
    getAnnouncementById,
    refreshAnnouncementById,
    announcementData,
    loadError,
  } = useAnnouncementStore();

  useEffect(() => {
    getAnnouncementById(params.id);
  }, [getAnnouncementById, params.id]);

  useRealtimeEvents(({ type, data }) => {
    if (type === "ready") refreshAnnouncementById(params.id);
    if (type !== "announcement" || data.announcement_id !== params.id) return;

    if (data.action === "deleted") {
      router.replace("/dashboard/pengumuman/list-pengumuman");
    } else {
      refreshAnnouncementById(params.id);
    }
  });

  if (!announcementData && loadError) {
    return (
      <div className="w-full">
        <FeedbackBox feedback={{ ok: false, message: loadError }} />
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto overscroll-contain">
      <div className="flex w-full flex-col">
        <p className="mt-10 text-[22px] font-bold text-[#1D1D1D]">
          {announcementData?.title}
        </p>
        <p className="mt-10 text-[18px] font-semibold text-[#1D1D1D]">
          {announcementData?.body}
        </p>

        <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/20" />
        <div className="flex w-full flex-col space-y-10">
          <div className="flex flex-row justify-between">
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
              Tanggal / Waktu Posting
            </p>
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
              {announcementData?.created_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
