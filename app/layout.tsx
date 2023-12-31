import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "./context/next-auth-provider";
import { NextThemeProvider } from "./context/next-theme-provider";
import { getServerSession } from "next-auth";
import NextTopLoader from "./context/next-top-loader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <NextTopLoader />
            {children}
          </NextThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
