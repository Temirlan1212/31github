import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { WithSidebar } from "../components/sidebar";
import ActiveLink from "@/app/ui/active-link";

export default async function Page() {
  const session = await getServerSession(options);
  const role = session?.user?.role?.name;

  if (role === "admin") {
    return (
      <WithSidebar
        sidebarContent={SidebarContent}
        mobileDashboardHeader={CustomHeader}
      >
        <div className="p-10">
          <p>dashboard</p>
        </div>
      </WithSidebar>
    );
  } else {
    return notFound();
  }
}

const CustomHeader = () => {
  return (
    <div className="flex px-4">
      <span className="text-2xl font-extrabold">Floop</span>
    </div>
  );
};

const SidebarContent = () => {
  return (
    <div>
      <CustomHeader />
      <div className="mt-6">
        {["Inicio", "Preguntas"].map((item, index) => (
          <ActiveLink key={index} href={String(index)}>
            {item}
          </ActiveLink>
        ))}
      </div>
    </div>
  );
};
