import { CategoryNav } from "@/app/layouts/category-nav";
import { HeroSection } from "@/app/[locale]/(home)/components/hero-section";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="h-[200vh]">
      {/* <div className="container mt-[10px] !sticky !top-[10px]">
        <CategoryNav />
      </div> */}

      <HeroSection />
    </div>
  );
}
