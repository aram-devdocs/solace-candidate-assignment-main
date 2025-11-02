import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RangeInput } from "./RangeInput";

const meta = {
  title: "Atoms/RangeInput",
  component: RangeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [min, setMin] = useState<number | "">("");
    const [max, setMax] = useState<number | "">("");
    return (
      <RangeInput
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        minPlaceholder="Min"
        maxPlaceholder="Max"
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [min, setMin] = useState<number | "">("");
    const [max, setMax] = useState<number | "">("");
    return (
      <RangeInput
        label="Years of Experience"
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        minPlaceholder="Min"
        maxPlaceholder="Max"
      />
    );
  },
};

export const WithValues: Story = {
  render: () => {
    const [min, setMin] = useState<number | "">(5);
    const [max, setMax] = useState<number | "">(10);
    return (
      <RangeInput
        label="Years of Experience"
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        minPlaceholder="Min"
        maxPlaceholder="Max"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [min, setMin] = useState<number | "">(5);
    const [max, setMax] = useState<number | "">(10);
    return (
      <RangeInput
        label="Years of Experience"
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        minPlaceholder="Min"
        maxPlaceholder="Max"
        disabled
      />
    );
  },
};

export const MinOnly: Story = {
  render: () => {
    const [min, setMin] = useState<number | "">(5);
    const [max, setMax] = useState<number | "">("");
    return (
      <RangeInput
        label="Minimum Experience"
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        minPlaceholder="Min"
        maxPlaceholder="Max"
      />
    );
  },
};

export const MaxOnly: Story = {
  render: () => {
    const [min, setMin] = useState<number | "">("");
    const [max, setMax] = useState<number | "">(10);
    return (
      <RangeInput
        label="Maximum Experience"
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        minPlaceholder="Min"
        maxPlaceholder="Max"
      />
    );
  },
};

export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "250px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [min, setMin] = useState<number | "">("");
    const [max, setMax] = useState<number | "">("");
    return (
      <RangeInput
        label="Experience Range"
        min={min}
        max={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        minPlaceholder="Min"
        maxPlaceholder="Max"
      />
    );
  },
};
