import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./navigation";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { routes } from "./routes/main-routes";

const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: defaultLocale,
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

const privateRoutes = routes
  .filter((item) => item.role === "user" || item.role === "admin")
  .map((item) => item.path);

export default function middleware(req: NextRequest) {
  const excludePattern = `^(/(" + locales.join("|") + "))?/${privateRoutes.join(
    "|"
  )}/?.*?$`;
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
