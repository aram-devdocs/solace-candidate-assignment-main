import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonLine } from "./SkeletonLine";

const meta = {
  title: "Atoms/SkeletonLine",
  component: SkeletonLine,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomWidth: Story = {
  args: {
    width: "200px",
  },
};

export const CustomHeight: Story = {
  args: {
    height: "2rem",
  },
};

export const FullyRounded: Story = {
  args: {
    rounded: "full",
    height: "2.5rem",
  },
};

export const LargeRounded: Story = {
  args: {
    rounded: "xl",
    height: "3rem",
    width: "300px",
  },
};

export const MultipleLines: Story = {
  render: () => (
    <div className="space-y-2">
      <SkeletonLine width="100%" />
      <SkeletonLine width="80%" />
      <SkeletonLine width="90%" />
      <SkeletonLine width="60%" />
    </div>
  ),
};

export const TextParagraph: Story = {
  render: () => (
    <div className="space-y-3">
      <SkeletonLine height="1.5rem" width="100%" />
      <SkeletonLine height="1rem" width="100%" />
      <SkeletonLine height="1rem" width="95%" />
      <SkeletonLine height="1rem" width="88%" />
      <SkeletonLine height="1rem" width="75%" />
    </div>
  ),
};
