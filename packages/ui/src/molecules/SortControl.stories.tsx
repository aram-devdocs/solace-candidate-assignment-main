import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SortControl } from "./SortControl";
import type { SortDirection } from "@repo/utils";

const meta = {
  title: "Molecules/SortControl",
  component: SortControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SortControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false);
    return (
      <SortControl
        isActive={isActive}
        direction={undefined}
        onToggle={() => setIsActive(true)}
        label="Name"
      />
    );
  },
};

export const ActiveAscending: Story = {
  render: () => {
    const [direction, setDirection] = useState<SortDirection>("asc");
    return (
      <SortControl
        isActive={true}
        direction={direction}
        onToggle={() => setDirection(direction === "asc" ? "desc" : "asc")}
        label="Name"
      />
    );
  },
};

export const ActiveDescending: Story = {
  render: () => {
    const [direction, setDirection] = useState<SortDirection>("desc");
    return (
      <SortControl
        isActive={true}
        direction={direction}
        onToggle={() => setDirection(direction === "asc" ? "desc" : "asc")}
        label="Name"
      />
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [direction, setDirection] = useState<SortDirection>("asc");
    return (
      <SortControl
        isActive={true}
        direction={direction}
        onToggle={() => setDirection(direction === "asc" ? "desc" : "asc")}
        label="Name"
        showLabel={false}
      />
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false);
    const [direction, setDirection] = useState<SortDirection>("asc");

    const handleToggle = () => {
      if (!isActive) {
        setIsActive(true);
        setDirection("asc");
      } else if (direction === "asc") {
        setDirection("desc");
      } else {
        setIsActive(false);
      }
    };

    return (
      <div className="p-md border-secondary-200 rounded-md border">
        <p className="mb-sm text-secondary-600 text-sm">Click to toggle sort:</p>
        <SortControl
          isActive={isActive}
          direction={isActive ? direction : undefined}
          onToggle={handleToggle}
          label="Years of Experience"
        />
        <p className="mt-sm text-secondary-500 text-xs">
          Status: {isActive ? `Active (${direction})` : "Inactive"}
        </p>
      </div>
    );
  },
};

export const InTableHeader: Story = {
  render: () => {
    const [activeColumn, setActiveColumn] = useState<string | null>("name");
    const [direction, setDirection] = useState<SortDirection>("asc");

    const handleSort = (column: string) => {
      if (activeColumn === column) {
        setDirection(direction === "asc" ? "desc" : "asc");
      } else {
        setActiveColumn(column);
        setDirection("asc");
      }
    };

    return (
      <table className="border-secondary-200 rounded-md border">
        <thead className="bg-secondary-50">
          <tr>
            <th className="p-sm">
              <SortControl
                isActive={activeColumn === "name"}
                direction={activeColumn === "name" ? direction : undefined}
                onToggle={() => handleSort("name")}
                label="Name"
              />
            </th>
            <th className="p-sm">
              <SortControl
                isActive={activeColumn === "experience"}
                direction={activeColumn === "experience" ? direction : undefined}
                onToggle={() => handleSort("experience")}
                label="Experience"
              />
            </th>
            <th className="p-sm">
              <SortControl
                isActive={activeColumn === "city"}
                direction={activeColumn === "city" ? direction : undefined}
                onToggle={() => handleSort("city")}
                label="City"
              />
            </th>
          </tr>
        </thead>
      </table>
    );
  },
};
