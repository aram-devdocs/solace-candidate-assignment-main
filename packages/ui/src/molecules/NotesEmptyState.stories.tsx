import type { Meta, StoryObj } from "@storybook/react";
import { NotesEmptyState } from "./NotesEmptyState";

const meta: Meta<typeof NotesEmptyState> = {
  title: "Molecules/NotesEmptyState",
  component: NotesEmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotesEmptyState>;

export const Default: Story = {
  args: {},
};

export const WithCustomClassName: Story = {
  args: {
    className: "bg-neutral-50",
  },
};
