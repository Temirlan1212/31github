import { useTranslations } from "next-intl";
import { ProductCreateForm } from "./components/product-create-form";

export default function Page({ params: { slug } }: { params: { slug: string } }) {
  const t = useTranslations();

  return <ProductCreateForm slug={slug} />;
}
