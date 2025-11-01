import type { Meta, StoryObj } from "@storybook/react";
import { Greeting } from "./Greeting";

const meta = {
  title: "Molecules/Greeting",
  component: Greeting,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    userName: {
      control: "text",
      description: "User's name to display in the greeting",
    },
    timePeriod: {
      control: "select",
      options: ["morning", "afternoon", "evening"],
      description: "Time period for the greeting",
    },
  },
} satisfies Meta<typeof Greeting>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Morning greeting with user name
 */
export const MorningWithName: Story = {
  args: {
    userName: "Aram",
    timePeriod: "morning",
  },
};

/**
 * Morning greeting without user name
 */
export const MorningWithoutName: Story = {
  args: {
    timePeriod: "morning",
  },
};

/**
 * Afternoon greeting with user name
 */
export const AfternoonWithName: Story = {
  args: {
    userName: "Aram",
    timePeriod: "afternoon",
  },
};

/**
 * Afternoon greeting without user name
 */
export const AfternoonWithoutName: Story = {
  args: {
    timePeriod: "afternoon",
  },
};

/**
 * Evening greeting with user name
 */
export const EveningWithName: Story = {
  args: {
    userName: "Aram",
    timePeriod: "evening",
  },
};

/**
 * Evening greeting without user name
 */
export const EveningWithoutName: Story = {
  args: {
    timePeriod: "evening",
  },
};

/**
 * Mobile viewport demonstration for morning greeting
 */
export const MobileMorning: Story = {
  args: {
    userName: "Aram",
    timePeriod: "morning",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Mobile viewport demonstration for afternoon greeting
 */
export const MobileAfternoon: Story = {
  args: {
    userName: "Aram",
    timePeriod: "afternoon",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Mobile viewport demonstration for evening greeting
 */
export const MobileEvening: Story = {
  args: {
    userName: "Aram",
    timePeriod: "evening",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
