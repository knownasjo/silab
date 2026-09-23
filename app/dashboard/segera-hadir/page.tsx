import BackButton from "./back-button";

export default async function SegeraHadirPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { fitur } = await searchParams;
  const feature = typeof fitur === "string" && fitur ? fitur : "ini";

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[420px] flex-col items-center space-y-4 rounded-[20px] bg-white p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F4F9]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3272CA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 22h14" />
            <path d="M5 2h14" />
            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
          </svg>
        </div>
        <p className="text-[20px] font-semibold text-black">Segera Hadir</p>
        <p className="text-[14px] text-[#5E6278]">
          Fitur {feature} sedang disiapkan dan akan tersedia di versi
          berikutnya.
        </p>
        <BackButton />
      </div>
    </div>
  );
}
