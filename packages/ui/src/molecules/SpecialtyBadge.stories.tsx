import type { Meta, StoryObj } from "@storybook/react";
import { SpecialtyBadge } from "./SpecialtyBadge";

const meta = {
  title: "Molecules/SpecialtyBadge",
  component: SpecialtyBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpecialtyBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NonClickable: Story = {
  args: {
    specialty: "PTSD",
    clickable: false,
  },
};

export const Clickable: Story = {
  args: {
    specialty: "Anxiety/Depression",
    clickable: true,
    onClick: (specialty) => console.log(`Clicked: ${specialty}`),
  },
};

export const LongText: Story = {
  args: {
    specialty: "Trauma and PTSD Recovery",
    clickable: true,
    onClick: (specialty) => console.log(`Clicked: ${specialty}`),
  },
};

export const ShortText: Story = {
  args: {
    specialty: "OCD",
    clickable: false,
  },
};

export const MultipleBadges: Story = {
  render: () => (
    <div className="gap-xs flex flex-wrap">
      <SpecialtyBadge specialty="PTSD" clickable={false} />
      <SpecialtyBadge specialty="Anxiety" clickable={true} onClick={() => {}} />
      <SpecialtyBadge specialty="Depression" clickable={true} onClick={() => {}} />
      <SpecialtyBadge specialty="Substance Abuse" clickable={false} />
      <SpecialtyBadge specialty="Grief and Loss" clickable={true} onClick={() => {}} />
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
            <th className="p-sm text-left">Specialties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-sm">Dr. Sarah Johnson</td>
            <td className="p-sm">
              <div className="gap-xs flex flex-wrap">
                <SpecialtyBadge specialty="PTSD" clickable={true} onClick={() => {}} />
                <SpecialtyBadge specialty="Trauma" clickable={true} onClick={() => {}} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-sm">Dr. Michael Chen</td>
            <td className="p-sm">
              <div className="gap-xs flex flex-wrap">
                <SpecialtyBadge specialty="Anxiety" clickable={true} onClick={() => {}} />
                <SpecialtyBadge specialty="Depression" clickable={true} onClick={() => {}} />
                <SpecialtyBadge specialty="Family Therapy" clickable={true} onClick={() => {}} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
