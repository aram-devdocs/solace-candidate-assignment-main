import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta = {
  title: "Atoms/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    id: "toast-info",
    variant: "info",
    message: "New information available",
    description: "Check out the latest updates to your dashboard.",
  },
};

export const Success: Story = {
  args: {
    id: "toast-success",
    variant: "success",
    message: "Changes saved successfully",
    description: "Your profile has been updated.",
  },
};

export const Warning: Story = {
  args: {
    id: "toast-warning",
    variant: "warning",
    message: "Action required",
    description: "Please review your account settings before continuing.",
  },
};

export const Error: Story = {
  args: {
    id: "toast-error",
    variant: "error",
    message: "Unable to save changes",
    description: "An error occurred while saving your data. Please try again.",
  },
};

export const WithAction: Story = {
  args: {
    id: "toast-action",
    variant: "info",
    message: "New version available",
    description: "Update now to get the latest features.",
    action: {
      label: "Update",
      onClick: () => alert("Update clicked"),
    },
  },
};

export const WithDismiss: Story = {
  args: {
    id: "toast-dismiss",
    variant: "success",
    message: "Task completed",
    onDismiss: (id) => alert(`Toast ${id} dismissed`),
  },
};

export const ShortMessage: Story = {
  args: {
    id: "toast-short",
    variant: "success",
    message: "Done!",
  },
};

export const LongMessage: Story = {
  args: {
    id: "toast-long",
    variant: "error",
    message: "Unable to process your request",
    description:
      "The server encountered an unexpected error while processing your request. This could be due to network issues, invalid data, or server maintenance. Please check your internet connection and try again in a few moments.",
  },
};
