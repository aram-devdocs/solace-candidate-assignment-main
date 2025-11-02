import type { Meta, StoryObj } from "@storybook/react";
import { HealthInsuranceEmptyState } from "./HealthInsuranceEmptyState";

const meta: Meta<typeof HealthInsuranceEmptyState> = {
  title: "Molecules/HealthInsuranceEmptyState",
  component: HealthInsuranceEmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HealthInsuranceEmptyState>;

export const Default: Story = {
  args: {
    onContactSupport: () => console.log("Contact support clicked"),
  },
};
