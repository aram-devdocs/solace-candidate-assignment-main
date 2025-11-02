import type { Meta, StoryObj } from "@storybook/react";
import { TableCell } from "./TableCell";

const meta: Meta<typeof TableCell> = {
  title: "Atoms/TableCell",
  component: TableCell,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <table>
        <tbody>
          <tr>
            <Story />
          </tr>
        </tbody>
      </table>
    ),
  ],
} satisfies Meta<typeof TableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataCell: Story = {
  args: {
    as: "td",
    children: "Table data",
  },
};

export const HeaderCell: Story = {
  args: {
    as: "th",
    children: "Table header",
  },
};

export const LeftAligned: Story = {
  args: {
    as: "td",
    children: "Left aligned text",
    align: "left",
  },
};

export const CenterAligned: Story = {
  args: {
    as: "td",
    children: "Center aligned text",
    align: "center",
  },
};

export const RightAligned: Story = {
  args: {
    as: "td",
    children: "Right aligned text",
    align: "right",
  },
};

export const NumericData: Story = {
  args: {
    as: "td",
    children: "42",
    align: "center",
  },
};
