/**
 * Blocking script component to prevent flash of unstyled content (FOUC)
 * Must be rendered in document head before any content
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <html>
 *   <head>
 *     <ThemeScript />
 *   </head>
 *   <body>
 *     <ThemeProvider>{children}</ThemeProvider>
 *   </body>
 * </html>
 * ```
 */
export function ThemeScript(): JSX.Element {
  const themeScript = `
    (function() {
      const THEME_STORAGE_KEY = 'solace-theme';

      function getInitialTheme() {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          return stored;
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }

      const theme = getInitialTheme();
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />;
}
