import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebouncedValue } from "../use-debounced-value";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedValue("initial"));
    expect(result.current).toBe("initial");
  });

  it("should update value after default delay (300ms)", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: "initial" },
    });

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("updated");
  });

  it("should respect custom delay parameter", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 500), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "updated" });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("updated");
  });

  it("should only update once after rapid value changes", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "change1" });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "change2" });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "final" });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("final");
  });

  it("should clear timeout on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

    const { unmount, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "updated" });
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it("should update when delay parameter changes", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: "initial", delay: 300 },
    });

    rerender({ value: "updated", delay: 100 });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("updated");
  });

  it("should work with different value types", () => {
    const { result: stringResult } = renderHook(() => useDebouncedValue("test"));
    expect(stringResult.current).toBe("test");

    const { result: numberResult } = renderHook(() => useDebouncedValue(42));
    expect(numberResult.current).toBe(42);

    const { result: objectResult } = renderHook(() => useDebouncedValue({ name: "test" }));
    expect(objectResult.current).toEqual({ name: "test" });
  });
});
