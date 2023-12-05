import Navbar from "@/components/layouts/navbar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <Navbar />
      <main className="container">{t("Main")}</main>
    </>
  );
}
