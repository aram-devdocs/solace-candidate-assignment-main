import { User } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Props for the Avatar component
 */
export interface AvatarProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Source URL for the avatar image
   */
  src?: string;
  /**
   * Alt text for the avatar image
   */
  alt?: string;
  /**
   * Initials to display when no image is provided
   */
  initials?: string;
  /**
   * Size variant for the avatar
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Whether to show a default user icon when no image/initials
   * @default true
   */
  showFallbackIcon?: boolean;
}

const SIZE_CLASSES = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-20 h-20 text-base",
  xl: "w-40 h-40 text-2xl",
};

/**
 * Avatar component - displays user profile image, initials, or fallback icon
 *
 * @example
 * ```tsx
 * import { Avatar } from "@repo/ui";
 *
 * // With image
 * <Avatar src="/avatar.jpg" alt="User" size="md" />
 *
 * // With initials
 * <Avatar initials="AH" size="md" />
 *
 * // Fallback icon
 * <Avatar size="md" />
 * ```
 */
export function Avatar({
  src,
  alt = "Avatar",
  initials,
  size = "md",
  showFallbackIcon = true,
  className = "",
  ...props
}: AvatarProps) {
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div
      className={`bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300 flex items-center justify-center overflow-hidden rounded-full ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : initials ? (
        <span className="font-bold uppercase">{initials}</span>
      ) : showFallbackIcon ? (
        <User className="text-primary-500 dark:text-primary-400 h-1/2 w-1/2" />
      ) : null}
    </div>
  );
}
