import type { Meta, StoryObj } from "@storybook/react";

import { CustomIcon } from "./CustomIcon";

const meta = {
  title: "Atoms/CustomIcon",
  component: CustomIcon,
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
} satisfies Meta<typeof CustomIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Example gradient SVG for demonstrations
 */
const exampleGradientSvg = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="url(#example-gradient)" />
    <defs>
      <linearGradient id="example-gradient" x1="16" y1="2" x2="16" y2="30">
        <stop stopColor="#AFC8BF" />
        <stop offset="1" stopColor="#DEB260" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Example base SVG for demonstrations
 */
const exampleBaseSvg = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M16 8v8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Default state - inactive icon
 */
export const Inactive: Story = {
  args: {
    gradientSvg: exampleGradientSvg,
    baseSvg: exampleBaseSvg,
    active: false,
    width: 32,
    height: 32,
  },
};

/**
 * Active state - shows gradient overlay with transition
 */
export const Active: Story = {
  args: {
    gradientSvg: exampleGradientSvg,
    baseSvg: exampleBaseSvg,
    active: true,
    width: 32,
    height: 32,
  },
};

/**
 * Interactive example showing hover effect
 */
export const Interactive: Story = {
  args: {
    gradientSvg: exampleGradientSvg,
    baseSvg: exampleBaseSvg,
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
  args: {
    gradientSvg: exampleGradientSvg,
    baseSvg: exampleBaseSvg,
    active: false,
    width: 32,
    height: 32,
  },
  render: () => (
    <div className="flex items-end gap-8">
      <div className="text-center">
        <CustomIcon
          gradientSvg={exampleGradientSvg}
          baseSvg={exampleBaseSvg}
          width={24}
          height={24}
          active={false}
        />
        <p className="text-secondary-600 mt-2 text-xs">24x24</p>
      </div>
      <div className="text-center">
        <CustomIcon
          gradientSvg={exampleGradientSvg}
          baseSvg={exampleBaseSvg}
          width={32}
          height={32}
          active={false}
        />
        <p className="text-secondary-600 mt-2 text-xs">32x32</p>
      </div>
      <div className="text-center">
        <CustomIcon
          gradientSvg={exampleGradientSvg}
          baseSvg={exampleBaseSvg}
          width={48}
          height={48}
          active={false}
        />
        <p className="text-secondary-600 mt-2 text-xs">48x48</p>
      </div>
      <div className="text-center">
        <CustomIcon
          gradientSvg={exampleGradientSvg}
          baseSvg={exampleBaseSvg}
          width={64}
          height={64}
          active={false}
        />
        <p className="text-secondary-600 mt-2 text-xs">64x64</p>
      </div>
    </div>
  ),
};
