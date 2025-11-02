import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ProfileDropdown } from "./ProfileDropdown";

const meta: Meta<typeof ProfileDropdown> = {
  title: "Organisms/ProfileDropdown",
  component: ProfileDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative pt-[200px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileDropdown>;

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onAccountClick: () => {},
    onLogoutClick: () => {},
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onAccountClick: () => {},
    onLogoutClick: () => {},
  },
};

export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 flex h-10 w-10 items-center justify-center rounded-full text-white"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
      <ProfileDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAccountClick={() => {
          alert("Account clicked");
          setIsOpen(false);
        }}
        onLogoutClick={() => {
          alert("Logout clicked");
          setIsOpen(false);
        }}
      />
    </div>
  );
};
