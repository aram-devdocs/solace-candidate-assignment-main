import React from "react";

type TableCellElement = "td" | "th";

export interface TableCellProps {
  as?: TableCellElement;
  children?: React.ReactNode;
  className?: string;
}

/**
 * TableCell component for table data cells
 * Does not support ref forwarding to maintain type safety across polymorphic elements
 *
 * @param as - HTML element to render (td or th)
 * @param props - Standard HTML table cell attributes
 */
export function TableCell({
  as = "td",
  className = "",
  children,
  ...props
}: TableCellProps & Omit<React.TdHTMLAttributes<HTMLTableCellElement>, keyof TableCellProps>) {
  const Component = as;
  const baseClasses = "px-lg py-md text-left";
  const variantClasses = Component === "th" ? "font-semibold" : "";

  return (
    <Component className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </Component>
  );
}
