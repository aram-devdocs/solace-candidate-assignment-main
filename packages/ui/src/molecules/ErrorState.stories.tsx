import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "Molecules/ErrorState",
  component: ErrorState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: "Failed to load data",
  },
};

export const NetworkError: Story = {
  args: {
    error: "Network connection failed",
  },
};
