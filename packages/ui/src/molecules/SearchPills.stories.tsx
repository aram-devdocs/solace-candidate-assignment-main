// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { SearchPills } from "./SearchPills";

const meta: Meta<typeof SearchPills> = {
  title: "Molecules/SearchPills",
  component: SearchPills,
  tags: ["autodocs"],
  argTypes: {
    tokens: {
      control: "object",
      description: "Array of search tokens to display",
    },
    onRemove: {
      action: "removed",
      description: "Handler called when a token is removed",
    },
    removable: {
      control: "boolean",
      description: "Whether pills are removable",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchPills>;

export const Default: Story = {
  args: {
    tokens: ["denver", "vegan"],
    removable: true,
  },
};

export const SingleToken: Story = {
  args: {
    tokens: ["denver"],
    removable: true,
  },
};

export const QuotedPhrase: Story = {
  args: {
    tokens: ["sports medicine"],
    removable: true,
  },
};

export const MixedTokens: Story = {
  args: {
    tokens: ["denver", "sports medicine", "vegan"],
    removable: true,
  },
};

export const ManyTokens: Story = {
  args: {
    tokens: ["denver", "vegan", "sports medicine", "john", "doe", "555"],
    removable: true,
  },
};

export const NotRemovable: Story = {
  args: {
    tokens: ["denver", "vegan"],
    removable: false,
  },
};

export const EmptyTokens: Story = {
  args: {
    tokens: [],
    removable: true,
  },
};

export const LongPhrases: Story = {
  args: {
    tokens: [
      "denver",
      "sports medicine and rehabilitation",
      "vegan nutrition counseling",
      "mental health",
    ],
    removable: true,
  },
};
