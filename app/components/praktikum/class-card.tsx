"use client";

import { IGetClassResponseBody } from "@/app/interfaces/class/class.interface";
import Link from "next/link";
import { formatDay } from "@/app/utils/day";

interface IClassCardProps {
  subjectClass: IGetClassResponseBody;
}

const ClassCard: React.FC<IClassCardProps> = ({ subjectClass }) => {
  const isFull = subjectClass.participants >= subjectClass.quota;

  return (
    <Link
      href={`/dashboard/praktikum/${subjectClass.id}`}
      key={subjectClass.id}
      className="flex min-h-[175px] w-full flex-col justify-between space-y-3 rounded-2xl bg-[#3272CA] p-3"
    >
      <div className="flex flex-row items-start justify-between space-x-2">
        <p className="text-3xl font-bold text-[#FFBF01]">{subjectClass.name}</p>
        <div className="flex flex-col items-end space-y-1">
          <p className="text-3xl font-bold text-[#FFBF01]">
            {subjectClass.participants}/{subjectClass.quota}
          </p>
          {isFull && (
            <span className="rounded-full bg-[#F1416C] px-2 py-0.5 text-xs font-bold text-white">
              Penuh
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col text-white">
        <p className="line-clamp-2 text-lg" title={subjectClass.subject_name}>
          {subjectClass.subject_name}
        </p>
        <p className="text-sm">
          {formatDay(subjectClass.day)}, {subjectClass.startAt} -{" "}
          {subjectClass.endAt} · {subjectClass.room}
        </p>
      </div>
    </Link>
  );
};

export default ClassCard;
