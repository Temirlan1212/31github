import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "ru"];
export const localePrefix = "as-needed";
export const defaultLocale = "ru";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
