import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
}

/**
 * Input component for text input fields
 *
 * @param variant - Visual variant of the input (default or error)
 * @param props - Standard HTML input attributes
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", className = "", ...props }, ref) => {
    const baseClasses = "px-md py-sm rounded-md transition-colors";
    const variantClasses = {
      default:
        "border border-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-primary-700",
      error: "border border-error-500 focus:outline-none focus:ring-2 focus:ring-error-500",
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
