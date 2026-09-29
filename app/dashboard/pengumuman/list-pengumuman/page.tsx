"use client";

import AnnouncementCard from "@/app/components/pengumuman/announcement-card";
import { IGetAllAnnouncementsResponseBody } from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useEffect, useState } from "react";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";
import FeedbackBox from "@/app/components/feedback-box";

const ListPengumuman = () => {
  const {
    announcementsData,
    getAllAnnouncements,
    refreshAllAnnouncements,
    loadError,
  } = useAnnouncementStore();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    getAllAnnouncements().then(() => setIsLoaded(true));
  }, [getAllAnnouncements]);

  useRealtimeEvents(({ type }) => {
    if (type === "ready" || type === "announcement") refreshAllAnnouncements();
  });

  return (
    <div className="flex h-full w-full flex-col overflow-auto overscroll-contain">
      <div className="flex flex-row items-baseline justify-between">
        <p className="text-3xl font-semibold text-[#1D1D1D]">
          <span className="font-extrabold">Semua</span> pengumuman.
        </p>
      </div>
      <div className="mt-10 flex flex-col space-y-10">
        <FeedbackBox
          feedback={loadError ? { ok: false, message: loadError } : null}
        />
        {!isLoaded && !loadError && announcementsData.length === 0 && (
          <p>Loading...</p>
        )}
        {isLoaded && !loadError && announcementsData.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center text-base font-semibold text-[#5E6278]">
            Belum ada pengumuman.
          </div>
        )}
        {announcementsData &&
          announcementsData.map(
            (announcement: IGetAllAnnouncementsResponseBody) => (
              <AnnouncementCard
                announcement={announcement}
                key={announcement.id}
              />
            ),
          )}
      </div>
    </div>
  );
};

export default ListPengumuman;
