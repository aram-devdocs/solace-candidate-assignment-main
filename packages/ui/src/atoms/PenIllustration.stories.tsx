import type { Meta, StoryObj } from "@storybook/react";
import { PenIllustration } from "./PenIllustration";

const meta: Meta<typeof PenIllustration> = {
  title: "Atoms/PenIllustration",
  component: PenIllustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PenIllustration>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    width: 100,
    height: 75,
  },
};

export const Large: Story = {
  args: {
    width: 300,
    height: 225,
  },
};
