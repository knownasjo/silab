import Image from "next/image";

export default function WelcomeHero() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[300px] w-[250px]">
        <Image
          alt="illustration"
          src={"/illustration-1.svg"}
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className="mt-6 max-w-[543px] text-center">
        <p className="text-[40px] font-bold leading-tight text-[#1D1D1D] xl:text-[54px]">
          Selamat datang di Dashboard{" "}
          <span className="font-semibold text-[#3272CA]">SILAB.</span>
        </p>
        <p className="mt-3 text-xl font-semibold leading-snug text-[#5E6278] xl:text-2xl">
          Atur dan pantau semua informasi praktikum dengan mudah di sini.
        </p>
      </div>
    </div>
  );
}
