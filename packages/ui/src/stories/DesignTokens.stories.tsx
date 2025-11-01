import type { Meta, StoryObj } from "@storybook/react";

/**
 * Design Tokens Story - Visual reference for all design tokens
 *
 * This story provides a comprehensive visual reference of all design tokens
 * available in the @repo/ui package. Use this as a reference when building
 * components to ensure consistent styling across the application.
 *
 * See DESIGN_TOKENS.md for detailed usage guidelines.
 */

const DesignTokensContainer = () => <div>Design Tokens Documentation</div>;

const meta = {
  title: "Design System/Design Tokens",
  component: DesignTokensContainer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DesignTokensContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Color Palette - All color tokens organized by semantic meaning
 */
export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Primary Colors (Teal/Green)</h2>
        <p className="text-secondary-600 mb-4 text-sm">
          Main brand color palette. Use primary-700 for headers and primary buttons.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-11">
          {[
            { name: "primary-50", value: "#f0fdf9" },
            { name: "primary-100", value: "#ccfbef" },
            { name: "primary-150", value: "#B0C8BF" },
            { name: "primary-200", value: "#99f6e0" },
            { name: "primary-300", value: "#5fe9d0" },
            { name: "primary-400", value: "#2dd4bf" },
            { name: "primary-500", value: "#14b8a6" },
            { name: "primary-600", value: "#275E50" },
            { name: "primary-700", value: "#1D4239" },
            { name: "primary-800", value: "#1e3a34" },
            { name: "primary-900", value: "#134239" },
          ].map(({ name, value }) => (
            <div key={name} className="space-y-2">
              <div className={`bg-${name} border-secondary-200 h-16 w-full rounded-md border`} />
              <div className="text-xs">
                <div className="font-medium">{name}</div>
                <div className="text-secondary-500">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Accent Colors (Gold/Amber)</h2>
        <p className="text-secondary-600 mb-4 text-sm">
          Use for highlights, badges, and special call-outs. Primary gold is accent-500.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {[
            { name: "accent-50", value: "#F5E6CB" },
            { name: "accent-100", value: "#F4E5CA" },
            { name: "accent-200", value: "#F5D59A" },
            { name: "accent-300", value: "#FFCC6C" },
            { name: "accent-400", value: "#E9CC95" },
            { name: "accent-500", value: "#DEB260" },
            { name: "accent-600", value: "#D7A13B" },
            { name: "accent-700", value: "#A77D2D" },
            { name: "accent-800", value: "#99582F" },
          ].map(({ name, value }) => (
            <div key={name} className="space-y-2">
              <div className={`bg-${name} border-secondary-200 h-16 w-full rounded-md border`} />
              <div className="text-xs">
                <div className="font-medium">{name}</div>
                <div className="text-secondary-500">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Neutral Colors (Tan/Beige)</h2>
        <p className="text-secondary-600 mb-4 text-sm">
          Subtle backgrounds and muted elements. Use for cards and dividers.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { name: "neutral-50", value: "#F2F2F2" },
            { name: "neutral-100", value: "#E9F0EE" },
            { name: "neutral-200", value: "#D9D9D9" },
            { name: "neutral-300", value: "#CDBA96" },
            { name: "neutral-400", value: "#BFA26C" },
            { name: "neutral-500", value: "#AFC8BF" },
            { name: "neutral-700", value: "#A38D63" },
          ].map(({ name, value }) => (
            <div key={name} className="space-y-2">
              <div className={`bg-${name} border-secondary-200 h-16 w-full rounded-md border`} />
              <div className="text-xs">
                <div className="font-medium">{name}</div>
                <div className="text-secondary-500">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Secondary Colors (Gray Scale)</h2>
        <p className="text-secondary-600 mb-4 text-sm">
          General UI elements, text, borders, and backgrounds.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-11">
          {[
            { name: "secondary-50", value: "#f8fafc" },
            { name: "secondary-100", value: "#f1f5f9" },
            { name: "secondary-200", value: "#e2e8f0" },
            { name: "secondary-300", value: "#cbd5e1" },
            { name: "secondary-400", value: "#94a3b8" },
            { name: "secondary-500", value: "#64748b" },
            { name: "secondary-600", value: "#475569" },
            { name: "secondary-700", value: "#334155" },
            { name: "secondary-800", value: "#1e293b" },
            { name: "secondary-900", value: "#0f172a" },
            { name: "secondary-950", value: "#020617" },
          ].map(({ name, value }) => (
            <div key={name} className="space-y-2">
              <div className={`bg-${name} border-secondary-200 h-16 w-full rounded-md border`} />
              <div className="text-xs">
                <div className="font-medium">{name}</div>
                <div className="text-secondary-500">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Error Colors</h2>
          <p className="text-secondary-600 mb-4 text-sm">
            For errors, warnings, and destructive actions.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "error-50", value: "#fef2f2" },
              { name: "error-100", value: "#fee2e2" },
              { name: "error-200", value: "#fecaca" },
              { name: "error-300", value: "#fca5a5" },
              { name: "error-400", value: "#f87171" },
              { name: "error-500", value: "#ef4444" },
              { name: "error-600", value: "#dc2626" },
              { name: "error-700", value: "#b91c1c" },
              { name: "error-800", value: "#991b1b" },
            ].map(({ name, value }) => (
              <div key={name} className="space-y-2">
                <div className={`bg-${name} border-secondary-200 h-12 w-full rounded border`} />
                <div className="text-xs">
                  <div className="font-medium">{name}</div>
                  <div className="text-secondary-500">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Success Colors</h2>
          <p className="text-secondary-600 mb-4 text-sm">
            For success states and positive feedback.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "success-50", value: "#f0fdf4" },
              { name: "success-100", value: "#dcfce7" },
              { name: "success-200", value: "#bbf7d0" },
              { name: "success-300", value: "#86efac" },
              { name: "success-400", value: "#4ade80" },
              { name: "success-500", value: "#22c55e" },
              { name: "success-600", value: "#16a34a" },
              { name: "success-700", value: "#15803d" },
              { name: "success-800", value: "#166534" },
            ].map(({ name, value }) => (
              <div key={name} className="space-y-2">
                <div className={`bg-${name} border-secondary-200 h-12 w-full rounded border`} />
                <div className="text-xs">
                  <div className="font-medium">{name}</div>
                  <div className="text-secondary-500">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Special Colors</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="bg-greeting-background border-secondary-200 h-16 w-full rounded-md border" />
            <div className="text-xs">
              <div className="font-medium">greeting-background</div>
              <div className="text-secondary-500">#F6F9F8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Spacing Tokens - Semantic spacing values for consistent sizing
 */
export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Standard Spacing Scale</h2>
        <div className="space-y-4">
          {[
            { name: "xs", value: "0.25rem (4px)" },
            { name: "sm", value: "0.5rem (8px)" },
            { name: "md", value: "1rem (16px)" },
            { name: "lg", value: "1.5rem (24px)" },
            { name: "xl", value: "2rem (32px)" },
            { name: "2xl", value: "3rem (48px)" },
            { name: "3xl", value: "4rem (64px)" },
          ].map(({ name, value }) => (
            <div key={name} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium">{name}</div>
              <div className={`bg-primary-700 h-8 p-${name}`} />
              <div className="text-secondary-500 text-sm">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Semantic Spacing Tokens</h2>
        <p className="text-secondary-600 mb-4 text-sm">
          Use these tokens for consistent sizing across components.
        </p>
        <div className="space-y-4">
          {[
            { name: "icon-sm", value: "1.5rem (24px)", usage: "Small icon containers" },
            {
              name: "icon-md",
              value: "2.25rem (36px)",
              usage: "Medium icon containers (heavily used)",
            },
            { name: "icon-lg", value: "2.5rem (40px)", usage: "Large icon containers" },
            { name: "header", value: "4rem (64px)", usage: "Standard header height" },
            { name: "section-min", value: "25rem (400px)", usage: "Minimum section height" },
          ].map(({ name, value, usage }) => (
            <div key={name} className="flex items-start gap-4">
              <div className="w-32 text-sm font-medium">{name}</div>
              <div className={`bg-primary-700 h-${name} w-${name} rounded-md`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{value}</div>
                <div className="text-secondary-500 text-xs">{usage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Usage Examples</h2>
        <div className="space-y-4">
          <div className="border-secondary-200 bg-secondary-50 rounded-md border p-4">
            <div className="mb-2 text-sm font-medium">Icon Button (icon-md)</div>
            <button className="bg-primary-700 h-icon-md w-icon-md hover:bg-primary-800 flex items-center justify-center rounded-full text-white transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>

          <div className="border-secondary-200 bg-secondary-50 rounded-md border p-4">
            <div className="mb-2 text-sm font-medium">
              Section with Minimum Height (section-min)
            </div>
            <div className="min-h-section-min border-secondary-300 flex items-center justify-center rounded-md border-2 border-dashed bg-white">
              <span className="text-secondary-500">Minimum height: 400px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Typography - Font families, sizes, and weights
 */
export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Font Families</h2>
        <div className="space-y-4">
          <div className="border-secondary-200 bg-secondary-50 rounded-md border p-4">
            <div className="text-secondary-500 mb-2 text-sm font-medium">font-sans (Lato)</div>
            <p className="font-sans text-lg">
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
            <p className="text-secondary-500 text-xs">Body text, navigation, UI elements</p>
          </div>
          <div className="border-secondary-200 bg-secondary-50 rounded-md border p-4">
            <div className="text-secondary-500 mb-2 text-sm font-medium">
              font-serif (Mollie Glaston)
            </div>
            <p className="font-serif text-lg">
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
            <p className="text-secondary-500 text-xs">Headings, greetings, decorative text</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Font Sizes</h2>
        <div className="space-y-4">
          {[
            { name: "text-xs", label: "12px / 16px line height", usage: "Small labels, badges" },
            { name: "text-sm", label: "14px / 20px line height", usage: "Navigation, captions" },
            { name: "text-base", label: "16px / 24px line height", usage: "Default body text" },
            { name: "text-lg", label: "18px / 28px line height", usage: "Emphasized text" },
            { name: "text-xl", label: "20px / 28px line height", usage: "Small headings" },
            { name: "text-2xl", label: "24px / 32px line height", usage: "Section headers" },
            {
              name: "text-3xl",
              label: "30px / 36px line height",
              usage: "Large headings (greetings)",
            },
            { name: "text-4xl", label: "36px / 40px line height", usage: "Hero text" },
          ].map(({ name, label, usage }) => (
            <div key={name} className="border-secondary-200 bg-secondary-50 rounded-md border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-secondary-500 text-sm font-medium">{name}</span>
                <span className="text-secondary-400 text-xs">{label}</span>
              </div>
              <p className={name}>The quick brown fox jumps over the lazy dog</p>
              <p className="text-secondary-500 mt-1 text-xs">{usage}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Font Weights</h2>
        <div className="space-y-4">
          {[
            { name: "font-normal", weight: "400", usage: "Body text, navigation" },
            { name: "font-medium", weight: "500", usage: "Buttons, emphasis" },
            { name: "font-semibold", weight: "600", usage: "Section labels" },
            { name: "font-bold", weight: "700", usage: "Headings, important text" },
          ].map(({ name, weight, usage }) => (
            <div key={name} className="border-secondary-200 bg-secondary-50 rounded-md border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-secondary-500 text-sm font-medium">{name}</span>
                <span className="text-secondary-400 text-xs">Weight: {weight}</span>
              </div>
              <p className={`text-lg ${name}`}>The quick brown fox jumps over the lazy dog</p>
              <p className="text-secondary-500 mt-1 text-xs">{usage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Border Radius - Rounding values for components
 */
export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="mb-4 text-2xl font-bold">Border Radius Scale</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "rounded-none", value: "0", usage: "Sharp corners" },
          { name: "rounded-sm", value: "2px", usage: "Subtle rounding" },
          { name: "rounded", value: "4px", usage: "Default - buttons, inputs" },
          { name: "rounded-base", value: "5px", usage: "Intermediate rounding" },
          { name: "rounded-md", value: "6px", usage: "Cards, containers" },
          { name: "rounded-lg", value: "8px", usage: "Large cards, panels" },
          { name: "rounded-xl", value: "12px", usage: "Modal corners" },
          { name: "rounded-2xl", value: "16px", usage: "Large panels" },
          { name: "rounded-3xl", value: "20px", usage: "Extra large cards/sections" },
          { name: "rounded-full", value: "9999px", usage: "Circles, pills, badges" },
        ].map(({ name, value, usage }) => (
          <div key={name} className="space-y-2">
            <div className={`bg-primary-700 h-24 w-full ${name}`} />
            <div className="text-sm">
              <div className="font-medium">{name}</div>
              <div className="text-secondary-500 text-xs">{value}</div>
              <div className="text-secondary-400 text-xs">{usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Shadows - Elevation and depth
 */
export const Shadows: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="mb-4 text-2xl font-bold">Shadow Scale</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "shadow-none", usage: "Remove shadow" },
          { name: "shadow-sm", usage: "Subtle elevation" },
          { name: "shadow", usage: "Default card shadow" },
          { name: "shadow-md", usage: "Header, prominent cards" },
          { name: "shadow-lg", usage: "Modals, dropdowns" },
          { name: "shadow-xl", usage: "Overlays" },
        ].map(({ name, usage }) => (
          <div key={name} className="space-y-2">
            <div className={`h-24 rounded-lg bg-white p-4 ${name}`}>
              <div className="text-sm font-medium">{name}</div>
              <div className="text-secondary-500 text-xs">{usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Complete Component Examples - Real-world usage
 */
export const ComponentExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Component Examples</h2>
        <p className="text-secondary-600 mb-6 text-sm">
          Real-world examples showing how design tokens are used in components.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-secondary-200 bg-secondary-50 rounded-md border p-6">
          <h3 className="mb-4 text-lg font-semibold">Primary Button</h3>
          <button className="bg-primary-700 hover:bg-primary-800 rounded-md px-6 py-3 font-medium text-white transition-colors">
            Click Me
          </button>
          <pre className="bg-secondary-900 mt-4 overflow-x-auto rounded p-3 text-xs text-white">
            {`<button className="bg-primary-700 hover:bg-primary-800 rounded-md px-6 py-3 font-medium text-white transition-colors">
  Click Me
</button>`}
          </pre>
        </div>

        <div className="border-secondary-200 bg-secondary-50 rounded-md border p-6">
          <h3 className="mb-4 text-lg font-semibold">Accent Badge</h3>
          <span className="bg-accent-500 inline-block rounded-full px-3 py-1 text-sm text-white">
            New Feature
          </span>
          <pre className="bg-secondary-900 mt-4 overflow-x-auto rounded p-3 text-xs text-white">
            {`<span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm">
  New Feature
</span>`}
          </pre>
        </div>

        <div className="border-secondary-200 bg-secondary-50 rounded-md border p-6">
          <h3 className="mb-4 text-lg font-semibold">Greeting Card</h3>
          <div className="bg-greeting-background rounded-lg p-6">
            <h2 className="text-primary-700 font-serif text-3xl font-bold">Good Morning, Aram</h2>
            <p className="text-secondary-600 mt-2">Hope you're having a great day!</p>
          </div>
          <pre className="bg-secondary-900 mt-4 overflow-x-auto rounded p-3 text-xs text-white">
            {`<div className="bg-greeting-background rounded-lg p-6">
  <h2 className="font-serif text-3xl font-bold text-primary-700">
    Good Morning, Aram
  </h2>
  <p className="text-secondary-600 mt-2">Hope you're having a great day!</p>
</div>`}
          </pre>
        </div>

        <div className="border-secondary-200 bg-secondary-50 rounded-md border p-6">
          <h3 className="mb-4 text-lg font-semibold">Icon Button Group</h3>
          <div className="flex gap-2">
            <button className="bg-primary-700 hover:bg-primary-800 h-icon-md w-icon-md flex items-center justify-center rounded-full text-white transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="hover:bg-primary-100 h-icon-md w-icon-md border-primary-700 text-primary-700 flex items-center justify-center rounded-full border bg-white transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="hover:bg-primary-100 h-icon-md w-icon-md text-primary-700 flex items-center justify-center rounded-full bg-transparent transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
          <pre className="bg-secondary-900 mt-4 overflow-x-auto rounded p-3 text-xs text-white">
            {`<button className="bg-primary-700 hover:bg-primary-800 h-icon-md w-icon-md flex items-center justify-center rounded-full text-white transition-colors">
  <Icon />
</button>`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
