import type { Meta, StoryObj } from "@storybook/react";
import { FormsTemplate } from "./FormsTemplate";

const meta: Meta<typeof FormsTemplate> = {
  title: "Templates/FormsTemplate",
  component: FormsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormsTemplate>;

export const Default: Story = {
  args: {},
};
