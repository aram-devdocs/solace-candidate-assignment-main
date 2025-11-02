import type { Meta, StoryObj } from "@storybook/react";
import { HelpCard } from "./HelpCard";

const meta: Meta<typeof HelpCard> = {
  title: "Molecules/HelpCard",
  component: HelpCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HelpCard>;

export const HelpCenter: Story = {
  args: {
    title: "Solace Help Center",
    desktopImage: "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-desktop.svg",
    desktopFillImage:
      "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-desktop-fill.svg",
    mobileImage: "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-mobile.svg",
    mobileFillImage:
      "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/laptop-mobile-fill.svg",
    onClick: () => console.log("Help Center clicked"),
  },
};

export const FAQ: Story = {
  args: {
    title: "Frequently Asked Questions",
    desktopImage: "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-desktop.svg",
    desktopFillImage:
      "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-desktop-fill.svg",
    mobileImage: "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-mobile.svg",
    mobileFillImage:
      "https://d3b2dvywdu5igv.cloudfront.net/illustrations/card/coffee-mobile-fill.svg",
    onClick: () => console.log("FAQ clicked"),
  },
};
