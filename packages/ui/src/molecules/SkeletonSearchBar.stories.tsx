import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonSearchBar } from "./SkeletonSearchBar";

const meta = {
  title: "Molecules/SkeletonSearchBar",
  component: SkeletonSearchBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
