import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextIntlProvider } from "../context/next-intl-provider";

export default async function LocaleLayout({ children, params: { locale } }) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  let messages: any;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error("❌ Error loading internationalization messages", error);
    notFound(); // Redirect to 'Not Found' page if messages can't be loaded
  }

  unstable_setRequestLocale(locale);

  return (
    <NextIntlProvider locale={locale} messages={messages}>
      {children}
    </NextIntlProvider>
  );
}
