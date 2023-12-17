import { useTranslations } from "next-intl";
import { ProductCreateForm } from "@/app/[locale]/(dashboard)/(routes)/dashboard/products/create/components/product-create-form";

export default function Page() {
  const t = useTranslations();

  return <ProductCreateForm />;
}
