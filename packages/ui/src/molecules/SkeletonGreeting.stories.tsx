import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonGreeting } from "./SkeletonGreeting";

const meta = {
  title: "Molecules/SkeletonGreeting",
  component: SkeletonGreeting,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonGreeting>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default skeleton greeting state showing the loading placeholder
 */
export const Default: Story = {
  args: {},
};

/**
 * Skeleton greeting at mobile viewport (icon above text)
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Skeleton greeting at tablet viewport (icon on right side)
 */
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

/**
 * Skeleton greeting at desktop viewport (full illustration on right)
 */
export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
