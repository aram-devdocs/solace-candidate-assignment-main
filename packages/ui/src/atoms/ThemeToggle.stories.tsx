import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

const meta: Meta<typeof ThemeToggle> = {
  title: "Atoms/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const LightMode: Story = {
  args: {
    theme: "light",
    onToggle: () => console.log("Toggle theme"),
  },
};

export const DarkMode: Story = {
  args: {
    theme: "dark",
    onToggle: () => console.log("Toggle theme"),
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Interactive: Story = {
  render: () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    return (
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle
          theme={theme}
          onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <p className="text-secondary-600 text-sm">Current theme: {theme}</p>
      </div>
    );
  },
};
