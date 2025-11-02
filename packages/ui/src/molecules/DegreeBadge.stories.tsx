import type { Meta, StoryObj } from "@storybook/react";
import { DegreeBadge } from "./DegreeBadge";

const meta = {
  title: "Molecules/DegreeBadge",
  component: DegreeBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DegreeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NonClickable: Story = {
  args: {
    degree: "MD",
    clickable: false,
  },
};

export const Clickable: Story = {
  args: {
    degree: "PhD",
    clickable: true,
    onClick: (degree) => console.log(`Clicked: ${degree}`),
  },
};

export const LongText: Story = {
  args: {
    degree: "PsyD",
    clickable: true,
    onClick: (degree) => console.log(`Clicked: ${degree}`),
  },
};

export const ShortText: Story = {
  args: {
    degree: "DO",
    clickable: false,
  },
};

export const MultipleBadges: Story = {
  render: () => (
    <div className="gap-xs flex flex-wrap">
      <DegreeBadge degree="MD" clickable={false} />
      <DegreeBadge degree="PhD" clickable={true} onClick={() => {}} />
      <DegreeBadge degree="PsyD" clickable={true} onClick={() => {}} />
      <DegreeBadge degree="MSW" clickable={false} />
      <DegreeBadge degree="LCSW" clickable={true} onClick={() => {}} />
    </div>
  ),
};

export const InTableCell: Story = {
  render: () => (
    <div className="border-secondary-200 p-md rounded-md border">
      <table className="w-full">
        <thead className="bg-secondary-50">
          <tr>
            <th className="p-sm text-left">Advocate</th>
            <th className="p-sm text-left">Degree</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-sm">Dr. Sarah Johnson</td>
            <td className="p-sm">
              <DegreeBadge degree="MD" clickable={true} onClick={() => {}} />
            </td>
          </tr>
          <tr>
            <td className="p-sm">Dr. Michael Chen</td>
            <td className="p-sm">
              <DegreeBadge degree="PhD" clickable={true} onClick={() => {}} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
