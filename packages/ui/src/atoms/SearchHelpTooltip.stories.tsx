// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { SearchHelpTooltip } from "./SearchHelpTooltip";

const meta: Meta<typeof SearchHelpTooltip> = {
  title: "Atoms/SearchHelpTooltip",
  component: SearchHelpTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SearchHelpTooltip>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: "ml-4",
  },
};

export const InContext: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-4">
      <input
        type="text"
        placeholder="Search advocates..."
        className="focus:border-primary-500 focus:ring-primary-500 flex-1 rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2"
      />
      <SearchHelpTooltip />
    </div>
  ),
};
