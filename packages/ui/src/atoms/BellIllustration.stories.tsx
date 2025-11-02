import type { Meta, StoryObj } from "@storybook/react";
import { BellIllustration } from "./BellIllustration";

const meta: Meta<typeof BellIllustration> = {
  title: "Atoms/BellIllustration",
  component: BellIllustration,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BellIllustration>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    width: 100,
    height: 100,
  },
};

export const Large: Story = {
  args: {
    width: 300,
    height: 300,
  },
};
