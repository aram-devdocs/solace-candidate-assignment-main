import type { Meta, StoryObj } from "@storybook/react";
import { HelpTemplate } from "./HelpTemplate";

const meta: Meta<typeof HelpTemplate> = {
  title: "Templates/HelpTemplate",
  component: HelpTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HelpTemplate>;

export const Default: Story = {
  args: {
    onHelpCenterClick: () => console.log("Help Center clicked"),
    onFaqClick: () => console.log("FAQ clicked"),
    onContactSupportClick: () => console.log("Contact Support clicked"),
  },
};
