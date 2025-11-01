import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonAdvocateTable } from "./SkeletonAdvocateTable";

const meta = {
  title: "Organisms/SkeletonAdvocateTable",
  component: SkeletonAdvocateTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonAdvocateTable>;

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
