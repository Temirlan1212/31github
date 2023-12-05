import Link from "next/link";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/guest";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { AlignJustify } from "lucide-react";

const userRoutes = routes;

export function Links({ isDialog }: { isDialog: boolean }) {
  return userRoutes.map(({ link, title }, index) => (
    <Link key={index} href={link} className="text-sm font-medium transition-colors hover:text-primary">
      {isDialog ? <DialogClose>{title}</DialogClose> : title}
    </Link>
  ));
}

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)} {...props}>
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
