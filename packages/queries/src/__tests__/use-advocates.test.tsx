import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAdvocates } from "../hooks/use-advocates";
import { createMockAdvocates } from "@repo/database/testing";
import type { ReactNode } from "react";

const mockAdvocates = createMockAdvocates(2);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useAdvocates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should fetch advocates successfully", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockAdvocates }),
    } as Response);

    const { result } = renderHook(() => useAdvocates(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ success: true, data: mockAdvocates });
    expect(result.current.error).toBeNull();
  });

  it("should handle loading state", async () => {
    vi.mocked(global.fetch).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ success: true, data: mockAdvocates }),
              } as Response),
            100
          )
        )
    );

    const { result } = renderHook(() => useAdvocates(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.isLoading).toBe(false);
  });

  it("should handle API error responses", async () => {
    const errorResponse = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Advocates not found",
      },
    };

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => errorResponse,
    } as Response);

    const { result } = renderHook(() => useAdvocates(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(errorResponse);
    expect(result.current.data?.success).toBe(false);
  });

  it("should handle network errors", async () => {
    const networkError = new Error("Network error");
    vi.mocked(global.fetch).mockRejectedValue(networkError);

    const { result } = renderHook(() => useAdvocates({}, { retry: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isError).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toEqual(networkError);
  });

  it("should handle HTTP errors", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    const { result } = renderHook(() => useAdvocates({}, { retry: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isError).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toContain("500");
  });

  it("should handle empty data array", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);

    const { result } = renderHook(() => useAdvocates(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({ success: true, data: [] });
    if (result.current.data?.success) {
      expect(result.current.data.data).toHaveLength(0);
    }
  });

  it("should accept custom query options", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockAdvocates }),
    } as Response);

    const { result } = renderHook(() => useAdvocates({ enabled: false }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
