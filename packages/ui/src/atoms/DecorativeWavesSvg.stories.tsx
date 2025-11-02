import type { Meta, StoryObj } from "@storybook/react";
import { DecorativeWavesSvg } from "./DecorativeWavesSvg";

const meta: Meta<typeof DecorativeWavesSvg> = {
  title: "Atoms/DecorativeWavesSvg",
  component: DecorativeWavesSvg,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DecorativeWavesSvg>;

export const Default: Story = {
  args: {},
};

export const Positioned: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="relative h-96 w-full overflow-hidden bg-neutral-50">
        <div className="absolute right-0 top-0">
          <Story />
        </div>
      </div>
    ),
  ],
};
