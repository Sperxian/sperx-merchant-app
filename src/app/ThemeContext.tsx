"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const subscribers = new Set<() => void>();

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";

  const storedTheme = window.localStorage.getItem("admin-theme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToTheme(subscriber: () => void) {
  subscribers.add(subscriber);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === "admin-theme") subscriber();
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    subscribers.delete(subscriber);
    window.removeEventListener("storage", handleStorage);
  };
}

function saveTheme(theme: Theme) {
  window.localStorage.setItem("admin-theme", theme);
  subscribers.forEach((subscriber) => subscriber());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    (): Theme => "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        toggleTheme: () => saveTheme(theme === "dark" ? "light" : "dark"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}