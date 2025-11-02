import type { Meta, StoryObj } from "@storybook/react";
import { ToastContainer } from "./ToastContainer";
import type { ToastProps } from "./Toast";

const meta = {
  title: "Atoms/ToastContainer",
  component: ToastContainer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleToasts: ToastProps[] = [
  {
    id: "toast-1",
    variant: "success",
    message: "Profile updated successfully",
    onDismiss: (id) => console.log(`Dismissed: ${id}`),
  },
  {
    id: "toast-2",
    variant: "info",
    message: "New message received",
    description: "You have 3 unread messages.",
    onDismiss: (id) => console.log(`Dismissed: ${id}`),
  },
  {
    id: "toast-3",
    variant: "warning",
    message: "Storage almost full",
    description: "You are using 90% of your storage quota.",
    action: {
      label: "Upgrade",
      onClick: () => console.log("Upgrade clicked"),
    },
    onDismiss: (id) => console.log(`Dismissed: ${id}`),
  },
];

export const TopRight: Story = {
  args: {
    toasts: sampleToasts,
    position: "top-right",
  },
};

export const TopLeft: Story = {
  args: {
    toasts: sampleToasts,
    position: "top-left",
  },
};

export const BottomRight: Story = {
  args: {
    toasts: sampleToasts,
    position: "bottom-right",
  },
};

export const BottomLeft: Story = {
  args: {
    toasts: sampleToasts,
    position: "bottom-left",
  },
};

export const TopCenter: Story = {
  args: {
    toasts: sampleToasts,
    position: "top-center",
  },
};

export const BottomCenter: Story = {
  args: {
    toasts: sampleToasts,
    position: "bottom-center",
  },
};

export const SingleToast: Story = {
  args: {
    toasts: [
      {
        id: "single",
        variant: "success",
        message: "Operation completed",
        onDismiss: (id) => console.log(`Dismissed: ${id}`),
      },
    ],
    position: "top-right",
  },
};

export const ManyToasts: Story = {
  args: {
    toasts: [
      {
        id: "toast-1",
        variant: "success",
        message: "Task 1 completed",
        onDismiss: (id) => console.log(`Dismissed: ${id}`),
      },
      {
        id: "toast-2",
        variant: "info",
        message: "Task 2 in progress",
        onDismiss: (id) => console.log(`Dismissed: ${id}`),
      },
      {
        id: "toast-3",
        variant: "warning",
        message: "Task 3 needs attention",
        onDismiss: (id) => console.log(`Dismissed: ${id}`),
      },
      {
        id: "toast-4",
        variant: "error",
        message: "Task 4 failed",
        description: "Please try again later.",
        onDismiss: (id) => console.log(`Dismissed: ${id}`),
      },
      {
        id: "toast-5",
        variant: "success",
        message: "Task 5 completed",
        onDismiss: (id) => console.log(`Dismissed: ${id}`),
      },
    ],
    position: "top-right",
  },
};

export const Empty: Story = {
  args: {
    toasts: [],
    position: "top-right",
  },
};
