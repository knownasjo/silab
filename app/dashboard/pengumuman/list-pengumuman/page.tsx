"use client";

import AnnouncementCard from "@/app/components/pengumuman/announcement-card";
import { IGetAllAnnouncementsResponseBody } from "@/app/interfaces/announcement/announcement.interface";
import useAnnouncementStore from "@/app/store/useAnnouncementStore";
import { useEffect } from "react";

const ListPengumuman = () => {
  const { announcementsData, getAllAnnouncements, isLoading } =
    useAnnouncementStore();

  useEffect(() => {
    getAllAnnouncements();
  }, [getAllAnnouncements]);

  return (
    <div className="flex h-full w-full flex-col overflow-auto overscroll-contain">
      <div className="flex flex-row items-baseline justify-between">
        <p className="text-3xl font-semibold text-[#1D1D1D]">
          <span className="font-extrabold">Semua</span> pengumuman.
        </p>
      </div>
      <div className="mt-10 flex flex-col space-y-10">
        {!isLoading && announcementsData?.length === 0 && (
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
