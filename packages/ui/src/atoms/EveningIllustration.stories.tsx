import type { Meta, StoryObj } from "@storybook/react";

import { EveningIllustration } from "./EveningIllustration";

const meta = {
  title: "Atoms/Illustrations/EveningIllustration",
  component: EveningIllustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EveningIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default evening illustration with crescent moon and dark purple tones
 */
export const Default: Story = {};

/**
 * Evening illustration in a container to show responsiveness
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
