import type { Meta, StoryObj } from "@storybook/react";
import { HealthInsuranceTemplate } from "./HealthInsuranceTemplate";

const meta: Meta<typeof HealthInsuranceTemplate> = {
  title: "Templates/HealthInsuranceTemplate",
  component: HealthInsuranceTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HealthInsuranceTemplate>;

export const Default: Story = {
  args: {
    onContactSupport: () => console.log("Contact support clicked"),
  },
};
