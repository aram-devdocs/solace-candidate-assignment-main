import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "error"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Error: Story = {
  args: {
    children: "Error",
    variant: "error",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const SpecialtyTags: Story = {
  render: () => (
    <div className="flex max-w-md flex-wrap gap-2">
      <Badge variant="primary">Cardiology</Badge>
      <Badge variant="primary">Oncology</Badge>
      <Badge variant="primary">Pediatrics</Badge>
      <Badge variant="primary">Neurology</Badge>
      <Badge variant="primary">Orthopedics</Badge>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="success" size="sm">
          Active
        </Badge>
        <span className="text-sm">User is currently active</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="error" size="sm">
          Inactive
        </Badge>
        <span className="text-sm">User is inactive</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="default" size="sm">
          Pending
        </Badge>
        <span className="text-sm">User registration pending</span>
      </div>
    </div>
  ),
};
