import type { Meta, StoryObj } from "@storybook/react";
import { NotesTemplate } from "./NotesTemplate";

const meta: Meta<typeof NotesTemplate> = {
  title: "Templates/NotesTemplate",
  component: NotesTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotesTemplate>;

export const Default: Story = {
  args: {},
};
