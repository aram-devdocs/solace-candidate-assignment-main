"use client";

"use client";

import { useState, useEffect } from "react";
import { getDeviceSize, type DeviceSize } from "@repo/utils";

/**
 * Custom hook to detect and track device size for responsive behavior
 * Returns current device size category based on window width
 *
 * @returns Current device size (mobile, tablet, or desktop)
 *
 * @example
 * ```tsx
 * const deviceSize = useDeviceSize();
 * const isMobile = deviceSize === "mobile";
 * ```
 */
export function useDeviceSize(): DeviceSize {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>(() => {
    // eslint-disable-next-line no-undef
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-undef
      return getDeviceSize(window.innerWidth);
    }
    return "desktop";
  });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (typeof window === "undefined") return;

    const handleResize = () => {
      // eslint-disable-next-line no-undef
      setDeviceSize(getDeviceSize(window.innerWidth));
    };

    // eslint-disable-next-line no-undef
    window.addEventListener("resize", handleResize);
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceSize;
}
