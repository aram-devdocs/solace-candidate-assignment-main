import type { Meta, StoryObj } from "@storybook/react";
import { SelectDropdown } from "./SelectDropdown";

const meta = {
  title: "Atoms/SelectDropdown",
  component: SelectDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof SelectDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const pageOptions = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const degreeOptions = [
  { value: "md", label: "MD" },
  { value: "do", label: "DO" },
  { value: "phd", label: "PhD" },
  { value: "pharmd", label: "PharmD" },
  { value: "np", label: "NP" },
  { value: "pa", label: "PA" },
];

export const Default: Story = {
  args: {
    options: pageOptions,
    value: "10",
    placeholder: "Select an option",
    ariaLabel: "Select page size",
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: degreeOptions,
    value: "",
    placeholder: "Select degree",
    ariaLabel: "Select degree type",
  },
};

export const Selected: Story = {
  args: {
    options: pageOptions,
    value: "25",
    ariaLabel: "Items per page",
  },
};

export const Disabled: Story = {
  args: {
    options: pageOptions,
    value: "10",
    disabled: true,
    ariaLabel: "Disabled select",
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    value: "5",
    ariaLabel: "Select from many options",
  },
};

export const CustomWidth: Story = {
  args: {
    options: pageOptions,
    value: "10",
    className: "w-32",
    ariaLabel: "Custom width select",
  },
};
