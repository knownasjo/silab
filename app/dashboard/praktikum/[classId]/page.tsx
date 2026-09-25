"use client";

import ClassMeetingsContent from "@/app/components/praktikum/class-meetings-content";
import { useEffect, useState } from "react";
import Link from "next/link";
import ClassTitleHeader from "@/app/components/praktikum/class-title-header";
import ClassDetailsBox from "@/app/components/praktikum/class-details-box";
import EditClassButton from "@/app/components/praktikum/edit-class-button";
import DeleteClassButton from "@/app/components/praktikum/delete-class-button";
import FeedbackBox, { Feedback } from "@/app/components/feedback-box";
import useClassStore from "@/app/store/useClassStore";
import useAuthStore from "@/app/store/useAuthStore";
import { useParams } from "next/navigation";
import useMeetingStore from "@/app/store/useMeetingStore";
import useCollaboratorStore from "@/app/store/useCollaboratorStore";
import useRealtimeEvents from "@/app/hooks/useRealtimeEvents";

const ClassDetails: React.FC = () => {
  const params = useParams<{ classId: string }>();
  const [notice, setNotice] = useState<Feedback>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const { getClassById, refreshClassById, classData, isLoading, error } =
    useClassStore();
  const { userData } = useAuthStore();
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

    if (type === "class" && data.action === "deleted") {
      setIsDeleted(true);
      return;
    }

    if (isReady || ["meeting", "attendance", "class"].includes(type)) {
      refreshMeetings(params.classId);
      refreshClassById(params.classId);
    }

    if (isReady || type === "class") {
      refreshClassCollaborators(params.classId);
    }
  });

  if (isDeleted) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-3">
        <p className="text-base font-semibold text-[#5E6278]">
          Kelas ini sudah dihapus.
        </p>
        <Link
          href="/dashboard/praktikum"
          className="text-sm font-semibold text-[#3272CA] underline"
        >
          Kembali ke Praktikum
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-auto overscroll-contain">
      {!isLoading && classData && (
        <>
          <ClassTitleHeader data={classData}>
            {userData?.role === "LABORAN" && (
              <>
                <EditClassButton
                  data={classData}
                  onSaved={(message) => setNotice({ ok: true, message })}
                />
                <DeleteClassButton
                  data={classData}
                  assistants={collaboratorsData.length}
                />
              </>
            )}
          </ClassTitleHeader>
          <FeedbackBox feedback={notice} />
          <ClassDetailsBox data={classData} assistant={collaboratorsData} />
          <ClassMeetingsContent
            classId={classData.id}
            meetingData={meetingsData}
          />
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
