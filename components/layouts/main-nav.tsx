import Link from "next/link";

import { cn } from "@/lib/utils";
import { routes } from "@/routes/guest";

const userRoutes = routes;

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {userRoutes.map(({ link, title }, index) => (
        <Link key={index} href={link} className="text-sm font-medium transition-colors hover:text-primary">
          {title}
        </Link>
      ))}
    </nav>
  );
}
