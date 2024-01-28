"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { checkIsActive } from "@/helpers/router";

export interface IActiveLinkProps extends LinkProps {
  className?: { default?: string; active?: string };
  activeRoutes?: string[];
  to?: string;
}

const ActiveLink = ({
  children,
  to,
  ...rest
}: PropsWithChildren<IActiveLinkProps>) => {
  const { href } = rest;
  const pathname = usePathname();
  const isActiveRoutes = rest.activeRoutes && Array.isArray(rest.activeRoutes);
  const isActive = checkIsActive(pathname, to ? to : "");
  // const isActive = isActiveRoutes
  //   ? rest.activeRoutes?.some((route) => {
  //       if (route.includes("/*")) {
  //         const escapedStr1 = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  //         const regexPattern = new RegExp(`^${escapedStr1.replace("\\*", "(.*)")}$`);
  //         const beforeWildcard = pathname.split("/*")[0];
  //         return regexPattern.test(beforeWildcard);
  //       }
  //       return route === pathname;
  //     })
  //   : pathname === href;

  return (
    <Link
      {...rest}
      className={cn(
        "text-sm font-medium transition-colors text-primary/70 hover:text-primary",
        rest?.className?.default ?? "",
        isActive
          ? `pointer-events-none text-primary active ${
              rest?.className?.active ?? ""
            }`
          : ""
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
