import type { Meta, StoryObj } from "@storybook/react";

import { SolaceLogo } from "./SolaceLogo";

const meta = {
  title: "Atoms/Branding/SolaceLogo",
  component: SolaceLogo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "number",
      description: "Logo width in pixels",
    },
    height: {
      control: "number",
      description: "Logo height in pixels",
    },
    fill: {
      control: "color",
      description: "Fill color for the logo",
    },
  },
} satisfies Meta<typeof SolaceLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Solace logo with white fill
 */
export const Default: Story = {
  args: {
    width: 86,
    height: 24,
    fill: "#FFF",
  },
  decorators: [
    (Story) => (
      <div className="bg-primary-600 rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Dark logo variant on light background
 */
export const Dark: Story = {
  args: {
    width: 86,
    height: 24,
    fill: "#000",
  },
};

/**
 * Colored logo with primary brand color
 */
export const Colored: Story = {
  args: {
    width: 86,
    height: 24,
    fill: "#275E50",
  },
};

/**
 * Different sizes demonstration
 */
export const Sizes: Story = {
  render: () => (
    <div className="bg-primary-600 flex flex-col items-start gap-8 rounded-lg p-8">
      <div className="flex items-center gap-4">
        <SolaceLogo width={64} height={18} fill="#FFF" />
        <p className="text-xs text-white">Small (64x18)</p>
      </div>
      <div className="flex items-center gap-4">
        <SolaceLogo width={86} height={24} fill="#FFF" />
        <p className="text-xs text-white">Default (86x24)</p>
      </div>
      <div className="flex items-center gap-4">
        <SolaceLogo width={128} height={36} fill="#FFF" />
        <p className="text-xs text-white">Large (128x36)</p>
      </div>
      <div className="flex items-center gap-4">
        <SolaceLogo width={172} height={48} fill="#FFF" />
        <p className="text-xs text-white">Extra Large (172x48)</p>
      </div>
    </div>
  ),
};
