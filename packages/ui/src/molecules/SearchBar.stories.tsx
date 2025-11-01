import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    onReset: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => setValue("")}
      />
    );
  },
};

export const WithValue: Story = {
  args: {
    value: "John",
    onChange: () => {},
    onReset: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => setValue("")}
      />
    );
  },
};
