import React from "react";

/**
 * Dark mode evening time illustration SVG component.
 * Displays a deep midnight scene with stars and dark forest silhouettes.
 * Used in the Greeting component for evening time periods in dark mode.
 *
 * @example
 * ```tsx
 * <EveningIllustrationDark />
 * ```
 */
export const EveningIllustrationDark: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="614"
    height="300"
    viewBox="0 0 614 300"
    fill="none"
    className="h-full w-auto"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="eveningDarkSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a1f1c" />
        <stop offset="50%" stopColor="#0f2e28" />
        <stop offset="100%" stopColor="#1a4239" />
      </linearGradient>
      <linearGradient id="eveningDarkHills1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#275e50" />
        <stop offset="100%" stopColor="#1a4239" />
      </linearGradient>
      <linearGradient id="eveningDarkHills2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a4239" />
        <stop offset="100%" stopColor="#0f2e28" />
      </linearGradient>
      <radialGradient id="eveningDarkCrescent" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4a95d" />
        <stop offset="100%" stopColor="#b8904a" stopOpacity="0.5" />
      </radialGradient>
    </defs>

    {/* Deep night sky */}
    <rect width="614" height="300" fill="url(#eveningDarkSky)" />

    {/* Distant hills */}
    <path
      d="M0 260 Q150 200 300 220 T614 245 L614 300 L0 300 Z"
      fill="url(#eveningDarkHills2)"
      opacity="0.4"
    />

    {/* Middle hills */}
    <path
      d="M0 275 Q100 230 200 245 T400 260 T614 275 L614 300 L0 300 Z"
      fill="url(#eveningDarkHills1)"
      opacity="0.6"
    />

    {/* Foreground hills */}
    <path
      d="M0 288 Q80 265 160 275 T320 283 T614 292 L614 300 L0 300 Z"
      fill="#275e50"
      opacity="0.9"
    />

    {/* Crescent moon */}
    <circle cx="500" cy="90" r="40" fill="url(#eveningDarkCrescent)" opacity="0.9" />
    <circle cx="515" cy="90" r="38" fill="#0a1f1c" opacity="1" />
    <circle cx="500" cy="90" r="42" fill="none" stroke="#d4a95d" strokeWidth="0.5" opacity="0.2" />

    {/* Star field */}
    <circle cx="80" cy="40" r="1.5" fill="#f2d499" opacity="0.9" />
    <circle cx="130" cy="70" r="1" fill="#e5c279" opacity="0.7" />
    <circle cx="180" cy="50" r="1.3" fill="#f2d499" opacity="0.8" />
    <circle cx="230" cy="90" r="1" fill="#d4a95d" opacity="0.6" />
    <circle cx="280" cy="60" r="1.2" fill="#e5c279" opacity="0.8" />
    <circle cx="330" cy="100" r="1" fill="#f2d499" opacity="0.7" />
    <circle cx="380" cy="80" r="1.1" fill="#d4a95d" opacity="0.7" />
    <circle cx="430" cy="50" r="1.3" fill="#e5c279" opacity="0.8" />
    <circle cx="150" cy="120" r="1" fill="#f2d499" opacity="0.6" />
    <circle cx="250" cy="140" r="1.2" fill="#d4a95d" opacity="0.7" />
    <circle cx="350" cy="130" r="1" fill="#e5c279" opacity="0.8" />
    <circle cx="450" cy="140" r="1.1" fill="#f2d499" opacity="0.6" />

    {/* Twinkling effect - smaller stars */}
    <circle cx="200" cy="110" r="0.8" fill="#e5c279" opacity="0.5" />
    <circle cx="300" cy="35" r="0.8" fill="#f2d499" opacity="0.4" />
    <circle cx="400" cy="120" r="0.8" fill="#d4a95d" opacity="0.5" />
    <circle cx="100" cy="95" r="0.8" fill="#e5c279" opacity="0.6" />
  </svg>
);
