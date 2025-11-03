import React from "react";

export interface SearchPillsProps {
  /**
   * Array of search tokens to display
   */
  tokens: string[];
  /**
   * Handler called when a token is removed
   */
  onRemove?: (token: string) => void; // eslint-disable-line no-unused-vars
  /**
   * Whether pills are removable
   */
  removable?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * SearchPills component for displaying parsed search tokens as removable badges
 * Shows individual search terms and quoted phrases as pills
 *
 * @param tokens - Array of search tokens from parseSearchTokens
 * @param onRemove - Optional handler called when pill is removed
 * @param removable - Whether pills should show remove button
 *
 * @example
 * ```tsx
 * <SearchPills
 *   tokens={['denver', 'sports medicine', 'vegan']}
 *   onRemove={(token) => handleRemoveToken(token)}
 *   removable={true}
 * />
 * ```
 */
export const SearchPills: React.FC<SearchPillsProps> = ({
  tokens,
  onRemove,
  removable = true,
  className = "",
}) => {
  if (!tokens || tokens.length === 0) {
    return null;
  }

  const handleRemove = (token: string): void => {
    if (removable && onRemove) {
      onRemove(token);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, token: string): void => {
    if (removable && onRemove && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onRemove(token);
    }
  };

  const isQuotedPhrase = (token: string): boolean => {
    return token.includes(" ");
  };

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`.trim()}
      role="list"
      aria-label="Search tokens"
    >
      {tokens.map((token, index) => {
        const baseClasses =
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border whitespace-nowrap shadow-xs";
        const colorClasses = isQuotedPhrase(token)
          ? "bg-secondary-50 text-secondary-700 border-secondary-200"
          : "bg-primary-50 text-primary-700 border-primary-200";

        if (removable && onRemove) {
          return (
            <div
              key={`${token}-${index}`}
              className={`${baseClasses} ${colorClasses}`.trim()}
              role="listitem"
            >
              {isQuotedPhrase(token) && (
                <svg
                  className="h-3 w-3 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              )}
              <span>{token}</span>
              <button
                type="button"
                onClick={() => handleRemove(token)}
                onKeyDown={(e) => handleKeyDown(e, token)}
                className="hover:bg-primary-200 focus:ring-primary-500 ml-0.5 inline-flex items-center justify-center rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
                aria-label={`Remove ${token} from search`}
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          );
        }

        return (
          <span
            key={`${token}-${index}`}
            className={`${baseClasses} ${colorClasses}`.trim()}
            role="listitem"
          >
            {isQuotedPhrase(token) && (
              <svg
                className="h-3 w-3 opacity-60"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            )}
            <span>{token}</span>
          </span>
        );
      })}
    </div>
  );
};
