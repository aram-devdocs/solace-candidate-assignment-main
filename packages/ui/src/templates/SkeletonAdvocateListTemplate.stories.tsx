import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonAdvocateListTemplate } from "./SkeletonAdvocateListTemplate";

const meta = {
  title: "Templates/SkeletonAdvocateListTemplate",
  component: SkeletonAdvocateListTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonAdvocateListTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FewRows: Story = {
  args: {
    rowCount: 3,
  },
};

export const ManyRows: Story = {
  args: {
    rowCount: 15,
  },
};
