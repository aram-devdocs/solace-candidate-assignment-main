import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { HomeIcon } from "../atoms/HomeIcon";
import { MessagesIcon } from "../atoms/MessagesIcon";
import { NotesIcon } from "../atoms/NotesIcon";
import { FormsIcon } from "../atoms/FormsIcon";
import { HealthInsuranceIcon } from "../atoms/HealthInsuranceIcon";
import { HelpIcon } from "../atoms/HelpIcon";
import { NavigationItem } from "../molecules/NavigationItem";
import { RootLayout } from "./RootLayout";
import { FOOTER_COPYRIGHT_WITH_RIGHTS, FOOTER_COPYRIGHT } from "../constants/footer";

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

const navigationRoutes = [
  { id: "home", icon: <HomeIcon />, label: "Home" },
  { id: "messages", icon: <MessagesIcon />, label: "Messages" },
  { id: "notes", icon: <NotesIcon />, label: "Notes" },
  { id: "forms", icon: <FormsIcon />, label: "Forms" },
  { id: "insurance", icon: <HealthInsuranceIcon />, label: "Health Insurance" },
  { id: "help", icon: <HelpIcon />, label: "Help" },
] as const;

interface InteractiveNavigationProps {
  activeRoute: string;
  // eslint-disable-next-line no-unused-vars
  onRouteChange: (id: string) => void;
}

const InteractiveNavigation = ({ activeRoute, onRouteChange }: InteractiveNavigationProps) => (
  <>
    {navigationRoutes.map((route) => (
      <NavigationItem
        key={route.id}
        icon={route.icon}
        label={route.label}
        href="#"
        active={activeRoute === route.id}
        onClick={() => {
          onRouteChange(route.id);
        }}
      />
    ))}
  </>
);

const getContentForRoute = (route: string) => {
  const contentMap: Record<string, JSX.Element> = {
    home: (
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
    messages: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Messages</h1>
        <p className="text-secondary-700 mb-4">View and manage your messages.</p>
        <div className="border-secondary-200 rounded-lg border bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold">Inbox</h2>
          <p className="text-secondary-600">No new messages.</p>
        </div>
      </div>
    ),
    notes: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Notes</h1>
        <p className="text-secondary-700 mb-4">Your personal notes and documentation.</p>
        <div className="border-secondary-200 rounded-lg border bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold">Recent Notes</h2>
          <p className="text-secondary-600">Create a new note to get started.</p>
        </div>
      </div>
    ),
    forms: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Forms</h1>
        <p className="text-secondary-700 mb-4">Complete and manage your forms.</p>
        <div className="border-secondary-200 rounded-lg border bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold">Active Forms</h2>
          <p className="text-secondary-600">No pending forms.</p>
        </div>
      </div>
    ),
    insurance: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Health Insurance</h1>
        <p className="text-secondary-700 mb-4">Manage your health insurance information.</p>
        <div className="border-secondary-200 rounded-lg border bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold">Coverage Details</h2>
          <p className="text-secondary-600">View your coverage and benefits.</p>
        </div>
      </div>
    ),
    help: (
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Help & Support</h1>
        <p className="text-secondary-700 mb-4">Find answers and get support.</p>
        <div className="border-secondary-200 rounded-lg border bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold">FAQs</h2>
          <p className="text-secondary-600">Browse frequently asked questions.</p>
        </div>
      </div>
    ),
  };

  return contentMap[route] || contentMap.home;
};

function DefaultWrapper() {
  const [activeRoute, setActiveRoute] = useState("home");

  return (
    <RootLayout
      header={{}}
      navigation={
        <InteractiveNavigation activeRoute={activeRoute} onRouteChange={setActiveRoute} />
      }
      navigationHeader="MENU"
    >
      {getContentForRoute(activeRoute)}
    </RootLayout>
  );
}

export const Default: Story = {
  render: () => <DefaultWrapper />,
};

function WithFooterWrapper() {
  const [activeRoute, setActiveRoute] = useState("home");

  return (
    <RootLayout
      header={{
        messageCount: 3,
        notificationCount: 5,
      }}
      navigation={
        <InteractiveNavigation activeRoute={activeRoute} onRouteChange={setActiveRoute} />
      }
      navigationHeader="MENU"
      footer={{
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Contact Us", href: "/contact" },
        ],
        copyright: FOOTER_COPYRIGHT_WITH_RIGHTS,
      }}
    >
      {getContentForRoute(activeRoute)}
    </RootLayout>
  );
}

export const WithFooter: Story = {
  render: () => <WithFooterWrapper />,
};

function WithNotificationsWrapper() {
  const [activeRoute, setActiveRoute] = useState("home");

  return (
    <RootLayout
      header={{
        messageCount: 5,
        notificationCount: 12,
      }}
      navigation={
        <InteractiveNavigation activeRoute={activeRoute} onRouteChange={setActiveRoute} />
      }
      navigationHeader="MENU"
    >
      <div className="p-8">
        <h1 className="text-secondary-900 mb-4 text-3xl font-bold">Notifications Demo</h1>
        <p className="text-secondary-700 mb-4">
          Check the header for message and notification badges. Try clicking the navigation items.
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
    </RootLayout>
  );
}

export const WithNotifications: Story = {
  render: () => <WithNotificationsWrapper />,
};

export const NoNavigation: Story = {
  args: {
    header: {},
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

function CompleteExampleWrapper() {
  const [activeRoute, setActiveRoute] = useState("home");

  return (
    <RootLayout
      header={{
        messageCount: 2,
        notificationCount: 4,
        onMessagesClick: () => console.log("Messages"),
        onNotificationsClick: () => console.log("Notifications"),
        onProfileClick: () => console.log("Profile"),
      }}
      navigation={
        <InteractiveNavigation activeRoute={activeRoute} onRouteChange={setActiveRoute} />
      }
      navigationHeader="MENU"
      navigationFooter={<div className="text-secondary-500 text-center text-xs">Version 1.0.0</div>}
      footer={{
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Help", href: "/help" },
        ],
        copyright: FOOTER_COPYRIGHT,
      }}
    >
      <div className="min-h-full p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-secondary-900 mb-2 text-3xl font-bold">
            {navigationRoutes.find((r) => r.id === activeRoute)?.label || "Dashboard"}
          </h1>
          <p className="text-secondary-600 mb-8">
            Welcome back! Here is an overview of your activity. Try clicking different navigation
            items.
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
              <p className="text-secondary-600">
                Your recent activity will appear here. Current section: {activeRoute}
              </p>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export const CompleteExample: Story = {
  render: () => <CompleteExampleWrapper />,
};
