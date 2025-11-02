import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterPanel } from "./FilterPanel";

const meta = {
  title: "Organisms/FilterPanel",
  component: FilterPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleDegrees = ["MD", "PhD", "PsyD", "MSW", "LCSW", "LMFT"];
const sampleCities = ["Boston", "New York", "San Francisco", "Chicago", "Los Angeles", "Seattle"];
const sampleSpecialties = [
  "PTSD",
  "Anxiety/Depression",
  "Substance Abuse",
  "Grief and Loss",
  "Trauma Recovery",
  "Family Therapy",
  "Couples Counseling",
  "Child Psychology",
];

export const Desktop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [minExp, setMinExp] = useState<number | "">("");
    const [maxExp, setMaxExp] = useState<number | "">("");

    return (
      <div style={{ height: "100vh", position: "relative" }}>
        <button
          onClick={() => setIsOpen(true)}
          className="m-md px-md py-sm bg-primary-700 rounded-md text-white"
        >
          Open Filter Panel
        </button>
        <FilterPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          availableDegrees={sampleDegrees}
          selectedDegrees={selectedDegrees}
          onDegreesChange={setSelectedDegrees}
          availableCities={sampleCities}
          selectedCities={selectedCities}
          onCitiesChange={setSelectedCities}
          availableSpecialties={sampleSpecialties}
          selectedSpecialties={selectedSpecialties}
          onSpecialtiesChange={setSelectedSpecialties}
          minExperience={minExp}
          maxExperience={maxExp}
          onMinExperienceChange={setMinExp}
          onMaxExperienceChange={setMaxExp}
          onClearAll={() => {
            setSearchTerm("");
            setSelectedDegrees([]);
            setSelectedCities([]);
            setSelectedSpecialties([]);
            setMinExp("");
            setMaxExp("");
          }}
          deviceSize="desktop"
        />
      </div>
    );
  },
};

export const Mobile: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [minExp, setMinExp] = useState<number | "">("");
    const [maxExp, setMaxExp] = useState<number | "">("");

    return (
      <div style={{ height: "100vh", position: "relative" }}>
        <button
          onClick={() => setIsOpen(true)}
          className="m-md px-md py-sm bg-primary-700 rounded-md text-white"
        >
          Open Filter Panel
        </button>
        <FilterPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          availableDegrees={sampleDegrees}
          selectedDegrees={selectedDegrees}
          onDegreesChange={setSelectedDegrees}
          availableCities={sampleCities}
          selectedCities={selectedCities}
          onCitiesChange={setSelectedCities}
          availableSpecialties={sampleSpecialties}
          selectedSpecialties={selectedSpecialties}
          onSpecialtiesChange={setSelectedSpecialties}
          minExperience={minExp}
          maxExperience={maxExp}
          onMinExperienceChange={setMinExp}
          onMaxExperienceChange={setMaxExp}
          onClearAll={() => {
            setSearchTerm("");
            setSelectedDegrees([]);
            setSelectedCities([]);
            setSelectedSpecialties([]);
            setMinExp("");
            setMaxExp("");
          }}
          deviceSize="mobile"
        />
      </div>
    );
  },
};

export const WithFiltersApplied: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("trauma");
    const [selectedDegrees, setSelectedDegrees] = useState<string[]>(["MD", "PhD"]);
    const [selectedCities, setSelectedCities] = useState<string[]>(["Boston"]);
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
      "PTSD",
      "Trauma Recovery",
    ]);
    const [minExp, setMinExp] = useState<number | "">(5);
    const [maxExp, setMaxExp] = useState<number | "">(10);

    return (
      <div style={{ height: "100vh", position: "relative" }}>
        <button
          onClick={() => setIsOpen(true)}
          className="m-md px-md py-sm bg-primary-700 rounded-md text-white"
        >
          Open Filter Panel
        </button>
        <FilterPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          availableDegrees={sampleDegrees}
          selectedDegrees={selectedDegrees}
          onDegreesChange={setSelectedDegrees}
          availableCities={sampleCities}
          selectedCities={selectedCities}
          onCitiesChange={setSelectedCities}
          availableSpecialties={sampleSpecialties}
          selectedSpecialties={selectedSpecialties}
          onSpecialtiesChange={setSelectedSpecialties}
          minExperience={minExp}
          maxExperience={maxExp}
          onMinExperienceChange={setMinExp}
          onMaxExperienceChange={setMaxExp}
          onClearAll={() => {
            setSearchTerm("");
            setSelectedDegrees([]);
            setSelectedCities([]);
            setSelectedSpecialties([]);
            setMinExp("");
            setMaxExp("");
          }}
          deviceSize="desktop"
        />
      </div>
    );
  },
};
