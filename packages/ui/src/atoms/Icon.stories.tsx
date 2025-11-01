import type { Meta, StoryObj } from "@storybook/react";
import { Home, MessageSquare, Bell, Settings, User, Search, Heart } from "lucide-react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "error", "success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Home,
    size: "md",
    color: "default",
  },
};

export const Primary: Story = {
  args: {
    icon: Heart,
    size: "md",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    icon: Settings,
    size: "md",
    color: "secondary",
  },
};

export const Error: Story = {
  args: {
    icon: Bell,
    size: "md",
    color: "error",
  },
};

export const Success: Story = {
  args: {
    icon: MessageSquare,
    size: "md",
    color: "success",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Home} size="xs" />
      <Icon icon={Home} size="sm" />
      <Icon icon={Home} size="md" />
      <Icon icon={Home} size="lg" />
      <Icon icon={Home} size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Heart} color="default" />
      <Icon icon={Heart} color="primary" />
      <Icon icon={Heart} color="secondary" />
      <Icon icon={Heart} color="error" />
      <Icon icon={Heart} color="success" />
    </div>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Home} color="primary" />
      <Icon icon={MessageSquare} color="primary" />
      <Icon icon={Bell} color="primary" />
      <Icon icon={Settings} color="primary" />
      <Icon icon={User} color="primary" />
      <Icon icon={Search} color="primary" />
    </div>
  ),
};
