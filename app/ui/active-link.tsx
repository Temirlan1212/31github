"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "@/navigation";

const ActiveLink = ({
  children,
  ...rest
}: { children: React.ReactNode } & LinkProps & { className?: string }) => {
  const { href } = rest;
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link
      {...rest}
      className={isActive ? "pointer-events-none opacity-[0.7]" : ""}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
