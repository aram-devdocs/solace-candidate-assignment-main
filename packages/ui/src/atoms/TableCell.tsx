import React from "react";

type TableCellElement = "td" | "th";
type TextAlign = "left" | "center" | "right";

export interface TableCellProps {
  as?: TableCellElement;
  children?: React.ReactNode;
  className?: string;
  scope?: "col" | "row";
  align?: TextAlign;
}

/**
 * TableCell component for table data cells
 * Does not support ref forwarding to maintain type safety across polymorphic elements
 *
 * @param as - HTML element to render (td or th)
 * @param scope - Scope attribute for th elements (col or row)
 * @param align - Text alignment (left, center, right). Defaults to left
 * @param props - Standard HTML table cell attributes
 */
export function TableCell({
  as = "td",
  className = "",
  children,
  scope,
  align = "left",
  ...props
}: TableCellProps & Omit<React.TdHTMLAttributes<HTMLTableCellElement>, keyof TableCellProps>) {
  const Component = as;
  const alignmentMap: Record<TextAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const baseClasses = `px-md py-sm md:px-lg md:py-md ${alignmentMap[align]}`;
  const variantClasses = Component === "th" ? "font-semibold" : "";

  return (
    <Component
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...(Component === "th" && scope ? { scope } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}
