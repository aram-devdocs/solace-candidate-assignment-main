import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

/**
 * Button component for user actions
 *
 * @param variant - Visual variant of the button (primary or secondary)
 * @param props - Standard HTML button attributes
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...props }, ref) => {
    const baseClasses =
      "px-lg py-sm rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    const variantClasses = {
      primary:
        "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 focus-visible:ring-primary-500 dark:bg-primary-500 dark:text-secondary-900 dark:hover:bg-primary-400 dark:active:bg-primary-300",
      secondary:
        "bg-secondary-200 text-secondary-900 hover:bg-secondary-300 active:bg-secondary-400 focus-visible:ring-secondary-500 dark:bg-secondary-700 dark:text-secondary-100 dark:hover:bg-secondary-600 dark:active:bg-secondary-500",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
