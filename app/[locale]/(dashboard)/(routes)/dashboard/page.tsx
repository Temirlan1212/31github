import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(options);
  const role = session?.user?.role?.name;

  if (role === "admin") {
    return <>dashboard</>;
  } else {
    return notFound();
  }
}
