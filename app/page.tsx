import Link from "next/link";
import WelcomeHero from "./components/welcome-hero";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-10 px-6 py-10">
      <WelcomeHero />
      <Link
        href={{
          pathname: "auth",
        }}
        className="flex h-[54px] w-[155px] flex-row items-center justify-center rounded-full bg-[#3272CA] text-[18px] text-white"
      >
        Login
      </Link>
    </div>
  );
}
