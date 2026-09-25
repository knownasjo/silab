"use client";

import ClassMeetingsContent from "@/app/components/praktikum/class-meetings-content";
import { useEffect } from "react";
import ClassTitleHeader from "@/app/components/praktikum/class-title-header";
import ClassDetailsBox from "@/app/components/praktikum/class-details-box";
import useClassStore from "@/app/store/useClassStore";
import { useParams } from "next/navigation";
import useMeetingStore from "@/app/store/useMeetingStore";
import useCollaboratorStore from "@/app/store/useCollaboratorStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";

const ClassDetails: React.FC = () => {
  const params = useParams<{ classId: string }>();

  const { getClassById, refreshClassById, classData, isLoading, error } =
    useClassStore();
  const { getMeetings, refreshMeetings, meetingsData } = useMeetingStore();
  const {
    getClassCollaborators,
    refreshClassCollaborators,
    collaboratorsData,
  } = useCollaboratorStore();

  useEffect(() => {
    getClassCollaborators(params.classId);
    getClassById(params.classId);
    getMeetings(params.classId);
  }, [getClassById, getMeetings, params.classId, getClassCollaborators]);

  useRealtimeEvents(({ type, data }) => {
    const isReady = type === "ready";
    if (!isReady && data.class_id !== params.classId) return;

    if (isReady || ["meeting", "attendance", "class"].includes(type)) {
      refreshMeetings(params.classId);
    }

    if (isReady || type === "class") {
      refreshClassById(params.classId);
      refreshClassCollaborators(params.classId);
    }
  });

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-auto overscroll-contain">
      {!isLoading && classData && (
        <>
          <ClassTitleHeader data={classData} />
          <ClassDetailsBox data={classData} assistant={collaboratorsData} />
          <ClassMeetingsContent classId={classData.id} meetingData={meetingsData} />
        </>
      )}
      {!isLoading && !classData && error && (
        <div className="flex w-full flex-1 items-center justify-center">
          <p className="text-base font-semibold text-[#5E6278]">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
