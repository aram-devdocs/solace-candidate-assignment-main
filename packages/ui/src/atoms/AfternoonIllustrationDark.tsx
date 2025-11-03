import React from "react";

/**
 * Dark mode afternoon time illustration SVG component.
 * Displays a deep night sky with crescent moon over dark forest hills.
 * Used in the Greeting component for afternoon time periods in dark mode.
 *
 * @example
 * ```tsx
 * <AfternoonIllustrationDark />
 * ```
 */
export const AfternoonIllustrationDark: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="683"
    height="300"
    viewBox="0 0 683 300"
    fill="none"
    className="h-full w-auto"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="afternoonDarkSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0d1117" />
        <stop offset="100%" stopColor="#1a4239" />
      </linearGradient>
      <linearGradient id="afternoonDarkHills1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2d7561" />
        <stop offset="100%" stopColor="#1a4239" />
      </linearGradient>
      <linearGradient id="afternoonDarkHills2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a4239" />
        <stop offset="100%" stopColor="#0f2e28" />
      </linearGradient>
      <radialGradient id="afternoonDarkMoon" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e5c279" />
        <stop offset="60%" stopColor="#d4a95d" />
        <stop offset="100%" stopColor="#b8904a" stopOpacity="0.4" />
      </radialGradient>
    </defs>

    {/* Sky background */}
    <rect width="683" height="300" fill="url(#afternoonDarkSky)" />

    {/* Back hills */}
    <path
      d="M0 240 Q150 170 300 190 T683 220 L683 300 L0 300 Z"
      fill="url(#afternoonDarkHills2)"
      opacity="0.5"
    />

    {/* Middle hills */}
    <path
      d="M0 270 Q120 210 240 230 T480 250 T683 265 L683 300 L0 300 Z"
      fill="url(#afternoonDarkHills1)"
      opacity="0.7"
    />

    {/* Front hills */}
    <path d="M0 285 Q90 255 180 270 T360 280 T683 290 L683 300 L0 300 Z" fill="#2d7561" />

    {/* Large moon with atmospheric glow */}
    <circle cx="120" cy="100" r="55" fill="url(#afternoonDarkMoon)" opacity="0.95" />
    <circle cx="120" cy="100" r="60" fill="none" stroke="#e5c279" strokeWidth="0.5" opacity="0.2" />
    <circle cx="120" cy="100" r="70" fill="none" stroke="#d4a95d" strokeWidth="0.3" opacity="0.1" />

    {/* Stars scattered across sky */}
    <circle cx="300" cy="40" r="1.5" fill="#e5c279" opacity="0.9" />
    <circle cx="350" cy="70" r="1" fill="#d4a95d" opacity="0.7" />
    <circle cx="400" cy="50" r="1.2" fill="#e5c279" opacity="0.8" />
    <circle cx="550" cy="80" r="1" fill="#d4a95d" opacity="0.6" />
    <circle cx="600" cy="40" r="1.3" fill="#e5c279" opacity="0.8" />
    <circle cx="450" cy="100" r="1" fill="#d4a95d" opacity="0.7" />
    <circle cx="500" cy="120" r="1.1" fill="#e5c279" opacity="0.6" />
    <circle cx="250" cy="90" r="1" fill="#d4a95d" opacity="0.8" />
  </svg>
);
