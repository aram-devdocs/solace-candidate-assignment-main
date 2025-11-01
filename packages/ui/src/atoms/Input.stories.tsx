import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    variant: "default",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Enter text...",
    variant: "error",
    value: "Invalid input",
  },
};

export const WithValue: Story = {
  args: {
    value: "Sample text",
    variant: "default",
  },
};
