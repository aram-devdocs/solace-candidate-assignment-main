"use client";

import React, { useState } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { MultiSelect } from "../atoms/MultiSelect";
import { RangeInput } from "../atoms/RangeInput";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import type { MultiSelectOption } from "../atoms/MultiSelect";

export interface FilterPanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;
  /**
   * Callback to close the panel
   */
  onClose: () => void;
  /**
   * Current search term
   */
  searchTerm: string;
  /**
   * Callback for search term changes
   */
  onSearchChange: (value: string) => void; // eslint-disable-line no-unused-vars
  /**
   * Available degree options
   */
  availableDegrees: string[];
  /**
   * Selected degrees
   */
  selectedDegrees: string[];
  /**
   * Callback for degree selection changes
   */
  onDegreesChange: (degrees: string[]) => void; // eslint-disable-line no-unused-vars
  /**
   * Available city options
   */
  availableCities: string[];
  /**
   * Selected cities
   */
  selectedCities: string[];
  /**
   * Callback for city selection changes
   */
  onCitiesChange: (cities: string[]) => void; // eslint-disable-line no-unused-vars
  /**
   * Available specialty options
   */
  availableSpecialties: string[];
  /**
   * Selected specialties
   */
  selectedSpecialties: string[];
  /**
   * Callback for specialty selection changes
   */
  onSpecialtiesChange: (specialties: string[]) => void; // eslint-disable-line no-unused-vars
  /**
   * Available area code options
   */
  availableAreaCodes: string[];
  /**
   * Selected area codes
   */
  selectedAreaCodes: string[];
  /**
   * Callback for area code selection changes
   */
  onAreaCodesChange: (areaCodes: string[]) => void; // eslint-disable-line no-unused-vars
  /**
   * Minimum years of experience
   */
  minExperience: number | "";
  /**
   * Maximum years of experience
   */
  maxExperience: number | "";
  /**
   * Callback for min experience changes
   */
  onMinExperienceChange: (value: number | "") => void; // eslint-disable-line no-unused-vars
  /**
   * Callback for max experience changes
   */
  onMaxExperienceChange: (value: number | "") => void; // eslint-disable-line no-unused-vars
  /**
   * Callback to clear all filters
   */
  onClearAll: () => void;
  /**
   * Device size for responsive rendering
   */
  deviceSize?: "mobile" | "tablet" | "desktop";
}

