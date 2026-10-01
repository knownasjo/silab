import Image from "next/image";

export default function BannerDashboard() {
  return (
    <div className="flex min-h-[clamp(220px,33vh,300px)] w-full shrink-0 flex-row items-start justify-between space-x-6">
      <div className="flex w-[534px] flex-col space-y-4">
        <p className="text-[40px] font-bold leading-tight text-[#1d1d1d] xl:text-[54px]">
          Selamat datang di Dashboard{" "}
          <span className="font-extrabold text-[#3272CA]">SILAB.</span>
        </p>
        <p className="text-xl font-semibold leading-tight text-[#5E6278] xl:text-[24px]">
          Atur dan pantau semua informasi praktikum dengan mudah di sini.
        </p>
      </div>
      <Image
        src={"illustration-1.svg"}
        alt="illustration"
        width={222}
        height={300}
        className="h-[clamp(220px,33vh,300px)] w-auto shrink-0"
        priority
      />
    </div>
  );
}
