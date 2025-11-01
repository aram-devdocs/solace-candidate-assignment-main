import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { FOOTER_COPYRIGHT_WITH_RIGHTS } from "../constants/footer";

const meta: Meta<typeof Footer> = {
  title: "Molecules/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    copyright: FOOTER_COPYRIGHT_WITH_RIGHTS,
  },
};

export const WithLinks: Story = {
  args: {
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
    copyright: FOOTER_COPYRIGHT_WITH_RIGHTS,
  },
};

export const LinksOnly: Story = {
  args: {
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Help", href: "/help" },
    ],
  },
};

export const CopyrightOnly: Story = {
  args: {
    copyright: FOOTER_COPYRIGHT_WITH_RIGHTS,
  },
};

export const CustomContent: Story = {
  args: {
    children: (
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-primary-700 text-lg font-bold">Solace Health</span>
          <span className="text-secondary-500 text-sm">Compassionate care for everyone</span>
        </div>
        <div className="flex gap-4">
          <a href="https://facebook.com" className="text-primary-700 hover:text-primary-800">
            Facebook
          </a>
          <a href="https://twitter.com" className="text-primary-700 hover:text-primary-800">
            Twitter
          </a>
          <a href="https://linkedin.com" className="text-primary-700 hover:text-primary-800">
            LinkedIn
          </a>
        </div>
      </div>
    ),
    copyright: FOOTER_COPYRIGHT_WITH_RIGHTS,
  },
};

export const FullPageExample: Story = {
  render: () => (
    <div className="flex h-screen flex-col">
      <div className="bg-secondary-50 flex-1 p-8">
        <h1 className="text-secondary-900 mb-4 text-2xl font-bold">Page Content</h1>
        <p className="text-secondary-700">Scroll to the bottom to see the footer.</p>
      </div>
      <Footer
        links={[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Contact Us", href: "/contact" },
          { label: "Help Center", href: "/help" },
        ]}
        copyright={FOOTER_COPYRIGHT_WITH_RIGHTS}
      />
    </div>
  ),
};
