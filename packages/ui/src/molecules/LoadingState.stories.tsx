import type { Meta, StoryObj } from "@storybook/react";
import { LoadingState } from "./LoadingState";

const meta = {
  title: "Molecules/LoadingState",
  component: LoadingState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: "Loading advocates...",
  },
};
