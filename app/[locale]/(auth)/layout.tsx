import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!!session) redirect("");
  return (
    <div className="h-[100vh] flex items-center justify-center">{children}</div>
  );
}
