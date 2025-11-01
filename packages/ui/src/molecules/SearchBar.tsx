import React from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";

export interface SearchBarProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onReset: () => void;
  placeholder?: string;
}

/**
 * SearchBar component combining input, button, and search term display
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
    <div className="space-y-md">
      <Text as="p" variant="body">
        Search
      </Text>
      <Text as="p" variant="small" color="secondary">
        Searching for: {value}
      </Text>
      <div className="gap-md flex">
        <Input value={value} onChange={onChange} placeholder={placeholder} />
        <Button onClick={onReset} variant="secondary">
          Reset Search
        </Button>
      </div>
    </div>
  );
};
