import { MainNav } from "@/components/layouts/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "./user-nav";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />

          {!!session ? (
            <UserNav {...session} />
          ) : (
            <Link href="sign-in">
              <Button variant="outline">
                <ArrowRightCircle />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
