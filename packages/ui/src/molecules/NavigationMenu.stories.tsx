import type { Meta, StoryObj } from "@storybook/react";
import { Home, MessageSquare, FileText, Clipboard, Heart, HelpCircle } from "lucide-react";
import { useState } from "react";
import { NavigationItem } from "./NavigationItem";
import { NavigationMenu } from "./NavigationMenu";

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
    <NavigationItem icon={Home} label="Home" href="/" active />
    <NavigationItem icon={MessageSquare} label="Messages" href="/messages" />
    <NavigationItem icon={FileText} label="Notes" href="/notes" />
    <NavigationItem icon={Clipboard} label="Forms" href="/forms" />
    <NavigationItem icon={Heart} label="Health Insurance" href="/insurance" />
    <NavigationItem icon={HelpCircle} label="Help" href="/help" />
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
            <Home className="h-4 w-4" />
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
          footer={<div className="text-secondary-500 text-xs">© 2024 Solace Health</div>}
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
