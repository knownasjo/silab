import { AnnouncementTypeEnum } from "@/app/interfaces/announcement/announcement.interface";
import { announcementTypeTitle } from "@/app/utils/announcement";

export default function AnnouncementTypeBadge({
  type,
}: {
  type: AnnouncementTypeEnum;
}) {
  const isPracticum = type === AnnouncementTypeEnum.PRACTICUM;

  return (
    <span
      className={`w-fit rounded-md px-2 py-1 text-xs font-semibold ${
        isPracticum
          ? "bg-[#D2E3F1] text-[#3272CA]"
          : "bg-[#F1F1F2] text-[#5E6278]"
      }`}
    >
      {announcementTypeTitle(type)}
    </span>
  );
}
