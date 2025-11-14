import { ImageResponse } from "next/og";

/**
 * Generate favicon dynamically with Goud Network branding
 *
 * Next.js will use this to generate favicons in multiple sizes
 */
export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #546e7a 0%, #37474f 100%)",
          borderRadius: "20%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          G
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
