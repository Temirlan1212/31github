import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/app/ui/dialog";
import { AlignJustify } from "lucide-react";
import { routes } from "@/routes/main-routes";
import { DefineNavigation } from "./define-navigation";

export function Links({ isDialog }: { isDialog: boolean }) {
  return routes.map(({ path, title, role }, index) => (
    <DefineNavigation role={role} key={index}>
      <Link
        href={`/${path}`}
        className="text-sm font-medium transition-colors hover:text-primary/80"
      >
        {isDialog ? <DialogClose>{title}</DialogClose> : title}
      </Link>
    </DefineNavigation>
  ));
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <nav
        className={cn(
          "hidden md:flex items-center space-x-4 lg:space-x-6 !m-[0px]",
          className
        )}
        {...props}
      >
        <Links isDialog={false} />
      </nav>
      <div className="flex items-center md:!hidden">
        <MainNavMobile />
      </div>
    </>
  );
}

function MainNavMobile() {
  return (
    <Dialog>
      <DialogTrigger>
        <AlignJustify />
      </DialogTrigger>
      <DialogContent className="m-[10px] w-[100%] max-w-[200px] rounded-[15px]">
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-[10px]">
            <Links isDialog={true} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
