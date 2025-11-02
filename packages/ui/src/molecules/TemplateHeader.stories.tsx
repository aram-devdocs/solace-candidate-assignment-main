// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { TemplateHeader } from "./TemplateHeader";

const meta: Meta<typeof TemplateHeader> = {
  title: "Molecules/TemplateHeader",
  component: TemplateHeader,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title text to display",
    },
    subtitle: {
      control: "text",
      description: "Optional subtitle or description text",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TemplateHeader>;

export const Default: Story = {
  args: {
    title: "Advocate Directory",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Advocate Directory",
    subtitle: "Browse and filter health advocates",
  },
};

export const LongTitle: Story = {
  args: {
    title: "Mental Health and Wellness Advocate Directory",
    subtitle: "Find specialized advocates to support your journey",
  },
};

export const ShortTitle: Story = {
  args: {
    title: "Advocates",
  },
};

export const WithLongSubtitle: Story = {
  args: {
    title: "Advocate Directory",
    subtitle:
      "Search through our comprehensive database of certified health advocates specializing in various areas of mental health and wellness support",
  },
};
