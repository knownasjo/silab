interface DashboardDataContainerProps {
  data: number | null;
  data2?: number | null;
  suffix?: string;
  title: string;
  subTitle: string;
}

export default function DashboardDataContainer({
  data,
  data2,
  suffix = "",
  title,
  subTitle,
}: DashboardDataContainerProps) {
  const isReady = data !== null && data !== undefined;

  return (
    <div className="flex min-h-[clamp(200px,32vh,280px)] min-w-0 flex-col justify-between space-y-4 rounded-3xl bg-[#3272CA] p-5 [container-type:inline-size]">
      <p className="whitespace-nowrap text-[clamp(40px,26cqi,72px)] font-bold leading-none text-[#FFBF01]">
        {!isReady && "-"}
        {isReady && `${data}${suffix}`}
        {isReady && data2 !== null && data2 !== undefined && (
          <span className="text-[0.4em]"> / {data2}</span>
        )}
      </p>
      <div className="flex flex-col text-white">
        <p className="text-[clamp(16px,10.5cqi,24px)] font-bold">{title}</p>
        <p className="min-h-[3.5rem] text-[clamp(14px,8.5cqi,18px)] font-semibold">
          {subTitle}
        </p>
      </div>
    </div>
  );
}
