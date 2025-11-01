import React from "react";

/**
 * Props for the Greeting component
 */
export interface GreetingProps {
  /**
   * User's name to display in the greeting.
   * If not provided, displays a generic greeting without a name.
   */
  userName?: string;
  /**
   * Time period for the greeting (morning, afternoon, or evening).
   * Determines which illustration and greeting text to display.
   */
  timePeriod: "morning" | "afternoon" | "evening";
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
}

/**
 * Morning illustration SVG component
 */
const MorningSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="683"
    height="300"
    viewBox="0 0 683 300"
    fill="none"
    className="h-full w-auto"
    aria-hidden="true"
  >
    <mask
      id="mask0_19187_15778"
      maskUnits="userSpaceOnUse"
      x="70"
      y="-136"
      width="824"
      height="973"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M417.359 815.773C280.695 881.76 94.4218 775.027 72.2653 659.927C64.1312 617.673 79.3268 587.501 95.4381 555.511C107.471 531.619 120.014 506.713 123.731 475.001C130.56 416.75 127.001 395.873 119.755 353.365C115.082 325.948 108.874 289.532 102.93 228.286C101.739 216.005 100.529 204.432 99.3839 193.473C88.8747 92.9149 83.7652 44.024 147.248 -25.9445C202.762 -87.1295 293.588 -103.905 356.464 -115.519C364.145 -116.937 371.409 -118.279 378.14 -119.615C424.414 -128.8 467.762 -128.259 507.276 -121.499C512.841 -122.556 518.249 -123.555 523.466 -124.518C531.146 -125.937 538.41 -127.279 545.142 -128.615C717.301 -162.788 848.972 -62.3346 893.288 -7.83649C844.84 -4.1739 744.366 101.963 730.048 497.212C719.19 796.951 553.653 855.993 417.359 815.773Z"
        fill="#E9F0EE"
      />
    </mask>
    <g mask="url(#mask0_19187_15778)">
      <path
        d="M757.801 419.776C614.065 384.092 404.382 574.997 157.461 506.518C-14.7381 458.761 -92.9933 200.211 -91.7089 51.0666C-84.6453 -65.2142 15.0089 -95.7805 68.4179 -96.7774C161.328 -98.5116 610.212 -98.7416 929.432 19.1524C1248.65 137.046 1123.04 434.147 1007.18 401.956C891.313 369.765 836.908 439.415 757.801 419.776Z"
        fill="#F4E5CA"
      />
      <path
        d="M757.801 419.776C614.065 384.092 404.382 574.997 157.461 506.518C-14.7381 458.761 -92.9933 200.211 -91.7089 51.0666C-84.6453 -65.2142 15.0089 -95.7805 68.4179 -96.7774C161.328 -98.5116 610.212 -98.7416 929.432 19.1524C1248.65 137.046 1123.04 434.147 1007.18 401.956C891.313 369.765 836.908 439.415 757.801 419.776Z"
        fill="url(#paint0_radial_19187_15778)"
      />
      <line
        x1="840.828"
        y1="215.155"
        x2="497.463"
        y2="215.155"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="385.54"
        y1="215.155"
        x2="42.1748"
        y2="215.155"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="387.093"
        y1="200.619"
        x2="55.4273"
        y2="111.75"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="392.356"
        y1="186.986"
        x2="94.9925"
        y2="15.3031"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="400.963"
        y1="175.182"
        x2="158.167"
        y2="-67.6138"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="412.337"
        y1="166.011"
        x2="240.654"
        y2="-131.352"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="425.699"
        y1="160.074"
        x2="336.83"
        y2="-171.591"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="440.134"
        y1="157.817"
        x2="440.134"
        y2="-185.548"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="454.661"
        y1="159.367"
        x2="543.531"
        y2="-172.298"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="468.297"
        y1="164.644"
        x2="639.979"
        y2="-132.719"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="480.098"
        y1="173.25"
        x2="722.894"
        y2="-69.5463"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="489.271"
        y1="184.619"
        x2="786.634"
        y2="12.9362"
        stroke="white"
        strokeWidth="2.73315"
      />
      <line
        x1="495.192"
        y1="197.979"
        x2="826.857"
        y2="109.11"
        stroke="white"
        strokeWidth="2.73315"
      />
      <circle cx="429.876" cy="210.944" r="66.7925" fill="#E9CC95" />
      <path
        d="M385.579 204.192C388.865 207.329 397.947 210.824 407.984 199.711"
        stroke="#99582F"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M438.455 190.301C441.293 191.795 452.346 189.405 456.827 181.787"
        stroke="#99582F"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M422.731 189.42C421.837 195.461 419.62 207.658 417.332 212.56C417.043 213.181 417.422 213.98 418.106 214.021C423.493 214.346 433.186 213.55 438.528 208.128"
        stroke="#99582F"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M409.329 227.045C421.427 232.721 451.271 235.739 473.855 202.4"
        stroke="#99582F"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M456.95 239.685C352.855 206.135 399.883 173.338 270.953 157.505C168.755 144.955 111.032 247.825 94.391 302.273C84.4289 345.238 130.399 364.841 156.819 369.742C202.78 378.267 425.774 416.486 598.032 400.653C770.29 384.821 703.712 275.875 642.418 277.76C581.123 279.645 561.044 273.236 456.95 239.685Z"
        fill="url(#paint1_linear_19187_15778)"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_19187_15778"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(420.398 311.135) rotate(-87.3974) scale(305.921 307.204)"
      >
        <stop stopColor="#F5D59A" />
        <stop offset="1" stopColor="#F5E6CB" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_19187_15778"
        x1="400.501"
        y1="156.454"
        x2="400.501"
        y2="404.454"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CDBA96" />
        <stop offset="1" stopColor="#A38D63" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Afternoon illustration SVG component
 */
const AfternoonSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="683"
    height="300"
    viewBox="0 0 683 300"
    fill="none"
    className="h-full w-auto"
    aria-hidden="true"
  >
    <mask
      id="mask0_19187_15934"
      maskUnits="userSpaceOnUse"
      x="70"
      y="-136"
      width="824"
      height="973"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M417.359 815.772C280.695 881.759 94.4223 775.026 72.2657 659.927C64.1317 617.672 79.3273 587.5 95.4386 555.51C107.471 531.618 120.015 506.712 123.732 475C130.56 416.749 127.001 395.872 119.756 353.364C115.082 325.947 108.875 289.531 102.931 228.285C101.739 216.004 100.53 204.431 99.3844 193.472C88.8752 92.9139 83.7657 44.023 147.249 -25.9455C202.763 -87.1304 293.588 -103.906 356.464 -115.52C364.145 -116.938 371.409 -118.28 378.14 -119.616C424.414 -128.801 467.763 -128.26 507.276 -121.5C512.841 -122.557 518.25 -123.556 523.466 -124.519C531.147 -125.938 538.411 -127.28 545.142 -128.616C717.302 -162.789 848.973 -62.3356 893.288 -7.83746C844.841 -4.17488 744.366 101.962 730.049 497.211C719.191 796.95 553.653 855.992 417.359 815.772Z"
        fill="#E9F0EE"
      />
    </mask>
    <g mask="url(#mask0_19187_15934)">
      <path
        d="M757.801 419.775C614.065 384.091 404.382 574.996 157.461 506.517C-14.7381 458.76 -92.9933 200.21 -91.7089 51.0655C-84.6452 -65.2153 15.009 -95.7816 68.4179 -96.7785C161.328 -98.5127 610.212 -98.7428 929.432 19.1512C1248.65 137.045 1123.04 434.146 1007.18 401.955C891.313 369.764 836.908 439.414 757.801 419.775Z"
        fill="#F4E5CA"
      />
      <path
        d="M757.801 419.775C614.065 384.091 404.382 574.996 157.461 506.517C-14.7381 458.76 -92.9933 200.21 -91.7089 51.0655C-84.6452 -65.2153 15.009 -95.7816 68.4179 -96.7785C161.328 -98.5127 610.212 -98.7428 929.432 19.1512C1248.65 137.045 1123.04 434.146 1007.18 401.955C891.313 369.764 836.908 439.414 757.801 419.775Z"
        fill="url(#paint0_radial_19187_15934)"
        fillOpacity="0.4"
      />
      <g opacity="0.5">
        <line
          x1="838.829"
          y1="115.154"
          x2="495.464"
          y2="115.154"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="383.541"
          y1="115.154"
          x2="40.1758"
          y2="115.154"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="385.094"
          y1="100.618"
          x2="53.4283"
          y2="11.7489"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="390.357"
          y1="86.9848"
          x2="92.9935"
          y2="-84.6979"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="398.964"
          y1="75.1812"
          x2="156.168"
          y2="-167.615"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="410.338"
          y1="66.0099"
          x2="238.655"
          y2="-231.353"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="423.7"
          y1="60.0734"
          x2="334.831"
          y2="-271.592"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="438.135"
          y1="57.8164"
          x2="438.135"
          y2="-285.549"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="452.662"
          y1="59.366"
          x2="541.532"
          y2="-272.299"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="466.298"
          y1="64.6434"
          x2="637.98"
          y2="-232.72"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="478.099"
          y1="73.2485"
          x2="720.895"
          y2="-169.547"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="487.272"
          y1="84.6178"
          x2="784.635"
          y2="-87.0648"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          x1="493.193"
          y1="97.9783"
          x2="824.858"
          y2="9.10891"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(-0.965926 0.258819 0.258819 0.965926 384.447 130.94)"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(-0.866025 0.5 0.5 0.866025 390.039 144.438)"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 398.929 156.024)"
          stroke="#DEB260"
          strokeWidth="2.73315"
          fill="none"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(-0.5 0.866025 0.866025 0.5 410.521 164.912)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(-0.258819 0.965926 0.965926 0.258819 424.02 170.519)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(6.09509e-07 1 1 -2.43803e-08 438.5 172.422)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(0.258819 0.965926 0.965926 -0.258819 452.981 170.519)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(0.5 0.866025 0.866025 -0.5 466.48 164.912)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(0.707107 0.707107 0.707107 -0.707107 478.065 156.024)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(0.866025 0.5 0.5 -0.866025 486.955 144.438)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
        <line
          y1="-1.36658"
          x2="343.365"
          y2="-1.36658"
          transform="matrix(0.965926 0.258819 0.258819 -0.965926 492.546 130.94)"
          stroke="#DEB260"
          strokeWidth="2.73315"
        />
      </g>
      <circle cx="429.876" cy="110.943" r="66.7925" fill="#DEB260" />
      <path
        d="M380.999 114.782C384.285 117.919 393.367 121.414 403.404 110.301"
        stroke="#A77D2D"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M433.875 100.891C436.713 102.385 447.766 99.9947 452.247 92.377"
        stroke="#A77D2D"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M418.151 100.01C417.256 106.051 415.04 118.248 412.752 123.15C412.463 123.771 412.842 124.57 413.526 124.611C418.913 124.936 428.606 124.14 433.948 118.718"
        stroke="#A77D2D"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M404.749 137.635C416.847 143.311 446.691 146.328 469.275 112.99"
        stroke="#A77D2D"
        strokeWidth="2.68861"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M456.949 239.684C352.855 206.134 399.882 173.337 270.953 157.504C168.755 144.954 111.032 247.825 94.3908 302.272C84.4286 345.237 130.399 364.84 156.819 369.741C202.779 378.266 425.774 416.485 598.032 400.652C770.29 384.82 703.712 275.874 642.417 277.759C581.123 279.644 561.044 273.235 456.949 239.684Z"
        fill="url(#paint1_linear_19187_15934)"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_19187_15934"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(422 121) rotate(-1.52462) scale(263.093 220.567)"
      >
        <stop stopColor="#FFCC6C" />
        <stop offset="1" stopColor="#F5E6CB" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_19187_15934"
        x1="400.501"
        y1="156.453"
        x2="400.501"
        y2="404.453"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EDCC8F" />
        <stop offset="1" stopColor="#BFA26C" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Evening illustration SVG component
 */
