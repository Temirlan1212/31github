import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./context/NextAuthProvider";
import { NextThemeProvider } from "./context/NextThemeProvider";
import NextProgressBar from "./context/NextProgressBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextProgressBar color="#FE26B1" />
            {children}
          </NextThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
