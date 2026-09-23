import RecapAttendancesContent from "./recap-attendances-content";

export default async function RecapAttendancesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { classId, meetingId } = await searchParams;

  if (typeof classId !== "string") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Kelas tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <RecapAttendancesContent
      classId={classId}
      meetingId={typeof meetingId === "string" ? meetingId : undefined}
    />
  );
}
