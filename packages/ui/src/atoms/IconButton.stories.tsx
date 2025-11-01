import type { Meta, StoryObj } from "@storybook/react";
import { Bell, MessageSquare, Settings, Trash2, Plus, X } from "lucide-react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: Bell,
    variant: "primary",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    icon: MessageSquare,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    icon: Settings,
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    icon: X,
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    icon: Bell,
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    icon: Bell,
    size: "md",
  },
};

export const Large: Story = {
  args: {
    icon: Bell,
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    icon: Bell,
    disabled: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={Bell} variant="primary" />
      <IconButton icon={Bell} variant="secondary" />
      <IconButton icon={Bell} variant="ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={Bell} size="sm" />
      <IconButton icon={Bell} size="md" />
      <IconButton icon={Bell} size="lg" />
    </div>
  ),
};

export const HeaderActions: Story = {
  render: () => (
    <div className="bg-primary-700 flex items-center gap-3 rounded-lg p-4">
      <IconButton
        icon={MessageSquare}
        variant="primary"
        className="hover:bg-primary-800 bg-transparent"
      />
      <IconButton icon={Bell} variant="primary" className="hover:bg-primary-800 bg-transparent" />
      <IconButton
        icon={Settings}
        variant="primary"
        className="hover:bg-primary-800 bg-transparent"
      />
    </div>
  ),
};

export const Actions: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton icon={Plus} variant="primary" aria-label="Add" />
      <IconButton icon={Settings} variant="secondary" aria-label="Settings" />
      <IconButton icon={Trash2} variant="ghost" aria-label="Delete" />
    </div>
  ),
};
