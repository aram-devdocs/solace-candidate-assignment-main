import type { Meta, StoryObj } from "@storybook/react";
import { NotFoundState } from "./NotFoundState";

const meta: Meta<typeof NotFoundState> = {
  title: "Molecules/NotFoundState",
  component: NotFoundState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-secondary-50 min-h-[500px] w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotFoundState>;

export const Default: Story = {
  args: {
    title: "Page Not Found",
    message: "The page you're looking for doesn't exist.",
    actionText: "Go Home",
    onAction: () => alert("Navigate to home"),
  },
};

export const CustomMessage: Story = {
  args: {
    title: "Feature Coming Soon",
    message: "This feature is currently under development. Check back soon!",
    actionText: "Return to Dashboard",
    onAction: () => alert("Navigate to dashboard"),
  },
};

export const NoAction: Story = {
  args: {
    title: "Page Not Found",
    message: "The page you're looking for doesn't exist.",
  },
};

export const ShortMessage: Story = {
  args: {
    title: "Oops!",
    message: "Nothing here.",
    actionText: "Back",
    onAction: () => alert("Go back"),
  },
};