const EveningSVG: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="614"
    height="300"
    viewBox="0 0 614 300"
    fill="none"
    className="h-full w-auto"
    aria-hidden="true"
  >
    <mask id="mask0_20197_12476" maskUnits="userSpaceOnUse" x="0" y="-143" width="824" height="972">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M347.357 808.32C210.693 874.307 24.4203 767.574 2.26379 652.475C-5.87026 610.22 9.32531 580.048 25.4366 548.058C37.4694 524.166 50.0129 499.26 53.73 467.549C60.5581 409.297 56.9995 388.42 49.7536 345.912C45.0801 318.495 38.8728 282.079 32.929 220.833C31.7372 208.552 30.5277 196.979 29.3824 186.02C18.8732 85.4621 13.7637 36.5712 77.2469 -33.3973C132.761 -94.5822 223.586 -111.358 286.462 -122.971C294.143 -124.39 301.407 -125.732 308.138 -127.068C354.411 -136.253 397.76 -135.712 437.273 -128.952C442.838 -130.009 448.246 -131.008 453.462 -131.971C461.143 -133.39 468.407 -134.732 475.138 -136.068C647.298 -170.241 778.969 -69.7878 823.285 -15.2896C774.837 -11.627 674.363 94.5103 660.045 489.759C649.187 789.497 483.651 848.54 347.357 808.32Z"
        fill="#E9F0EE"
      />
    </mask>
    <g mask="url(#mask0_20197_12476)">
      <path
        d="M583.112 331.814C464.604 302.393 291.724 459.791 88.1421 403.331C-53.8336 363.957 -118.354 150.786 -117.295 27.819C-111.471 -68.0527 -29.3076 -93.254 14.7272 -94.076C91.3303 -95.5058 461.428 -95.6954 724.619 1.50623C987.81 98.7079 884.245 343.662 788.718 317.121C693.19 290.58 648.334 348.006 583.112 331.814Z"
        fill="url(#paint0_radial_20197_12476)"
      />
      <path
        d="M488.12 195.076C487.157 195.366 486.612 196.382 486.902 197.345C487.192 198.308 488.208 198.854 489.171 198.563C490.134 198.273 490.68 197.257 490.389 196.294C490.099 195.331 489.083 194.786 488.12 195.076Z"
        fill="#F2F2F2"
      />
      <path
        d="M352.482 115.419C347.878 94.5831 358.5 66.1688 372.833 49.001C368.131 49.065 363.447 49.6097 358.856 50.6267C321.824 58.8181 298.444 95.4771 306.635 132.517C314.827 169.556 351.486 192.931 388.525 184.74C397.652 182.73 406.271 178.873 413.851 173.406C386.163 165.752 358.669 143.395 352.482 115.419Z"
        fill="#F4E5CA"
      />
      <path
        d="M328.104 116.668C330.374 117.816 336.581 121.763 343.585 115.742"
        stroke="#D7A13B"
        strokeWidth="2.36296"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M329.327 138.964C333.401 142.519 338.697 145.89 348.068 141.816"
        stroke="#D7A13B"
        strokeWidth="2.36296"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M346.436 97.001L357.14 126.338C357.3 126.778 357.057 127.263 356.609 127.397L349.288 129.594"
        stroke="#D7A13B"
        strokeWidth="2.36296"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M388.274 242.906C282.656 205.37 330.371 168.678 199.555 150.965C95.8615 136.924 37.2935 252.013 20.4092 312.927C10.3012 360.995 56.9444 382.926 83.751 388.409C130.384 397.947 356.642 440.706 531.421 422.992C706.199 405.279 638.647 283.394 576.456 285.502C514.264 287.611 493.891 280.441 388.274 242.906Z"
        fill="url(#paint2_linear_20197_12476)"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_20197_12476"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(391.499 106) rotate(-59.3646) scale(299.27 564.322)"
      >
        <stop stopColor="#522C40" />
        <stop offset="0.854167" stopColor="#522C40" stopOpacity="0.9" />
      </radialGradient>
      <linearGradient
        id="paint2_linear_20197_12476"
        x1="399.499"
        y1="140.5"
        x2="179.499"
        y2="394"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6F3C56" />
        <stop offset="1" stopColor="#522C40" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Greeting component that displays a personalized time-based greeting with an illustration.
 * Shows different illustrations for morning, afternoon, and evening.
 * Responsive: displays SVG on desktop and PNG on mobile devices.
 *
 * @example
 * ```tsx
 * <Greeting userName="John" timePeriod="morning" />
 * <Greeting timePeriod="afternoon" />
 * ```
 */
export const Greeting: React.FC<GreetingProps> = ({ userName, timePeriod, className = "" }) => {
  const greetingText = userName
    ? `Good ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}, ${userName}`
    : `Good ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}`;

  const svgComponent = {
    morning: <MorningSVG />,
    afternoon: <AfternoonSVG />,
    evening: <EveningSVG />,
  }[timePeriod];

  const imageSrc = `https://app.solace.health/images/${timePeriod}.png`;
  const imageAlt = timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1);

  return (
    <div
      className={`bg-greeting-background border-secondary-200 flex flex-col items-center justify-between overflow-hidden rounded-lg border shadow-md md:flex-row ${className}`}
    >
      {/* PNG for mobile - centered above text */}
      <img src={imageSrc} alt={imageAlt} width="64" height="64" className="mt-xl block md:hidden" />

      <h1 className="text-secondary-900 p-xl font-serif text-3xl font-bold">{greetingText}</h1>

      {/* SVG for desktop - full height */}
      <div className="hidden h-full md:block">{svgComponent}</div>
    </div>
  );
};
