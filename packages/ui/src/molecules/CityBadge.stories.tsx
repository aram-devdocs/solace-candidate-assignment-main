import type { Meta, StoryObj } from "@storybook/react";
import { CityBadge } from "./CityBadge";

const meta = {
  title: "Molecules/CityBadge",
  component: CityBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NonClickable: Story = {
  args: {
    city: "Boston",
    clickable: false,
  },
};

export const Clickable: Story = {
  args: {
    city: "New York",
    clickable: true,
    onClick: (city) => console.log(`Clicked: ${city}`),
  },
};

export const LongText: Story = {
  args: {
    city: "San Francisco",
    clickable: true,
    onClick: (city) => console.log(`Clicked: ${city}`),
  },
};

export const ShortText: Story = {
  args: {
    city: "LA",
    clickable: false,
  },
};

export const MultipleBadges: Story = {
  render: () => (
    <div className="gap-xs flex flex-wrap">
      <CityBadge city="Boston" clickable={false} />
      <CityBadge city="New York" clickable={true} onClick={() => {}} />
      <CityBadge city="Chicago" clickable={true} onClick={() => {}} />
      <CityBadge city="Seattle" clickable={false} />
      <CityBadge city="San Francisco" clickable={true} onClick={() => {}} />
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
            <th className="p-sm text-left">City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-sm">Dr. Sarah Johnson</td>
            <td className="p-sm">
              <CityBadge city="Boston" clickable={true} onClick={() => {}} />
            </td>
          </tr>
          <tr>
            <td className="p-sm">Dr. Michael Chen</td>
            <td className="p-sm">
              <CityBadge city="New York" clickable={true} onClick={() => {}} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
