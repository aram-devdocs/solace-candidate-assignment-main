import type { Meta, StoryObj } from "@storybook/react";
import { TableHeader } from "./TableHeader";

const meta: Meta<typeof TableHeader> = {
  title: "Molecules/TableHeader",
  component: TableHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <table>
        <Story />
      </table>
    ),
  ],
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headers: ["Name", "Email", "Role"],
  },
};

export const AdvocateHeaders: Story = {
  args: {
    headers: [
      "First Name",
      "Last Name",
      "City",
      "Degree",
      "Specialties",
      "Years of Experience",
      "Phone Number",
    ],
  },
};
