"use client";

import Link from "next/link";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import FeedbackBox from "@/app/components/feedback-box";
import AnnouncementTypeBadge from "@/app/components/pengumuman/announcement-type-badge";
import {
  ANNOUNCEMENT_GONE,
  audienceLabel,
  formatPostedAt,
} from "@/app/utils/announcement";

export default function AnnouncementDetails() {
  const params = useParams<{ id: string }>();
  const [deletedId, setDeletedId] = useState<string | null>(null);

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
    if (type === "ready" || type === "subject")
      refreshAnnouncementById(params.id);
    if (type !== "announcement" || data.announcementId !== params.id) return;

    if (data.action === "deleted") {
      setDeletedId(params.id);
    } else {
      refreshAnnouncementById(params.id);
    }
  });

  const announcement =
    announcementData?.id === params.id ? announcementData : null;
  const problem =
    deletedId === params.id ? ANNOUNCEMENT_GONE : !announcement && loadError;

  return (
    <div className="flex w-full flex-col space-y-8">
      <div className="flex w-full flex-row items-start justify-between gap-4">
        <p className="text-[32px] font-bold text-black">Detail Pengumuman</p>
        <Link
          href="/dashboard/pengumuman/list-pengumuman"
          className="h-fit shrink-0 content-center rounded-full bg-white p-3 text-sm font-semibold text-[#3272CA]"
        >
          Kembali
        </Link>
      </div>
      {problem ? (
        <FeedbackBox feedback={{ ok: false, message: problem }} />
      ) : !announcement ? (
        <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
      ) : (
        <div className="flex w-full flex-col rounded-2xl bg-white p-8 text-[#1D1D1D]">
          <p className="break-words text-[22px] font-bold">
            {announcement.title}
          </p>
          <p className="mt-6 whitespace-pre-line break-words text-[18px] font-semibold">
            {announcement.body}
          </p>
          <div className="my-8 h-[1px] w-full bg-[#1D1D1D]/20" />
          <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-x-6 gap-y-6 text-lg font-bold">
            <p className="text-[#1D1D1D]/50">Jenis Pengumuman</p>
            <div>
              <AnnouncementTypeBadge type={announcement.type} />
            </div>
            <p className="text-[#1D1D1D]/50">Untuk</p>
            <p className="break-words">{audienceLabel(announcement)}</p>
            <p className="text-[#1D1D1D]/50">Dibuat oleh</p>
            <p className="break-words">{announcement.author}</p>
            <p className="text-[#1D1D1D]/50">Tanggal / Waktu Posting</p>
            <p>{formatPostedAt(announcement.createdAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
