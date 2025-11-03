"use client";

import { Moon, Sun } from "lucide-react";
import type { Theme } from "@repo/hooks";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

/**
 * Theme toggle button component
 * Displays a sun icon in light mode and moon icon in dark mode
 *
 * @param theme - Current theme ('light' or 'dark')
 * @param onToggle - Callback function to toggle theme
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * <ThemeToggle theme={theme} onToggle={toggleTheme} />
 * ```
 */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps): JSX.Element {
  return (
    <button
      onClick={onToggle}
      className="hover:bg-primary-600 dark:hover:bg-secondary-800 focus:ring-primary-500 dark:focus:ring-primary-400 flex h-10 w-10 items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      type="button"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-white" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
    </button>
  );
}
