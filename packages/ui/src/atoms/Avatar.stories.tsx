import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const WithInitials: Story = {
  args: {
    initials: "AH",
    size: "md",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User Avatar",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    initials: "JS",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    initials: "AH",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    initials: "MK",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    initials: "RT",
    size: "xl",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="AH" size="sm" alt="Small avatar" />
      <Avatar initials="AH" size="md" alt="Medium avatar" />
      <Avatar initials="AH" size="lg" alt="Large avatar" />
      <Avatar initials="AH" size="xl" alt="Extra large avatar" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="md" alt="User icon avatar" />
        <span className="text-xs">Icon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar initials="AH" size="md" alt="User initials avatar" />
        <span className="text-xs">Initials</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar src="https://i.pravatar.cc/150?img=2" size="md" alt="User profile" />
        <span className="text-xs">Image</span>
      </div>
    </div>
  ),
};
