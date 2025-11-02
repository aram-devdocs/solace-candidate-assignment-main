import type { Meta, StoryObj } from "@storybook/react";
import { FormsEmptyState } from "./FormsEmptyState";

const meta: Meta<typeof FormsEmptyState> = {
  title: "Molecules/FormsEmptyState",
  component: FormsEmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormsEmptyState>;

export const Default: Story = {
  args: {},
};
