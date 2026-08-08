"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedTheme = window.localStorage.getItem("admin-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("admin-theme", theme);
  }, [theme]);

  useEffect(() => {
    const syncTheme = () => {
      const nextTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";

      setTheme(nextTheme);
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("storage", syncTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <ClerkProvider>{children}</ClerkProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
