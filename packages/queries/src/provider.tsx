"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/**
 * Default configuration for the QueryClient.
 *
 * Configures React Query with optimal defaults for caching,
 * retry behavior, and error handling.
 */
const DEFAULT_QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 3,
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
  },
};

/**
 * Props for the QueryProvider component.
 */
interface QueryProviderProps {
  children: ReactNode;
  client?: QueryClient;
}

/**
 * Query provider component for React Query.
 *
 * Wraps the application with a QueryClientProvider to enable
 * React Query hooks throughout the component tree. Creates a
 * QueryClient instance with sensible defaults for caching and
 * error handling.
 *
 * @param props - Component props
 * @param props.children - Child components to wrap
 * @param props.client - Optional custom QueryClient instance (useful for testing)
 *
 * @example
 * // In your app root or layout
 * function RootLayout({ children }) {
 *   return (
 *     <QueryProvider>
 *       {children}
 *     </QueryProvider>
 *   );
 * }
 *
 * @example
 * // With custom client (testing)
 * const testClient = new QueryClient();
 * <QueryProvider client={testClient}>
 *   <MyComponent />
 * </QueryProvider>
 */
export function QueryProvider({ children, client }: QueryProviderProps) {
  const [queryClient] = useState(() => client || new QueryClient(DEFAULT_QUERY_CLIENT_CONFIG));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
