"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { type ThemeProviderProps } from "next-themes/dist/types";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const isThemeOnLocalStorage = window.localStorage.getItem("theme");

    if (isThemeOnLocalStorage) {
      setTheme(isThemeOnLocalStorage);
      return;
    }

    const isSystemThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isSystemThemeDark) {
      setTheme("dark");
      return;
    }

    setTheme("light");
  }, []);

  useEffect(() => {
    if (theme) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  if (!theme) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
