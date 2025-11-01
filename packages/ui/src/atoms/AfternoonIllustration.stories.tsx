import type { Meta, StoryObj } from "@storybook/react";

import { AfternoonIllustration } from "./AfternoonIllustration";

const meta = {
  title: "Atoms/Illustrations/AfternoonIllustration",
  component: AfternoonIllustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AfternoonIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default afternoon illustration with sun at its peak and radiant rays
 */
export const Default: Story = {};

/**
 * Afternoon illustration in a container to show responsiveness
 */
export const InContainer: Story = {
  decorators: [
    (Story) => (
      <div className="bg-greeting-background flex h-64 w-96 items-center justify-center rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};
