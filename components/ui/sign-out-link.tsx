"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutLink({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };
  return <div onClick={handleSignOut}>{children}</div>;
}
