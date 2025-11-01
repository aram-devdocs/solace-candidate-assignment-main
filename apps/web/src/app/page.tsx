"use client";

import { usePathname } from "next/navigation";
import { useAdvocateSearch } from "@repo/hooks";
import { AppLayout, AdvocateListTemplate } from "@repo/ui";
import { NAVIGATION_ITEMS } from "../constants/navigation";

export default function Home() {
  const pathname = usePathname();
  const { searchTerm, filteredAdvocates, isLoading, error, handleSearchChange, handleResetSearch } =
    useAdvocateSearch();

  return (
    <AppLayout
      navigationItems={NAVIGATION_ITEMS}
      currentPath={pathname}
      userInitials="AH"
      messageCount={3}
      notificationCount={5}
    >
      <AdvocateListTemplate
        advocates={filteredAdvocates}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onResetSearch={handleResetSearch}
        isLoading={isLoading}
        error={error || undefined}
      />
    </AppLayout>
  );
}
