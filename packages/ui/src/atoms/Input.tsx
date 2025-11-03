import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
}

/**
 * Input component for text input fields
 *
 * @param variant - Visual variant of the input (default or error)
 * @param aria-label - Accessible label for screen readers (required if no visible label)
 * @param props - Standard HTML input attributes
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const baseClasses =
      "px-md py-sm rounded-md transition-colors bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100";
    const variantClasses = {
      default:
        "border border-secondary-400 dark:border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-700 dark:focus:ring-primary-400 focus:border-primary-700 dark:focus:border-primary-400",
      error:
        "border border-error-500 dark:border-error-400 focus:outline-none focus:ring-2 focus:ring-error-500 dark:focus:ring-error-400",
    };

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
