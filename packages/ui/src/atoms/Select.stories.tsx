import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";
import type { SelectOption } from "./Select";

const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "250px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const pageSizeOptions: SelectOption[] = [
  { value: "10", label: "10 per page" },
  { value: "25", label: "25 per page" },
  { value: "50", label: "50 per page" },
  { value: "100", label: "100 per page" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        options={pageSizeOptions}
        value={value}
        onChange={setValue}
        placeholder="Select page size"
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("25");
    return (
      <Select
        options={pageSizeOptions}
        value={value}
        onChange={setValue}
        placeholder="Select page size"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("25");
    return (
      <Select
        options={pageSizeOptions}
        value={value}
        onChange={setValue}
        placeholder="Select page size"
        disabled
      />
    );
  },
};

export const ErrorVariant: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select
        options={pageSizeOptions}
        value={value}
        onChange={setValue}
        placeholder="Select page size"
        variant="error"
      />
    );
  },
};

export const FewOptions: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const options: SelectOption[] = [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ];
    return <Select options={options} value={value} onChange={setValue} placeholder="Choose" />;
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const options: SelectOption[] = Array.from({ length: 30 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    }));
    return (
      <Select options={options} value={value} onChange={setValue} placeholder="Select an option" />
    );
  },
};
