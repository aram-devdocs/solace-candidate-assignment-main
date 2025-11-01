import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    as: "h1",
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    as: "h2",
    variant: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    as: "h3",
    variant: "h3",
    children: "Heading 3",
  },
};

export const Body: Story = {
  args: {
    as: "p",
    variant: "body",
    children: "This is body text",
  },
};

export const Small: Story = {
  args: {
    as: "span",
    variant: "small",
    children: "Small text",
  },
};

export const ErrorText: Story = {
  args: {
    as: "p",
    variant: "body",
    color: "error",
    children: "Error message",
  },
};

export const FontComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Text as="h1" variant="h1">
          Mollie Glaston Serif Heading
        </Text>
        <Text as="p" variant="body" className="mt-2">
          This is Lato sans-serif body text. Notice the difference between the elegant serif font
          above and this clean sans-serif font.
        </Text>
      </div>
      <div>
        <Text as="h2" variant="h2">
          Another Serif Heading
        </Text>
        <Text as="p" variant="body" className="mt-2">
          Lato is used for all body text to ensure readability, while Mollie Glaston adds
          sophistication to headings.
        </Text>
      </div>
    </div>
  ),
};
