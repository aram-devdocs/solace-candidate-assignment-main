import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiSelect } from "./MultiSelect";
import type { MultiSelectOption } from "./MultiSelect";

const meta = {
  title: "Atoms/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "300px", minHeight: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: MultiSelectOption[] = [
  { value: "ptsd", label: "PTSD" },
  { value: "anxiety", label: "Anxiety/Depression" },
  { value: "substance", label: "Substance Abuse" },
  { value: "grief", label: "Grief and Loss" },
  { value: "trauma", label: "Trauma Recovery" },
  { value: "family", label: "Family Therapy" },
  { value: "couples", label: "Couples Counseling" },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={sampleOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select specialties"
      />
    );
  },
};

export const WithPreselectedValues: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["ptsd", "anxiety"]);
    return (
      <MultiSelect
        options={sampleOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select specialties"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["ptsd"]);
    return (
      <MultiSelect
        options={sampleOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select specialties"
        disabled
      />
    );
  },
};

export const CustomMaxHeight: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={sampleOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select specialties"
        maxHeight={150}
      />
    );
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const manyOptions: MultiSelectOption[] = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    }));
    return (
      <MultiSelect
        options={manyOptions}
        value={selected}
        onChange={setSelected}
        placeholder="Select from many options"
      />
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={[]}
        value={selected}
        onChange={setSelected}
        placeholder="No options available"
      />
    );
  },
};
