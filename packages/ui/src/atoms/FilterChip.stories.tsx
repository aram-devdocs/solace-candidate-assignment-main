import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "./FilterChip";

const meta = {
  title: "Atoms/FilterChip",
  component: FilterChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "degree", "city", "specialty", "experience"],
      description: "Visual variant of the chip based on filter type",
    },
    label: {
      control: "text",
      description: "Text to display in the chip",
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Filter Value",
    variant: "default",
    onRemove: () => console.log("Remove clicked"),
  },
};

export const Primary: Story = {
  args: {
    label: "Primary Filter",
    variant: "primary",
    onRemove: () => console.log("Remove clicked"),
  },
};

export const Degree: Story = {
  args: {
    label: "MD",
    variant: "degree",
    onRemove: () => console.log("Remove degree filter"),
  },
};

export const City: Story = {
  args: {
    label: "New York",
    variant: "city",
    onRemove: () => console.log("Remove city filter"),
  },
};

export const Specialty: Story = {
  args: {
    label: "PTSD",
    variant: "specialty",
    onRemove: () => console.log("Remove specialty filter"),
  },
};

export const Experience: Story = {
  args: {
    label: "5-10 years",
    variant: "experience",
    onRemove: () => console.log("Remove experience filter"),
  },
};

export const LongLabel: Story = {
  args: {
    label: "Very Long Filter Label That Might Wrap",
    variant: "specialty",
    onRemove: () => console.log("Remove clicked"),
  },
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="gap-sm flex flex-wrap">
      <FilterChip label="Default" variant="default" onRemove={() => {}} />
      <FilterChip label="Primary" variant="primary" onRemove={() => {}} />
      <FilterChip label="MD" variant="degree" onRemove={() => {}} />
      <FilterChip label="Boston" variant="city" onRemove={() => {}} />
      <FilterChip label="Anxiety" variant="specialty" onRemove={() => {}} />
      <FilterChip label="3+ years" variant="experience" onRemove={() => {}} />
    </div>
  ),
};
