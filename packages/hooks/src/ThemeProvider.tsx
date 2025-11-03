/* eslint-disable no-undef */
"use client";

import React, { createContext, useEffect, useState } from "react";

/**
 * Available theme modes
 */
export type Theme = "light" | "dark";

/**
 * Theme context value
 */
interface ThemeContextValue {
  theme: Theme;
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Theme context for managing application theme state
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "solace-theme";
const THEME_TRANSITION_CLASS = "theme-transition";
const TRANSITION_DURATION = 300;

/**
 * Gets the initial theme based on system preference or stored preference
 */
function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

/**
 * Applies theme to the document root element
 */
function applyTheme(newTheme: Theme, withTransition = false): void {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  if (withTransition) {
    root.classList.add(THEME_TRANSITION_CLASS);
  }

  if (newTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  if (withTransition) {
    setTimeout(() => {
      root.classList.remove(THEME_TRANSITION_CLASS);
    }, TRANSITION_DURATION);
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme provider component that manages theme state and persistence
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setThemeState(initialTheme);
    applyTheme(initialTheme, false);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: { matches: boolean }): void => {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (!storedTheme) {
        const newTheme = e.matches ? "dark" : "light";
        setThemeState(newTheme);
        applyTheme(newTheme, true);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);
    applyTheme(newTheme, true);
    window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = (): void => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
