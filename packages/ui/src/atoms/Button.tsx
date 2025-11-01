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
    const baseClasses = "px-lg py-sm rounded-md font-medium transition-colors";
    const variantClasses = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
      secondary:
        "bg-secondary-200 text-secondary-900 hover:bg-secondary-300 active:bg-secondary-400",
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
