import { DesktopSidebar } from "@/app/[locale]/(dashboard)/(routes)/components/deskstop-sidebar";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { MobileSidebar } from "./(routes)/components/mobile-sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);
  const role = session?.user?.role?.name;

  if (role === "admin") {
    return (
      <>
        <DesktopSidebar>
          <MobileSidebar>{children}</MobileSidebar>
        </DesktopSidebar>
      </>
    );
  } else {
    return notFound();
  }
}
