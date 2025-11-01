import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HomeIcon } from "../atoms/HomeIcon";
import { MessagesIcon } from "../atoms/MessagesIcon";
import { NotesIcon } from "../atoms/NotesIcon";
import { FormsIcon } from "../atoms/FormsIcon";
import { HealthInsuranceIcon } from "../atoms/HealthInsuranceIcon";
import { HelpIcon } from "../atoms/HelpIcon";
import { NavigationItem } from "./NavigationItem";
import { NavigationMenu } from "./NavigationMenu";
import { FOOTER_COPYRIGHT } from "../constants/footer";

const meta: Meta<typeof NavigationMenu> = {
  title: "Molecules/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const navigationItems = (
  <>
    <NavigationItem icon={<HomeIcon />} label="Home" href="/" active />
    <NavigationItem icon={<MessagesIcon />} label="Messages" href="/messages" />
    <NavigationItem icon={<NotesIcon />} label="Notes" href="/notes" />
    <NavigationItem icon={<FormsIcon />} label="Forms" href="/forms" />
    <NavigationItem icon={<HealthInsuranceIcon />} label="Health Insurance" href="/insurance" />
    <NavigationItem icon={<HelpIcon />} label="Help" href="/help" />
  </>
);

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="h-screen">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-700 m-4 rounded-md px-4 py-2 text-white"
        >
          Open Menu
        </button>
        <NavigationMenu isOpen={isOpen} onClose={() => setIsOpen(false)} header="MENU">
          {navigationItems}
        </NavigationMenu>
      </div>
    );
  },
};

export const Open: Story = {
  render: () => (
    <div className="h-screen">
      <NavigationMenu isOpen={true} onClose={() => {}} header="MENU">
        {navigationItems}
      </NavigationMenu>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div className="h-screen">
      <NavigationMenu
        isOpen={true}
        onClose={() => {}}
        header="MENU"
        footer={<div className="text-secondary-500 text-center text-xs">Version 1.0.0</div>}
      >
        {navigationItems}
      </NavigationMenu>
    </div>
  ),
};

export const CustomHeader: Story = {
  render: () => (
    <div className="h-screen">
      <NavigationMenu
        isOpen={true}
        onClose={() => {}}
        header={
          <div className="flex items-center gap-2">
            <HomeIcon width={16} height={16} />
            <span className="text-sm font-bold">Dashboard</span>
          </div>
        }
      >
        {navigationItems}
      </NavigationMenu>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="flex h-screen">
        <NavigationMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="MENU"
          footer={<div className="text-secondary-500 text-xs">{FOOTER_COPYRIGHT}</div>}
        >
          {navigationItems}
        </NavigationMenu>
        <div className="flex-1 p-8">
          <h1 className="mb-4 text-2xl font-bold">Page Content</h1>
          <p className="text-secondary-700 mb-4">
            This demonstrates how the navigation menu works alongside page content.
          </p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary-700 rounded-md px-4 py-2 text-white"
          >
            {isOpen ? "Close" : "Open"} Menu
          </button>
        </div>
      </div>
    );
  },
};
