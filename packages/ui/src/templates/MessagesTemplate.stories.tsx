import type { Meta, StoryObj } from "@storybook/react";
import { MessagesTemplate } from "./MessagesTemplate";

const meta: Meta<typeof MessagesTemplate> = {
  title: "Templates/MessagesTemplate",
  component: MessagesTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MessagesTemplate>;

export const Default: Story = {
  args: {},
};
