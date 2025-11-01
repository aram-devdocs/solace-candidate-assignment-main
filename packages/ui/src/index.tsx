/**
 * UI Component Library
 *
 * Reusable React components for the Solace application.
 * Components follow atomic design principles with design tokens.
 */

export { Input } from "./atoms/Input";
export type { InputProps } from "./atoms/Input";

export { Button } from "./atoms/Button";
export type { ButtonProps } from "./atoms/Button";

export { Text } from "./atoms/Text";
export type { TextProps } from "./atoms/Text";

export { TableCell } from "./atoms/TableCell";
export type { TableCellProps } from "./atoms/TableCell";

export { SearchBar } from "./molecules/SearchBar";
export type { SearchBarProps } from "./molecules/SearchBar";

export { TableHeader } from "./molecules/TableHeader";
export type { TableHeaderProps } from "./molecules/TableHeader";

export { TableRow } from "./molecules/TableRow";
export type { TableRowProps } from "./molecules/TableRow";

export { LoadingState } from "./molecules/LoadingState";
export type { LoadingStateProps } from "./molecules/LoadingState";

export { ErrorState } from "./molecules/ErrorState";
export type { ErrorStateProps } from "./molecules/ErrorState";

export { AdvocateTable } from "./organisms/AdvocateTable";
export type { AdvocateTableProps } from "./organisms/AdvocateTable";

export { AdvocateListTemplate } from "./templates/AdvocateListTemplate";
export type { AdvocateListTemplateProps } from "./templates/AdvocateListTemplate";
