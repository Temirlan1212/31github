"use client";

import { CategoryNav } from "@/app/layouts/category-nav";
import { HeroSection } from "@/app/[locale]/(home)/components/hero-section";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Editor = useMemo(
    () => dynamic(() => import("@/app/ui/editor"), { ssr: false }),
    []
  );
  const t = useTranslations();

  const onChange = (content: string) => {
    console.log(content);
  };

  return (
    <div className="h-[200vh]">
      {/* <div className="container mt-[10px] !sticky !top-[10px]">
        <CategoryNav />
      </div> */}

      <Editor onChange={onChange} />

      <HeroSection />
    </div>
  );
}
