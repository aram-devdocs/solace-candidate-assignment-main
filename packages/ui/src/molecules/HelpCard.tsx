import React from "react";

export interface HelpCardProps {
  title: string;
  desktopImage: string;
  desktopFillImage: string;
  mobileImage: string;
  mobileFillImage: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Help card component with hover animation
 *
 * Displays an illustration card that animates on hover with a color fill effect
 *
 * @param title - Card title displayed at top of card
 * @param desktopImage - Base outline image for desktop view
 * @param desktopFillImage - Colored fill image for desktop view (shows on hover)
 * @param mobileImage - Base outline image for mobile view
 * @param mobileFillImage - Colored fill image for mobile view (shows on hover)
 * @param onClick - Callback when card is clicked
 * @param className - Optional additional CSS classes
 */
export const HelpCard: React.FC<HelpCardProps> = ({
  title,
  desktopImage,
  desktopFillImage,
  mobileImage,
  mobileFillImage,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-lg hover:bg-primary-600 group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 transition-all duration-500 hover:shadow-md ${className}`}
    >
      {/* Circular background wipe from bottom-right */}
      <div className="pointer-events-none absolute -bottom-20 -right-8 h-[350px] w-[350px] rounded-full bg-neutral-100 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-20 group-hover:translate-y-20 group-hover:opacity-100" />

      {/* Title at top */}
      <h3 className="mb-lg relative z-10 text-left text-lg font-medium text-neutral-900 transition-colors duration-500 group-hover:text-white">
        {title}
      </h3>

      {/* Desktop illustration - hidden on mobile */}
      <div className="relative hidden md:block">
        <img src={desktopImage} alt={title} width={290} height={290} className="relative z-10" />
        <div
          className="absolute inset-0 z-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ transform: "translate(0px, 5px)" }}
        >
          <img src={desktopFillImage} alt="" width={290} height={290} />
        </div>
      </div>

      {/* Mobile illustration - visible only on mobile */}
      <div className="relative md:hidden">
        <img src={mobileImage} alt={title} width={358} height={112} className="relative z-10" />
        <div
          className="absolute inset-0 z-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ transform: "translate(0px, 5px)" }}
        >
          <img src={mobileFillImage} alt="" width={358} height={112} />
        </div>
      </div>
    </button>
  );
};
