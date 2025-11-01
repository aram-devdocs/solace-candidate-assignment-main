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

function SearchBarWrapper({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  return (
    <SearchBar
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onReset={() => setValue("")}
    />
  );
}

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    onReset: () => {},
  },
  render: () => <SearchBarWrapper />,
};

export const WithValue: Story = {
  args: {
    value: "John",
    onChange: () => {},
    onReset: () => {},
  },
  render: () => <SearchBarWrapper initialValue="John" />,
};
