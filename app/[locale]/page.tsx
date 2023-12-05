import { CategoryNav } from "@/components/layouts/category-nav";
import Navbar from "@/components/layouts/navbar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="h-[200vh]">
      <Navbar />
      <div className="container mt-[10px] !sticky !top-[10px]">
        <CategoryNav />
      </div>

      <main className="container">{t("Main")}</main>
    </div>
  );
}
