import type { Meta, StoryObj } from "@storybook/react";

import { GoudNetworkLogo } from "./GoudNetworkLogo";

const meta = {
  title: "Atoms/Branding/GoudNetworkLogo",
  component: GoudNetworkLogo,
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
} satisfies Meta<typeof GoudNetworkLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Goud Network logo with white fill
 */
export const Default: Story = {
  args: {
    width: 140,
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
    width: 140,
    height: 24,
    fill: "#000",
  },
};

/**
 * Colored logo with primary brand color
 */
export const Colored: Story = {
  args: {
    width: 140,
    height: 24,
    fill: "#1e40af",
  },
};

/**
 * Different sizes demonstration
 */
export const Sizes: Story = {
  render: () => (
    <div className="bg-primary-600 flex flex-col items-start gap-8 rounded-lg p-8">
      <div className="flex items-center gap-4">
        <GoudNetworkLogo width={120} height={21} fill="#FFF" />
        <p className="text-xs text-white">Small (120x21)</p>
      </div>
      <div className="flex items-center gap-4">
        <GoudNetworkLogo width={180} height={32} fill="#FFF" />
        <p className="text-xs text-white">Default (180x32)</p>
      </div>
      <div className="flex items-center gap-4">
        <GoudNetworkLogo width={240} height={42} fill="#FFF" />
        <p className="text-xs text-white">Large (240x42)</p>
      </div>
      <div className="flex items-center gap-4">
        <GoudNetworkLogo width={300} height={53} fill="#FFF" />
        <p className="text-xs text-white">Extra Large (300x53)</p>
      </div>
    </div>
  ),
};
