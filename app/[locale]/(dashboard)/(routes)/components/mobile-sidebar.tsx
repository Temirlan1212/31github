"use client";
import ActiveLink from "@/app/ui/active-link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/app/ui/sheet";
import { routes } from "@/routes/dashboard-routes";
import { PanelRightClose } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navigate = (href: string) => {
    setOpen(false);
    router.push(`/${href}`);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="mt-5 flex md:hidden container md:p-[0px]">
          <div className="flex flex-1">{<CustomHeader />}</div>
          <SheetTrigger>
            <PanelRightClose size={24} />
          </SheetTrigger>
        </div>
        <SheetContent side="right">
          {routes.map(({ path, title }, index) => (
            <ActiveLink
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(path);
              }}
              key={index}
              className={{ active: "bg-accent", default: "!w-full flex text-md hover:bg-accent px-[8px] py-[5px] rounded-[10px]" }}
              href={`/${path}`}
            >
              <SheetClose>{title}</SheetClose>
            </ActiveLink>
          ))}
        </SheetContent>
      </Sheet>
      {children}
    </>
  );
};

const CustomHeader = () => {
  return (
    <div className="flex">
      <span className="text-2xl font-extrabold">Main</span>
    </div>
  );
};
