interface DashboardDataContainerProps {
  data: number | null;
  data2?: number | null;
  title: string;
  subTitle: string;
}

export default function DashboardDataContainer({
  data,
  data2,
  title,
  subTitle,
}: DashboardDataContainerProps) {
  const isReady = data !== null && data !== undefined;

  return (
    <div className="flex h-[clamp(200px,32vh,280px)] w-1/3 flex-col justify-between rounded-3xl bg-[#3272CA] p-5">
      <p className="text-7xl font-bold text-[#FFBF01]">
        {!isReady && "-"}
        {isReady &&
          (data2 !== null && data2 !== undefined ? `${data} / ${data2}` : data)}
      </p>
      <div className="flex flex-col text-white">
        <p className="text-[24px] font-bold">{title}</p>
        <p className="min-h-[3.5rem] text-[18px] font-semibold">{subTitle}</p>
      </div>
    </div>
  );
}
