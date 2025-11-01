import React from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { ARIA_LABELS, A11Y_ROLES } from "../constants/accessibility";

export interface SearchBarProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onReset: () => void;
  placeholder?: string;
}

/**
 * SearchBar component combining input, button, and search term display
 * Responsive: stacks vertically on mobile, horizontal on tablet and up
 *
 * @param value - Current search value
 * @param onChange - Handler for input changes
 * @param onReset - Handler for reset button click
 * @param placeholder - Placeholder text for input
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onReset,
  placeholder = "Search...",
}) => {
  return (
    <div className="gap-md flex flex-col md:flex-row" role={A11Y_ROLES.search}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ARIA_LABELS.searchInput}
        className="flex-1"
      />
      <Button onClick={onReset} variant="secondary" className="md:whitespace-nowrap">
        <span className="md:hidden">Reset</span>
        <span className="hidden md:inline">Reset Search</span>
      </Button>
    </div>
  );
};
