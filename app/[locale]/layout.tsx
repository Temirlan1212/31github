import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextIntlProvider } from "@/app/context/next-intl-provider";
import Navbar from "@/app/layouts/navbar";

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale as any)) notFound();

  let messages: any;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error("❌ Error loading internationalization messages", error);
    notFound();
  }

  unstable_setRequestLocale(locale);

  return (
    <NextIntlProvider locale={locale} messages={messages}>
      <div className="border-b">
        <div className="container">
          <Navbar />
        </div>
      </div>
      <div className="container">{children}</div>
    </NextIntlProvider>
  );
}
