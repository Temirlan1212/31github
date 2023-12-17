import { Button } from "@/app/ui/button";
import { RoutePath } from "@/routes/dashboard-routes";
import Link from "next/link";
import { ObjectId } from "bson";

export default async function Page() {
  const id = new ObjectId();

  return (
    <div>
      <Link href={`/${RoutePath["products-edit"]}/${id}`}>
        <Button>Create product</Button>
      </Link>
    </div>
  );
}
