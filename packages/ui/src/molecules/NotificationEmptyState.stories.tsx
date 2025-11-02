import type { Meta, StoryObj } from "@storybook/react";
import { NotificationEmptyState } from "./NotificationEmptyState";

const meta: Meta<typeof NotificationEmptyState> = {
  title: "Molecules/NotificationEmptyState",
  component: NotificationEmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationEmptyState>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: "bg-neutral-50",
  },
};
