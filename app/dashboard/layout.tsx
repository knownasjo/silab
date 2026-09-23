import { cookies } from "next/headers";
import SideBar from "../components/sidebar";
import { SIDEBAR_COLLAPSED_COOKIE } from "../utils/sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isSidebarCollapsed =
    cookieStore.get(SIDEBAR_COLLAPSED_COOKIE)?.value === "1";

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden">
      <SideBar initialCollapsed={isSidebarCollapsed} />
      <main className="mx-[30px] my-8 flex min-w-0 flex-1 flex-col items-center justify-start overflow-y-auto rounded-[35px] bg-[#F5F5F5] p-[40px]">
        {children}
      </main>
    </div>
  );
}
