import type { Meta, StoryObj } from "@storybook/react";
import { MessagePanelEmptyState } from "./MessagePanelEmptyState";

const meta: Meta<typeof MessagePanelEmptyState> = {
  title: "Molecules/MessagePanelEmptyState",
  component: MessagePanelEmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MessagePanelEmptyState>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: "bg-neutral-50",
  },
};
