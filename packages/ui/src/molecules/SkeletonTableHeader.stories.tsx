import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonTableHeader } from "./SkeletonTableHeader";

const meta: Meta<typeof SkeletonTableHeader> = {
  title: "Molecules/SkeletonTableHeader",
  component: SkeletonTableHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-secondary-200 overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse">
          <Story />
        </table>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
