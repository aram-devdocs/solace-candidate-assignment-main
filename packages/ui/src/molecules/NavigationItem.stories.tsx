import type { Meta, StoryObj } from "@storybook/react";
import { Home, MessageSquare, FileText, Clipboard, Heart, HelpCircle } from "lucide-react";
import { NavigationItem } from "./NavigationItem";

const meta: Meta<typeof NavigationItem> = {
  title: "Molecules/NavigationItem",
  component: NavigationItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-secondary-200 w-64 rounded-lg border bg-white p-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

export const Default: Story = {
  args: {
    icon: Home,
    label: "Home",
    href: "/",
    active: false,
  },
};

export const Active: Story = {
  args: {
    icon: Home,
    label: "Home",
    href: "/",
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    icon: MessageSquare,
    label: "Messages",
    href: "/messages",
    active: false,
  },
};

export const Collapsed: Story = {
  args: {
    icon: Home,
    label: "Home",
    href: "/",
    collapsed: true,
  },
};

export const CollapsedActive: Story = {
  args: {
    icon: Home,
    label: "Home",
    href: "/",
    collapsed: true,
    active: true,
  },
};

export const NavigationList: Story = {
  render: () => (
    <nav className="flex flex-col gap-1">
      <NavigationItem icon={Home} label="Home" href="/" active />
      <NavigationItem icon={MessageSquare} label="Messages" href="/messages" />
      <NavigationItem icon={FileText} label="Notes" href="/notes" />
      <NavigationItem icon={Clipboard} label="Forms" href="/forms" />
      <NavigationItem icon={Heart} label="Health Insurance" href="/insurance" />
      <NavigationItem icon={HelpCircle} label="Help" href="/help" />
    </nav>
  ),
};

export const CollapsedNavigation: Story = {
  decorators: [
    (Story) => (
      <div className="border-secondary-200 w-20 rounded-lg border bg-white p-2">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <nav className="flex flex-col gap-1">
      <NavigationItem icon={Home} label="Home" href="/" active collapsed />
      <NavigationItem icon={MessageSquare} label="Messages" href="/messages" collapsed />
      <NavigationItem icon={FileText} label="Notes" href="/notes" collapsed />
      <NavigationItem icon={Clipboard} label="Forms" href="/forms" collapsed />
    </nav>
  ),
};
