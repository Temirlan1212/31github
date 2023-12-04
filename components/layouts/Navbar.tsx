import { redirect } from "next/navigation";
import { MainNav } from "@/components/layouts/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "./user-nav";

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
