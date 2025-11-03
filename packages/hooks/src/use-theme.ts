"use client";

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import type { Theme } from "./ThemeProvider";

interface UseThemeReturn {
  theme: Theme;
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Hook to access and manage theme state
 *
 * @throws {Error} If used outside of ThemeProvider
 * @returns Theme state and controls
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): UseThemeReturn {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
