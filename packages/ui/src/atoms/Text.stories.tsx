import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    as: "h1",
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    as: "h2",
    variant: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    as: "h3",
    variant: "h3",
    children: "Heading 3",
  },
};

export const Body: Story = {
  args: {
    as: "p",
    variant: "body",
    children: "This is body text",
  },
};

export const Small: Story = {
  args: {
    as: "span",
    variant: "small",
    children: "Small text",
  },
};

export const ErrorText: Story = {
  args: {
    as: "p",
    variant: "body",
    color: "error",
    children: "Error message",
  },
};
