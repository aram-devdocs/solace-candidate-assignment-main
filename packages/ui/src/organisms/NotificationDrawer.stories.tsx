import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotificationDrawer } from "./NotificationDrawer";

const meta: Meta<typeof NotificationDrawer> = {
  title: "Organisms/NotificationDrawer",
  component: NotificationDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationDrawer>;

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-primary-600 px-md py-sm hover:bg-primary-700 rounded-md text-white"
      >
        Open Notifications
      </button>
      <NotificationDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
