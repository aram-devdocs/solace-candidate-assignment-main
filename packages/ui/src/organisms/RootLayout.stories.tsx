import type { Meta, StoryObj } from "@storybook/react";
import { Home, MessageSquare, FileText, Clipboard, Heart, HelpCircle } from "lucide-react";
import { NavigationItem } from "../molecules/NavigationItem";
import { RootLayout } from "./RootLayout";

const meta: Meta<typeof RootLayout> = {
  title: "Organisms/RootLayout",
  component: RootLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RootLayout>;

const SolaceLogo = () => <div className="text-xl font-bold text-white">Solace</div>;

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
  args: {
    header: {
      logo: <SolaceLogo />,
      userInitials: "AH",
    },
    navigation: navigationItems,
    navigationHeader: "MENU",
    children: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Welcome to Solace</h1>
        <p className="text-secondary-700 mb-4">
          This is the main content area of your application.
        </p>
        <div className="border-secondary-200 rounded-lg border bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold">Dashboard</h2>
          <p className="text-secondary-600">Your dashboard content goes here.</p>
        </div>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    header: {
      logo: <SolaceLogo />,
      userInitials: "AH",
      messageCount: 3,
      notificationCount: 5,
    },
    navigation: navigationItems,
    navigationHeader: "MENU",
    footer: {
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Contact Us", href: "/contact" },
      ],
      copyright: "© 2024 Solace Health. All rights reserved.",
    },
    children: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Page with Footer</h1>
        <p className="text-secondary-700">
          Scroll down to see the footer at the bottom of the page.
        </p>
      </div>
    ),
  },
};

export const WithNotifications: Story = {
  args: {
    header: {
      logo: <SolaceLogo />,
      userInitials: "AH",
      messageCount: 5,
      notificationCount: 12,
    },
    navigation: navigationItems,
    navigationHeader: "MENU",
    children: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Notifications Demo</h1>
        <p className="text-secondary-700 mb-4">
          Check the header for message and notification badges.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="border-secondary-200 rounded-lg border bg-white p-6">
            <h3 className="mb-2 font-semibold">Messages (5)</h3>
            <p className="text-secondary-600 text-sm">You have unread messages</p>
          </div>
          <div className="border-secondary-200 rounded-lg border bg-white p-6">
            <h3 className="mb-2 font-semibold">Notifications (12)</h3>
            <p className="text-secondary-600 text-sm">You have new notifications</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const NoNavigation: Story = {
  args: {
    header: {
      logo: <SolaceLogo />,
      userInitials: "AH",
    },
    showNavigation: false,
    children: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Full Width Layout</h1>
        <p className="text-secondary-700">
          This layout has no navigation sidebar, giving you full width for content.
        </p>
      </div>
    ),
  },
};

export const CompleteExample: Story = {
  args: {
    header: {
      logo: <SolaceLogo />,
      userInitials: "AH",
      messageCount: 2,
      notificationCount: 4,
      onMessagesClick: () => console.log("Messages"),
      onNotificationsClick: () => console.log("Notifications"),
      onProfileClick: () => console.log("Profile"),
    },
    navigation: navigationItems,
    navigationHeader: "MENU",
    navigationFooter: <div className="text-secondary-500 text-center text-xs">Version 1.0.0</div>,
    footer: {
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Help", href: "/help" },
      ],
      copyright: "© 2024 Solace Health",
    },
    children: (
      <div className="min-h-full p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-secondary-900 mb-2 text-3xl font-bold">Dashboard</h1>
          <p className="text-secondary-600 mb-8">
            Welcome back! Here is an overview of your activity.
          </p>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border-secondary-200 rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-secondary-600 mb-1 text-sm">Total Messages</div>
              <div className="text-primary-700 text-3xl font-bold">24</div>
            </div>
            <div className="border-secondary-200 rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-secondary-600 mb-1 text-sm">Active Forms</div>
              <div className="text-primary-700 text-3xl font-bold">8</div>
            </div>
            <div className="border-secondary-200 rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-secondary-600 mb-1 text-sm">Pending Tasks</div>
              <div className="text-primary-700 text-3xl font-bold">12</div>
            </div>
          </div>

          <div className="border-secondary-200 rounded-lg border bg-white shadow-sm">
            <div className="border-secondary-200 border-b p-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            <div className="p-6">
              <p className="text-secondary-600">Your recent activity will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
