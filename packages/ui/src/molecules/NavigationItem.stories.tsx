import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "../atoms/HomeIcon";
import { MessagesIcon } from "../atoms/MessagesIcon";
import { NotesIcon } from "../atoms/NotesIcon";
import { FormsIcon } from "../atoms/FormsIcon";
import { HealthInsuranceIcon } from "../atoms/HealthInsuranceIcon";
import { HelpIcon } from "../atoms/HelpIcon";
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
    icon: <HomeIcon />,
    label: "Home",
    href: "/",
    active: false,
  },
};

export const Active: Story = {
  args: {
    icon: <HomeIcon />,
    label: "Home",
    href: "/",
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    icon: <MessagesIcon />,
    label: "Messages",
    href: "/messages",
    active: false,
  },
};

export const Collapsed: Story = {
  args: {
    icon: <HomeIcon />,
    label: "Home",
    href: "/",
    collapsed: true,
  },
};

export const CollapsedActive: Story = {
  args: {
    icon: <HomeIcon />,
    label: "Home",
    href: "/",
    collapsed: true,
    active: true,
  },
};

export const NavigationList: Story = {
  render: () => (
    <nav className="flex flex-col">
      <NavigationItem icon={<HomeIcon />} label="Home" href="/" active />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<MessagesIcon />} label="Messages" href="/messages" />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<NotesIcon />} label="Notes" href="/notes" />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<FormsIcon />} label="Forms" href="/forms" />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<HealthInsuranceIcon />} label="Health Insurance" href="/insurance" />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<HelpIcon />} label="Help" href="/help" />
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
    <nav className="flex flex-col">
      <NavigationItem icon={<HomeIcon />} label="Home" href="/" active collapsed />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<MessagesIcon />} label="Messages" href="/messages" collapsed />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<NotesIcon />} label="Notes" href="/notes" collapsed />
      <hr className="border-secondary-200 my-1" />
      <NavigationItem icon={<FormsIcon />} label="Forms" href="/forms" collapsed />
    </nav>
  ),
};
