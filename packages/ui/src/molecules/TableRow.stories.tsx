import type { Meta, StoryObj } from "@storybook/react";
import { TableRow } from "./TableRow";

const meta: Meta<typeof TableRow> = {
  title: "Molecules/TableRow",
  component: TableRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <table>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cells: ["John Doe", "john@example.com", "Admin"],
  },
};

export const WithComplexContent: Story = {
  args: {
    cells: [
      "Jane",
      "Smith",
      "New York",
      "PhD",
      <div key="specialties">
        <div>Specialty 1</div>
        <div>Specialty 2</div>
      </div>,
      "10",
      "555-1234",
    ],
  },
};

export const WithCenterAlignedCell: Story = {
  args: {
    cells: [
      "Jane Smith",
      "jane@example.com",
      { content: "42", align: "center" as const },
      "Active",
    ],
  },
};

export const WithExpandableContent: Story = {
  args: {
    cells: ["Jane", "Smith", "New York"],
    expandableCells: [
      { label: "Degree", content: "PhD" },
      { label: "Specialties", content: "Cardiology, Internal Medicine" },
      { label: "Years of Experience", content: "10" },
      { label: "Phone Number", content: "(555) 123-4567" },
    ],
    isExpanded: false,
  },
};

export const WithExpandedContent: Story = {
  args: {
    cells: ["Jane", "Smith", "New York"],
    expandableCells: [
      { label: "Degree", content: "PhD" },
      { label: "Specialties", content: "Cardiology, Internal Medicine" },
      { label: "Years of Experience", content: "10" },
      { label: "Phone Number", content: "(555) 123-4567" },
    ],
    isExpanded: true,
  },
};
