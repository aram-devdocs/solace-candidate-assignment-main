import type { Meta, StoryObj } from "@storybook/react";

import { MorningIllustration } from "./MorningIllustration";

const meta = {
  title: "Atoms/Illustrations/MorningIllustration",
  component: MorningIllustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MorningIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default morning illustration with sun rising over hills
 */
export const Default: Story = {};

/**
 * Morning illustration in a container to show responsiveness
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
