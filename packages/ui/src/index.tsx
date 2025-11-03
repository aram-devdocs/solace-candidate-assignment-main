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

export { Icon } from "./atoms/Icon";
export type { IconProps } from "./atoms/Icon";

export { CustomIcon } from "./atoms/CustomIcon";
export type { CustomIconProps } from "./atoms/CustomIcon";

export { Toast } from "./atoms/Toast";
export type { ToastProps } from "./atoms/Toast";

export { ToastContainer } from "./atoms/ToastContainer";
export type { ToastContainerProps } from "./atoms/ToastContainer";

export { LoadingSpinner } from "./atoms/LoadingSpinner";
export type { LoadingSpinnerProps } from "./atoms/LoadingSpinner";

export { Avatar } from "./atoms/Avatar";
export type { AvatarProps } from "./atoms/Avatar";

export { Badge } from "./atoms/Badge";
export type { BadgeProps } from "./atoms/Badge";

export { StatusBadge } from "./atoms/StatusBadge";
export type { StatusBadgeProps } from "./atoms/StatusBadge";

export { IconButton } from "./atoms/IconButton";
export type { IconButtonProps } from "./atoms/IconButton";

export { SolaceLogo } from "./atoms/SolaceLogo";
export type { SolaceLogoProps } from "./atoms/SolaceLogo";

export { HomeIcon } from "./atoms/HomeIcon";
export type { HomeIconProps } from "./atoms/HomeIcon";

export { MessagesIcon } from "./atoms/MessagesIcon";
export type { MessagesIconProps } from "./atoms/MessagesIcon";

export { NotesIcon } from "./atoms/NotesIcon";
export type { NotesIconProps } from "./atoms/NotesIcon";

export { FormsIcon } from "./atoms/FormsIcon";
export type { FormsIconProps } from "./atoms/FormsIcon";

export { HealthInsuranceIcon } from "./atoms/HealthInsuranceIcon";
export type { HealthInsuranceIconProps } from "./atoms/HealthInsuranceIcon";

export { HelpIcon } from "./atoms/HelpIcon";
export type { HelpIconProps } from "./atoms/HelpIcon";

export { MorningIllustration } from "./atoms/MorningIllustration";
export { AfternoonIllustration } from "./atoms/AfternoonIllustration";
export { EveningIllustration } from "./atoms/EveningIllustration";

export { BellIllustration } from "./atoms/BellIllustration";
export type { BellIllustrationProps } from "./atoms/BellIllustration";

export { PenIllustration } from "./atoms/PenIllustration";
export type { PenIllustrationProps } from "./atoms/PenIllustration";

export { DecorativeWavesSvg } from "./atoms/DecorativeWavesSvg";

export { SkeletonLine } from "./atoms/SkeletonLine";
export type { SkeletonLineProps } from "./atoms/SkeletonLine";

export { Select } from "./atoms/Select";
export type { SelectProps, SelectOption } from "./atoms/Select";

export { SelectDropdown } from "./atoms/SelectDropdown";
export type { SelectDropdownProps, SelectDropdownOption } from "./atoms/SelectDropdown";

export { MultiSelect } from "./atoms/MultiSelect";
export type { MultiSelectProps, MultiSelectOption } from "./atoms/MultiSelect";

export { RangeInput } from "./atoms/RangeInput";
export type { RangeInputProps } from "./atoms/RangeInput";

export { FilterChip } from "./atoms/FilterChip";
export type { FilterChipProps } from "./atoms/FilterChip";

export { SearchBar } from "./molecules/SearchBar";
export type { SearchBarProps } from "./molecules/SearchBar";

export { SearchPills } from "./molecules/SearchPills";
export type { SearchPillsProps } from "./molecules/SearchPills";

export { SearchHelpTooltip } from "./atoms/SearchHelpTooltip";
export type { SearchHelpTooltipProps } from "./atoms/SearchHelpTooltip";

export { TableHeader } from "./molecules/TableHeader";
export type { TableHeaderProps } from "./molecules/TableHeader";

export { TableRow } from "./molecules/TableRow";
export type { TableRowProps } from "./molecules/TableRow";

export { LoadingState } from "./molecules/LoadingState";
export type { LoadingStateProps } from "./molecules/LoadingState";

export { ErrorState } from "./molecules/ErrorState";
export type { ErrorStateProps } from "./molecules/ErrorState";

export { ErrorBoundaryFallback } from "./molecules/ErrorBoundary";
export type { ErrorBoundaryFallbackProps } from "./molecules/ErrorBoundary";

export { NotFoundState } from "./molecules/NotFoundState";
export type { NotFoundStateProps } from "./molecules/NotFoundState";

export { NavigationItem } from "./molecules/NavigationItem";
export type { NavigationItemProps } from "./molecules/NavigationItem";

export { NavigationMenu } from "./molecules/NavigationMenu";
export type { NavigationMenuProps } from "./molecules/NavigationMenu";

export { Header } from "./molecules/Header";
export type { HeaderProps } from "./molecules/Header";

export { Footer } from "./molecules/Footer";
export type { FooterProps } from "./molecules/Footer";

export { Greeting } from "./molecules/Greeting";
export type { GreetingProps } from "./molecules/Greeting";

export { TemplateHeader } from "./molecules/TemplateHeader";
export type { TemplateHeaderProps } from "./molecules/TemplateHeader";

export { NotificationEmptyState } from "./molecules/NotificationEmptyState";
export type { NotificationEmptyStateProps } from "./molecules/NotificationEmptyState";

export { MessageThreadListEmptyState } from "./molecules/MessageThreadListEmptyState";
export type { MessageThreadListEmptyStateProps } from "./molecules/MessageThreadListEmptyState";