/**
 * FilterPanel organism component for comprehensive advocate filtering
 * Collapsible panel with all filter controls
 * Responsive: Mobile (full screen overlay), Tablet/Desktop (side drawer)
 *
 * @param isOpen - Whether panel is visible
 * @param onClose - Handler to close panel
 * @param deviceSize - Current device size
 * ... (additional filter props)
 *
 * @example
 * ```tsx
 * <FilterPanel
 *   isOpen={filterPanelOpen}
 *   onClose={() => setFilterPanelOpen(false)}
 *   availableDegrees={["MD", "PhD", "MSW"]}
 *   selectedDegrees={selectedDegrees}
 *   onDegreesChange={setSelectedDegrees}
 *   deviceSize="desktop"
 * />
 * ```
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  availableDegrees,
  selectedDegrees,
  onDegreesChange,
  availableCities,
  selectedCities,
  onCitiesChange,
  availableSpecialties,
  selectedSpecialties,
  onSpecialtiesChange,
  availableAreaCodes,
  selectedAreaCodes,
  onAreaCodesChange,
  minExperience,
  maxExperience,
  onMinExperienceChange,
  onMaxExperienceChange,
  onClearAll,
  deviceSize = "desktop",
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    search: true,
    demographics: true,
    specialties: true,
    contact: true,
    experience: true,
  });

  const toggleSection = (section: string): void => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!isOpen) {
    return null;
  }

  const isMobile = deviceSize === "mobile";
  const panelClasses = isMobile
    ? "fixed inset-0 z-50 bg-white dark:bg-secondary-900 overflow-y-auto animate-slideInRight"
    : "fixed right-0 top-0 h-full z-50 bg-white dark:bg-secondary-900 shadow-2xl overflow-y-auto w-70 md:w-80 animate-slideInRight";

  const degreeOptions: MultiSelectOption[] = availableDegrees.map((degree) => ({
    value: degree,
    label: degree,
  }));

  const cityOptions: MultiSelectOption[] = availableCities.map((city) => ({
    value: city,
    label: city,
  }));

  const specialtyOptions: MultiSelectOption[] = availableSpecialties.map((specialty) => ({
    value: specialty,
    label: specialty,
  }));

  const areaCodeOptions: MultiSelectOption[] = (availableAreaCodes || []).map((code) => ({
    value: code,
    label: `(${code})`,
  }));

  return (
    <>
      {/* Overlay */}
      <div
        role="button"
        tabIndex={0}
        className="animate-fadeIn fixed inset-0 z-40 cursor-pointer bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label="Close filter panel"
      />

      {/* Panel */}
      <div className={panelClasses}>
        {/* Header */}
        <div className="border-secondary-200 dark:border-secondary-700 p-lg dark:bg-secondary-900 sticky top-0 flex items-center justify-between border-b bg-white">
          <div className="gap-sm flex items-center">
            <Filter className="text-primary-700 dark:text-primary-400 h-5 w-5" />
            <h2 className="text-secondary-900 dark:text-secondary-100 text-lg font-semibold">
              Filters
            </h2>
          </div>
          <IconButton
            icon={X}
            variant="ghost"
            size="md"
            onClick={onClose}
            aria-label="Close filters"
          />
        </div>

        {/* Filter Controls */}
        <div className="p-lg space-y-md">
          {/* Search Section */}
          <div className="border-secondary-200 dark:border-secondary-700 pb-md border-b">
            <button
              type="button"
              onClick={() => toggleSection("search")}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={openSections.search}
            >
              <h3 className="text-secondary-900 dark:text-secondary-100 text-sm font-semibold">
                Search
              </h3>
              {openSections.search ? (
                <ChevronUp className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              ) : (
                <ChevronDown className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              )}
            </button>
            {openSections.search && (
              <div className="mt-sm">
                <input
                  id="filter-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search advocates..."
                  className="px-md py-sm border-secondary-400 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-200 focus:ring-primary-700 dark:focus:ring-primary-500 focus:border-primary-700 dark:focus:border-primary-500 w-full rounded-md border focus:outline-none focus:ring-2"
                  aria-label="Search advocates"
                />
              </div>
            )}
          </div>

          {/* Demographics Section */}
          <div className="border-secondary-200 dark:border-secondary-700 pb-md border-b">
            <button
              type="button"
              onClick={() => toggleSection("demographics")}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={openSections.demographics}
            >
              <h3 className="text-secondary-900 dark:text-secondary-100 text-sm font-semibold">
                Demographics
              </h3>
              {openSections.demographics ? (
                <ChevronUp className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              ) : (
                <ChevronDown className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              )}
            </button>
            {openSections.demographics && (
              <div className="mt-sm space-y-md">
                <div className="space-y-sm">
                  <label
                    htmlFor="filter-degree"
                    className="text-secondary-700 dark:text-secondary-300 block text-xs font-medium"
                  >
                    Degree
                  </label>
                  <MultiSelect
                    options={degreeOptions}
                    value={selectedDegrees}
                    onChange={onDegreesChange}
                    placeholder="Select degrees"
                  />
                </div>
                <div className="space-y-sm">
                  <label
                    htmlFor="filter-city"
                    className="text-secondary-700 dark:text-secondary-300 block text-xs font-medium"
                  >
                    City
                  </label>
                  <MultiSelect
                    options={cityOptions}
                    value={selectedCities}
                    onChange={onCitiesChange}
                    placeholder="Select cities"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Specialties Section */}
          <div className="border-secondary-200 dark:border-secondary-700 pb-md border-b">
            <button
              type="button"
              onClick={() => toggleSection("specialties")}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={openSections.specialties}
            >
              <h3 className="text-secondary-900 dark:text-secondary-100 text-sm font-semibold">
                Specialties
              </h3>
              {openSections.specialties ? (
                <ChevronUp className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              ) : (
                <ChevronDown className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              )}
            </button>
            {openSections.specialties && (
              <div className="mt-sm">
                <MultiSelect
                  options={specialtyOptions}
                  value={selectedSpecialties}
                  onChange={onSpecialtiesChange}
                  placeholder="Select specialties"
                  maxHeight={250}
                />
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="border-secondary-200 dark:border-secondary-700 pb-md border-b">
            <button
              type="button"
              onClick={() => toggleSection("contact")}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={openSections.contact}
            >
              <h3 className="text-secondary-900 dark:text-secondary-100 text-sm font-semibold">
                Contact
              </h3>
              {openSections.contact ? (
                <ChevronUp className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              ) : (
                <ChevronDown className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              )}
            </button>
            {openSections.contact && (
              <div className="mt-sm space-y-sm">
                <label
                  htmlFor="filter-areaCode"
                  className="text-secondary-700 dark:text-secondary-300 block text-xs font-medium"
                >
                  Area Code
                </label>
                <MultiSelect
                  options={areaCodeOptions}
                  value={selectedAreaCodes}
                  onChange={onAreaCodesChange}
                  placeholder="Select area codes"
                />
              </div>
            )}
          </div>

          {/* Experience Section */}
          <div className="pb-md">
            <button
              type="button"
              onClick={() => toggleSection("experience")}
              className="flex w-full items-center justify-between text-left"
              aria-expanded={openSections.experience}
            >
              <h3 className="text-secondary-900 dark:text-secondary-100 text-sm font-semibold">
                Experience
              </h3>
              {openSections.experience ? (
                <ChevronUp className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              ) : (
                <ChevronDown className="text-secondary-600 dark:text-secondary-400 h-4 w-4" />
              )}
            </button>
            {openSections.experience && (
              <div className="mt-sm">
                <RangeInput
                  label="Years of Experience"
                  min={minExperience}
                  max={maxExperience}
                  onMinChange={onMinExperienceChange}
                  onMaxChange={onMaxExperienceChange}
                  minPlaceholder="Min"
                  maxPlaceholder="Max"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-secondary-200 dark:border-secondary-700 p-lg dark:bg-secondary-900 sticky bottom-0 border-t bg-white">
          <Button variant="secondary" onClick={onClearAll} className="w-full">
            Clear All Filters
          </Button>
        </div>
      </div>
    </>
  );
};
