"use client";

import { usePathname, useRouter } from "next/navigation";
import NextJsTopLoader, { NextTopLoaderProps } from "nextjs-toploader";
import * as NProgress from "nprogress";
import { useEffect } from "react";

export default function NextTopLoader(props: NextTopLoaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);

  return <NextJsTopLoader {...props} />;
}
