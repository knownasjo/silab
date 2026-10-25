"use client";

import AnnouncementCard from "@/app/components/pengumuman/announcement-card";
import AnnouncementDeleteDialog from "@/app/components/pengumuman/announcement-delete-dialog";
import AnnouncementEditDialog from "@/app/components/pengumuman/announcement-edit-dialog";
import { IGetAllAnnouncementsResponseBody } from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useEffect, useRef, useState } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";

const ListPengumuman = () => {
  const {
    announcementsData,
    getAllAnnouncements,
    refreshAllAnnouncements,
    loadError,
  } = useAnnouncementStore();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [editing, setEditing] =
    useState<IGetAllAnnouncementsResponseBody | null>(null);
  const [deleting, setDeleting] =
    useState<IGetAllAnnouncementsResponseBody | null>(null);
  const [notice, setNotice] = useState<Feedback>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllAnnouncements().then(() => setIsLoaded(true));
  }, [getAllAnnouncements]);

  useRealtimeEvents(({ type }) => {
    if (["ready", "announcement", "subject"].includes(type))
      refreshAllAnnouncements();
  });

  useEffect(() => {
    if (notice)
      noticeRef.current?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
  }, [notice]);

  const isGone = (announcement: IGetAllAnnouncementsResponseBody) =>
    !announcementsData.some((item) => item.id === announcement.id);

  const startEdit = (announcement: IGetAllAnnouncementsResponseBody) => {
    setNotice(null);
    setEditing(announcement);
  };

  const startDelete = (announcement: IGetAllAnnouncementsResponseBody) => {
    setNotice(null);
    setDeleting(announcement);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-auto overscroll-contain">
      <p className="text-[32px] font-bold text-black">List Pengumuman</p>
      <div className="mt-10 flex flex-col space-y-10">
        {notice && (
          <div ref={noticeRef}>
            <FeedbackBox feedback={notice} />
          </div>
        )}
        <FeedbackBox
          feedback={
            loadError
              ? {
                  ok: false,
                  message: `Daftar pengumuman gagal dimuat. ${loadError}`,
                }
              : null
          }
        />
        {!isLoaded && !loadError && announcementsData.length === 0 && (
          <p className="text-sm font-semibold text-[#5E6278]">Loading...</p>
        )}
        {isLoaded && !loadError && announcementsData.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center text-base font-semibold text-[#5E6278]">
            Belum ada pengumuman.
          </div>
        )}
        {announcementsData.map((announcement) => (
          <AnnouncementCard
            announcement={announcement}
            key={announcement.id}
            onEdit={startEdit}
            onDelete={startDelete}
          />
        ))}
      </div>
      {editing && (
        <AnnouncementEditDialog
          key={editing.id}
          announcement={editing}
          isGone={isGone(editing)}
          onClose={() => setEditing(null)}
          onSaved={(message) => {
            setEditing(null);
            setNotice({ ok: true, message });
          }}
        />
      )}
      {deleting && (
        <AnnouncementDeleteDialog
          key={deleting.id}
          announcement={deleting}
          isGone={isGone(deleting)}
          onClose={() => setDeleting(null)}
          onDeleted={(message) => {
            setDeleting(null);
            setNotice({ ok: true, message });
          }}
        />
      )}
    </div>
  );
};

export default ListPengumuman;
