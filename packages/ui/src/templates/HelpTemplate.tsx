import React from "react";
import { HelpCard } from "../molecules/HelpCard";

export interface HelpTemplateProps {
  className?: string;
  onHelpCenterClick?: () => void;
  onFaqClick?: () => void;
  onContactSupportClick?: () => void;
}

/**
 * Help template - page layout for help center
 *
 * Displays help title, cards for help resources, and contact support link
 *
 * @param className - Optional additional CSS classes
 * @param onHelpCenterClick - Callback when Help Center card is clicked
 * @param onFaqClick - Callback when FAQ card is clicked
 * @param onContactSupportClick - Callback when Contact Support link is clicked
 *
 * @example
 * ```tsx
 * import { HelpTemplate } from "@repo/ui";
 *
 * <HelpTemplate
 *   onHelpCenterClick={() => console.log('Help Center')}
 *   onFaqClick={() => console.log('FAQ')}
 *   onContactSupportClick={() => console.log('Contact Support')}
 * />
 * ```
 */
export const HelpTemplate: React.FC<HelpTemplateProps> = ({
  className = "",
  onHelpCenterClick,
  onFaqClick,
  onContactSupportClick,
}) => {
  return (
    <main className={`dark:bg-secondary-900 absolute inset-0 overflow-auto bg-white ${className}`}>
      <div className="p-md md:p-lg lg:p-xl">
        <h1 className="dark:text-secondary-100 font-serif text-4xl font-light text-neutral-900">
          We&apos;re here to help
        </h1>

        <p className="mt-md dark:text-secondary-100 text-base text-neutral-900">
          Have a question? Reach out to our team. We&apos;ll respond as soon as possible!
        </p>

        <div className="mt-xl gap-xl flex flex-col md:flex-row md:items-start">
          <HelpCard
            title="Solace Help Center"
            desktopImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-desktop.svg"
            desktopFillImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-desktop-fill.svg"
            mobileImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-mobile.svg"
            mobileFillImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-mobile-fill.svg"
            onClick={onHelpCenterClick}
            className="md:max-w-sm"
          />

          <HelpCard
            title="Frequently Asked Questions"
            desktopImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-desktop.svg"
            desktopFillImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-desktop-fill.svg"
            mobileImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-mobile.svg"
            mobileFillImage="https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-mobile-fill.svg"
            onClick={onFaqClick}
            className="md:max-w-sm"
          />
        </div>

        <p className="mt-2xl dark:text-secondary-100 text-base text-neutral-900">
          Not finding what you&apos;re looking for? Contact{" "}
          <button
            onClick={onContactSupportClick}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-normal underline"
          >
            Solace Support
          </button>
          .
        </p>
      </div>
    </main>
  );
};
