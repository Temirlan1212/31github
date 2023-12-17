import { Button } from "@/app/ui/button";
import { RoutePath } from "@/routes/dashboar-routes";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="p-10">
      <Link href={`/${RoutePath["products-create"]}`}>
        <Button>Create product</Button>
      </Link>
    </div>
  );
}
