import { IActivityResponseBody } from "@/app/interfaces/activity/activity.interface";
import {
  activityChange,
  actorDetail,
  formatActivityDate,
  formatActivityTime,
} from "@/app/utils/activity";

const ROW_GRID =
  "grid grid-cols-[104px_minmax(0,1fr)_170px_minmax(0,1.5fr)_minmax(0,1.1fr)] items-start gap-x-4";

const badgeClassName = (activity: IActivityResponseBody) =>
  activity.action === "LOGIN_FAILED"
    ? "bg-[#FFF5F8] text-[#F1416C]"
    : "bg-[#F1F1F2] text-[#5E6278]";

interface ActivityTableProps {
  activities: IActivityResponseBody[];
  isLoading: boolean;
  showLoading: boolean;
  emptyMessage: string | null;
}

export default function ActivityTable({
  activities,
  isLoading,
  showLoading,
  emptyMessage,
}: ActivityTableProps) {
  return (
    <div
      aria-busy={isLoading}
      className="flex h-fit w-full flex-col rounded-2xl bg-white px-5 pb-3 pt-2"
    >
      <div
        className={`${ROW_GRID} sticky top-0 z-10 border-b border-[#F1F1F2] bg-white py-3 text-sm font-bold text-[#5E6278]`}
      >
        <p>Waktu</p>
        <p>Pelaku</p>
        <p>Aksi</p>
        <p>Data</p>
        <p>Perubahan</p>
      </div>
      {showLoading && (
        <p className="py-4 text-sm font-semibold text-[#5E6278]">Loading...</p>
      )}
      {emptyMessage && (
        <p className="py-4 text-sm font-semibold text-[#5E6278]">
          {emptyMessage}
        </p>
      )}
      <div className={isLoading ? "opacity-60" : ""}>
        {activities.map((activity) => {
          const detail = actorDetail(activity.actor);

          return (
            <div
              key={activity.id}
              className={`${ROW_GRID} border-b border-[#F1F1F2] py-3 text-sm font-semibold text-[#5E6278] last:border-b-0`}
            >
              <div className="flex flex-col">
                <p className="text-[#1D1D1D]">
                  {formatActivityDate(activity.createdAt)}
                </p>
                <p className="text-xs">{formatActivityTime(activity)}</p>
              </div>
              <div className="flex min-w-0 flex-col">
                <p className="wrap-break-word text-[#1D1D1D]">
                  {activity.actor.name}
                </p>
                {detail && <p className="wrap-break-word text-xs">{detail}</p>}
              </div>
              <p>
                <span
                  className={`inline-block rounded-md px-2 py-1 text-xs font-semibold ${badgeClassName(activity)}`}
                >
                  {activity.actionLabel}
                </span>
              </p>
              <p className="wrap-break-word">{activity.description}</p>
              <p className="wrap-break-word">{activityChange(activity)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
