import type { Meta, StoryObj } from "@storybook/react";

import { FormsIcon } from "./FormsIcon";

const meta = {
  title: "Atoms/Icons/FormsIcon",
  component: FormsIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
      description: "Whether the icon is in active/hover state",
    },
    width: {
      control: "number",
      description: "Icon width in pixels",
    },
    height: {
      control: "number",
      description: "Icon height in pixels",
    },
  },
} satisfies Meta<typeof FormsIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state - inactive icon
 */
export const Inactive: Story = {
  args: {
    active: false,
    width: 32,
    height: 36,
  },
};

/**
 * Active state - shows gradient overlay with transition
 */
export const Active: Story = {
  args: {
    active: true,
    width: 32,
    height: 36,
  },
};

/**
 * Interactive example showing hover effect
 */
export const Interactive: Story = {
  args: {
    active: false,
    width: 48,
    height: 48,
  },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-4">
        <div>
          <p className="text-secondary-600 mb-2 text-sm">Hover over the icon:</p>
          <div className="inline-block cursor-pointer transition-transform hover:scale-110">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

/**
 * Different sizes demonstration
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="text-center">
        <FormsIcon width={24} height={24} active={false} />
        <p className="text-secondary-600 mt-2 text-xs">24x24</p>
      </div>
      <div className="text-center">
        <FormsIcon width={32} height={36} active={false} />
        <p className="text-secondary-600 mt-2 text-xs">32x36</p>
      </div>
      <div className="text-center">
        <FormsIcon width={48} height={48} active={false} />
        <p className="text-secondary-600 mt-2 text-xs">48x48</p>
      </div>
      <div className="text-center">
        <FormsIcon width={64} height={64} active={false} />
        <p className="text-secondary-600 mt-2 text-xs">64x64</p>
      </div>
    </div>
  ),
};