export { MessagePanelEmptyState } from "./molecules/MessagePanelEmptyState";
export type { MessagePanelEmptyStateProps } from "./molecules/MessagePanelEmptyState";

export { NotesEmptyState } from "./molecules/NotesEmptyState";
export type { NotesEmptyStateProps } from "./molecules/NotesEmptyState";

export { FormsEmptyState } from "./molecules/FormsEmptyState";
export type { FormsEmptyStateProps } from "./molecules/FormsEmptyState";

export { HealthInsuranceEmptyState } from "./molecules/HealthInsuranceEmptyState";
export type { HealthInsuranceEmptyStateProps } from "./molecules/HealthInsuranceEmptyState";

export { HelpCard } from "./molecules/HelpCard";
export type { HelpCardProps } from "./molecules/HelpCard";

export { SkeletonSearchBar } from "./molecules/SkeletonSearchBar";

export { SkeletonTableHeader } from "./molecules/SkeletonTableHeader";

export { SkeletonTableRow } from "./molecules/SkeletonTableRow";

export { SkeletonGreeting } from "./molecules/SkeletonGreeting";
export type { SkeletonGreetingProps } from "./molecules/SkeletonGreeting";

export { Pagination } from "./molecules/Pagination";
export type { PaginationProps } from "./molecules/Pagination";

export { PageSizeSelector } from "./molecules/PageSizeSelector";
export type { PageSizeSelectorProps } from "./molecules/PageSizeSelector";

export { SortControl } from "./molecules/SortControl";
export type { SortControlProps } from "./molecules/SortControl";

export { SpecialtyBadge } from "./molecules/SpecialtyBadge";
export type { SpecialtyBadgeProps } from "./molecules/SpecialtyBadge";

export { CityBadge } from "./molecules/CityBadge";
export type { CityBadgeProps } from "./molecules/CityBadge";

export { DegreeBadge } from "./molecules/DegreeBadge";
export type { DegreeBadgeProps } from "./molecules/DegreeBadge";

export { AreaCodeBadge } from "./molecules/AreaCodeBadge";
export type { AreaCodeBadgeProps } from "./molecules/AreaCodeBadge";

export { PhoneNumberDisplay } from "./molecules/PhoneNumberDisplay";
export type { PhoneNumberDisplayProps } from "./molecules/PhoneNumberDisplay";

export { AdvocateTable } from "./organisms/AdvocateTable";
export type { AdvocateTableProps } from "./organisms/AdvocateTable";

export { RootLayout } from "./organisms/RootLayout";
export type { RootLayoutProps } from "./organisms/RootLayout";

export { SkeletonAdvocateTable } from "./organisms/SkeletonAdvocateTable";
export type { SkeletonAdvocateTableProps } from "./organisms/SkeletonAdvocateTable";

export { FilterPanel } from "./organisms/FilterPanel";
export type { FilterPanelProps } from "./organisms/FilterPanel";

export { ActiveFiltersBar } from "./organisms/ActiveFiltersBar";
export type { ActiveFiltersBarProps, ActiveFilter } from "./organisms/ActiveFiltersBar";

export { NotificationDrawer } from "./organisms/NotificationDrawer";
export type { NotificationDrawerProps } from "./organisms/NotificationDrawer";

export { ProfileDropdown } from "./organisms/ProfileDropdown";
export type { ProfileDropdownProps } from "./organisms/ProfileDropdown";

export { AdvocateListTemplate } from "./templates/AdvocateListTemplate";
export type { AdvocateListTemplateProps } from "./templates/AdvocateListTemplate";

export { MessagesTemplate } from "./templates/MessagesTemplate";
export type { MessagesTemplateProps } from "./templates/MessagesTemplate";

export { NotesTemplate } from "./templates/NotesTemplate";
export type { NotesTemplateProps } from "./templates/NotesTemplate";

export { FormsTemplate } from "./templates/FormsTemplate";
export type { FormsTemplateProps } from "./templates/FormsTemplate";

export { HealthInsuranceTemplate } from "./templates/HealthInsuranceTemplate";
export type { HealthInsuranceTemplateProps } from "./templates/HealthInsuranceTemplate";

export { HelpTemplate } from "./templates/HelpTemplate";
export type { HelpTemplateProps } from "./templates/HelpTemplate";

export { AppLayout } from "./templates/AppLayout";
export type { AppLayoutProps } from "./templates/AppLayout";

export { SkeletonAdvocateListTemplate } from "./templates/SkeletonAdvocateListTemplate";
export type { SkeletonAdvocateListTemplateProps } from "./templates/SkeletonAdvocateListTemplate";

export { COMPANY_NAME, FOOTER_COPYRIGHT, FOOTER_COPYRIGHT_WITH_RIGHTS } from "./constants/footer";

export {
  MAX_DROPDOWN_HEIGHT,
  FILTER_PANEL_WIDTH_MOBILE,
  FILTER_PANEL_WIDTH_TABLET,
  FILTER_PANEL_WIDTH_DESKTOP,
  MAX_VISIBLE_PAGE_NUMBERS,
  DEFAULT_TABLE_PAGE_SIZE,
} from "./constants/layout";

export { BREAKPOINTS, getDeviceSize, type DeviceSize } from "@repo/utils";

export {
  ADVOCATE_TABLE_COLUMNS,
  ADVOCATE_TABLE_HEADERS,
  EXPANDABLE_COLUMNS,
} from "./constants/table";
export type { AdvocateColumnKey } from "./constants/table";

export { ARIA_LABELS, SR_ANNOUNCEMENTS, A11Y_ROLES } from "./constants/accessibility";
