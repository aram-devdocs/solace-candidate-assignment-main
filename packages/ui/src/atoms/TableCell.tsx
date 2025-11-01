import React from "react";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  as?: "td" | "th";
}

/**
 * TableCell component for table data cells
 *
 * @param as - HTML element to render (td or th)
 * @param props - Standard HTML table cell attributes
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ as = "td", className = "", children, ...props }, ref) => {
    const Component = as;
    const baseClasses = "px-lg py-md text-left";
    const variantClasses = as === "th" ? "font-semibold" : "";

    return (
      <Component
        ref={ref as any}
        className={`${baseClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TableCell.displayName = "TableCell";
