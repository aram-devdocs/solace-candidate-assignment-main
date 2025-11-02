import type { Meta, StoryObj } from "@storybook/react";
import { ActiveFiltersBar } from "./ActiveFiltersBar";
import type { ActiveFilter } from "./ActiveFiltersBar";

const meta = {
  title: "Organisms/ActiveFiltersBar",
  component: ActiveFiltersBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveFiltersBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFilters: ActiveFilter[] = [
  { type: "degree", label: "MD", value: "MD" },
  { type: "city", label: "Boston", value: "Boston" },
  { type: "specialty", label: "PTSD", value: "PTSD" },
  { type: "specialty", label: "Anxiety", value: "Anxiety" },
  { type: "experience", label: "5-10 years" },
];

export const Default: Story = {
  args: {
    activeFilters: sampleFilters,
    resultCount: 42,
    onRemoveFilter: (type, value) => console.log(`Remove ${type}: ${value}`),
    onClearAll: () => console.log("Clear all filters"),
  },
};

export const NoFilters: Story = {
  args: {
    activeFilters: [],
    onRemoveFilter: () => {},
    onClearAll: () => {},
  },
};

export const SingleFilter: Story = {
  args: {
    activeFilters: [{ type: "city", label: "New York", value: "New York" }],
    resultCount: 18,
    onRemoveFilter: (type, value) => console.log(`Remove ${type}: ${value}`),
    onClearAll: () => console.log("Clear all filters"),
  },
};

export const ManyFilters: Story = {
  args: {
    activeFilters: [
      { type: "degree", label: "MD", value: "MD" },
      { type: "degree", label: "PhD", value: "PhD" },
      { type: "city", label: "Boston", value: "Boston" },
      { type: "city", label: "New York", value: "New York" },
      { type: "city", label: "San Francisco", value: "San Francisco" },
      { type: "specialty", label: "PTSD", value: "PTSD" },
      { type: "specialty", label: "Anxiety/Depression", value: "Anxiety" },
      { type: "specialty", label: "Substance Abuse", value: "Substance" },
      { type: "specialty", label: "Trauma Recovery", value: "Trauma" },
      { type: "experience", label: "10+ years" },
    ],
    resultCount: 127,
    onRemoveFilter: (type, value) => console.log(`Remove ${type}: ${value}`),
    onClearAll: () => console.log("Clear all filters"),
  },
};

export const WithoutResultCount: Story = {
  args: {
    activeFilters: sampleFilters,
    onRemoveFilter: (type, value) => console.log(`Remove ${type}: ${value}`),
    onClearAll: () => console.log("Clear all filters"),
  },
};

export const DifferentFilterTypes: Story = {
  args: {
    activeFilters: [
      { type: "degree", label: "MSW", value: "MSW" },
      { type: "city", label: "Chicago", value: "Chicago" },
      { type: "specialty", label: "Family Therapy", value: "Family" },
      { type: "experience", label: "2-5 years" },
    ],
    resultCount: 8,
    onRemoveFilter: (type, value) => console.log(`Remove ${type}: ${value}`),
    onClearAll: () => console.log("Clear all filters"),
  },
};
