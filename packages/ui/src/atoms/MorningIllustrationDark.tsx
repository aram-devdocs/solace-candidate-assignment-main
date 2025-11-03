import React from "react";

/**
 * Dark mode morning time illustration SVG component.
 * Displays a moon setting over dark hills with midnight forest colors.
 * Used in the Greeting component for morning time periods in dark mode.
 *
 * @example
 * ```tsx
 * <MorningIllustrationDark />
 * ```
 */
export const MorningIllustrationDark: React.FC = () => (
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
      <linearGradient id="morningDarkSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a1f1c" />
        <stop offset="100%" stopColor="#1a4239" />
      </linearGradient>
      <linearGradient id="morningDarkHills1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#275e50" />
        <stop offset="100%" stopColor="#1a4239" />
      </linearGradient>
      <linearGradient id="morningDarkHills2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a4239" />
        <stop offset="100%" stopColor="#0f2e28" />
      </linearGradient>
      <radialGradient id="morningDarkMoon" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4a95d" />
        <stop offset="70%" stopColor="#b8904a" />
        <stop offset="100%" stopColor="#8a6835" stopOpacity="0.3" />
      </radialGradient>
    </defs>

    {/* Sky background */}
    <rect width="683" height="300" fill="url(#morningDarkSky)" />

    {/* Back hills */}
    <path
      d="M0 250 Q170 180 340 200 T683 230 L683 300 L0 300 Z"
      fill="url(#morningDarkHills2)"
      opacity="0.6"
    />

    {/* Middle hills */}
    <path
      d="M0 280 Q140 220 280 240 T560 260 T683 270 L683 300 L0 300 Z"
      fill="url(#morningDarkHills1)"
      opacity="0.8"
    />

    {/* Front hills */}
    <path d="M0 290 Q100 260 200 275 T400 285 T683 295 L683 300 L0 300 Z" fill="#275e50" />

    {/* Moon with glow */}
    <circle cx="580" cy="120" r="50" fill="url(#morningDarkMoon)" opacity="0.9" />
    <circle cx="580" cy="120" r="50" fill="none" stroke="#d4a95d" strokeWidth="1" opacity="0.3" />

    {/* Stars */}
    <circle cx="100" cy="50" r="1.5" fill="#d4a95d" opacity="0.8" />
    <circle cx="150" cy="80" r="1" fill="#d4a95d" opacity="0.6" />
    <circle cx="200" cy="40" r="1.2" fill="#d4a95d" opacity="0.7" />
    <circle cx="450" cy="60" r="1" fill="#d4a95d" opacity="0.8" />
    <circle cx="500" cy="30" r="1.3" fill="#d4a95d" opacity="0.7" />
    <circle cx="250" cy="90" r="1" fill="#d4a95d" opacity="0.6" />
  </svg>
);
