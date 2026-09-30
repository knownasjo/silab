"use client";

import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import FeedbackBox from "@/app/components/feedback-box";
import AnnouncementTypeBadge from "@/app/components/pengumuman/announcement-type-badge";
import { audienceLabel, formatPostedAt } from "@/app/utils/announcement";

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

  const announcement =
    announcementData?.id === params.id ? announcementData : null;

  if (!announcement && loadError) {
    return (
      <div className="w-full">
        <FeedbackBox feedback={{ ok: false, message: loadError }} />
      </div>
    );
  }

  if (!announcement) return <p>Loading...</p>;

  return (
    <div className="w-full overflow-auto overscroll-contain">
      <div className="flex w-full flex-col">
        <p className="mt-10 text-[22px] font-bold text-[#1D1D1D]">
          {announcement.title}
        </p>
        <p className="mt-10 whitespace-pre-line break-words text-[18px] font-semibold text-[#1D1D1D]">
          {announcement.body}
        </p>

        <div className="my-10 h-[1px] w-full bg-[#1D1D1D]/20" />
        <div className="flex w-full flex-col space-y-10">
          <div className="flex flex-row justify-between">
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
              Jenis Pengumuman
            </p>
            <div className="w-1/3">
              <AnnouncementTypeBadge type={announcement.type} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">Untuk</p>
            <p className="w-1/3 break-words text-lg font-bold text-[#1D1D1D]">
              {audienceLabel(announcement)}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
              Dibuat oleh
            </p>
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
              {announcement.author}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]/50">
              Tanggal / Waktu Posting
            </p>
            <p className="w-1/3 text-lg font-bold text-[#1D1D1D]">
              {formatPostedAt(announcement.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
