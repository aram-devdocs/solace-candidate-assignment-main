import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Molecules/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const WithNotifications: Story = {
  args: {
    messageCount: 3,
    notificationCount: 5,
  },
};

export const WithHighCounts: Story = {
  args: {
    messageCount: 12,
    notificationCount: 25,
  },
};

export const Interactive: Story = {
  args: {
    messageCount: 2,
    notificationCount: 1,
    onMenuClick: () => alert("Menu clicked"),
    onMessagesClick: () => alert("Messages clicked"),
    onNotificationsClick: () => alert("Notifications clicked"),
    onProfileClick: () => alert("Profile clicked"),
  },
};

export const FullExample: Story = {
  render: () => (
    <div className="flex h-screen flex-col">
      <Header
        messageCount={3}
        notificationCount={5}
        onMenuClick={() => console.log("Menu")}
        onMessagesClick={() => console.log("Messages")}
        onNotificationsClick={() => console.log("Notifications")}
        onProfileClick={() => console.log("Profile")}
      />
      <div className="bg-secondary-50 flex-1 p-8">
        <h1 className="text-secondary-900 mb-4 text-2xl font-bold">Page Content</h1>
        <p className="text-secondary-700">
          This demonstrates the header component at the top of the page.
        </p>
      </div>
    </div>
  ),
};

export const CustomLogo: Story = {
  args: {
    logo: <div className="text-xl font-bold text-white">Custom Logo</div>,
  },
};
