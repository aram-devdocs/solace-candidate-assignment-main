import type { Meta, StoryObj } from "@storybook/react";
import { MessageThreadListEmptyState } from "./MessageThreadListEmptyState";

const meta: Meta<typeof MessageThreadListEmptyState> = {
  title: "Molecules/MessageThreadListEmptyState",
  component: MessageThreadListEmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MessageThreadListEmptyState>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: "bg-neutral-50",
  },
};
