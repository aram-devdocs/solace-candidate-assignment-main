// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { AreaCodeBadge } from "./AreaCodeBadge";

const meta: Meta<typeof AreaCodeBadge> = {
  title: "Molecules/AreaCodeBadge",
  component: AreaCodeBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof AreaCodeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    areaCode: "555",
    clickable: false,
  },
};

export const Clickable: Story = {
  args: {
    areaCode: "555",
    clickable: true,
  },
};

export const DifferentAreaCodes: Story = {
  render: () => (
    <div className="gap-sm flex flex-wrap">
      <AreaCodeBadge areaCode="202" clickable={true} />
      <AreaCodeBadge areaCode="415" clickable={true} />
      <AreaCodeBadge areaCode="555" clickable={true} />
      <AreaCodeBadge areaCode="917" clickable={true} />
      <AreaCodeBadge areaCode="310" clickable={true} />
    </div>
  ),
};

export const NonClickable: Story = {
  args: {
    areaCode: "212",
    clickable: false,
  },
};
