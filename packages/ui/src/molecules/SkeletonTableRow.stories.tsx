import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonTableRow } from "./SkeletonTableRow";
import { SkeletonTableHeader } from "./SkeletonTableHeader";

const meta: Meta<typeof SkeletonTableRow> = {
  title: "Molecules/SkeletonTableRow",
  component: SkeletonTableRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-secondary-200 overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse">
          <SkeletonTableHeader />
          <tbody>
            <Story />
          </tbody>
        </table>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MultipleRows: Story = {
  render: () => (
    <>
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
      <SkeletonTableRow />
    </>
  ),
};
