# Design Tokens

This document outlines all design tokens available in the `@repo/ui` package. These tokens are centralized in `tailwind.config.ts` to ensure consistency across all UI components.

## Color Palette

### Primary Colors

The primary color palette represents the main brand color (teal/green).

| Token         | Value     | Usage                                           |
| ------------- | --------- | ----------------------------------------------- |
| `primary-50`  | `#f0fdf9` | Lightest background tints                       |
| `primary-100` | `#ccfbef` | Hover states for light backgrounds              |
| `primary-150` | `#B0C8BF` | Light teal accent                               |
| `primary-200` | `#99f6e0` | Active states                                   |
| `primary-300` | `#5fe9d0` | Borders, dividers                               |
| `primary-400` | `#2dd4bf` | Secondary buttons                               |
| `primary-500` | `#14b8a6` | Default primary color                           |
| `primary-600` | `#275E50` | **Main brand color** - primary buttons, headers |
| `primary-700` | `#1D4239` | Header background, dark buttons                 |
| `primary-800` | `#1e3a34` | Hover states for dark elements                  |
| `primary-900` | `#134239` | Darkest backgrounds                             |
| `primary-950` | `#042f2e` | Text on light backgrounds                       |

**Usage Example:**

```tsx
<button className="bg-primary-700 hover:bg-primary-800 text-white">Click Me</button>
```

---

### Accent Colors (Gold/Amber)

Accent colors for highlights, illustrations, and special call-outs.

| Token        | Value     | Usage                                 |
| ------------ | --------- | ------------------------------------- |
| `accent-50`  | `#F5E6CB` | Pale cream backgrounds                |
| `accent-100` | `#F4E5CA` | Light cream tints                     |
| `accent-200` | `#F5D59A` | Pale gold highlights                  |
| `accent-300` | `#FFCC6C` | Bright yellow-gold accents            |
| `accent-400` | `#E9CC95` | Light gold borders                    |
| `accent-500` | `#DEB260` | **Primary gold** - badges, highlights |
| `accent-600` | `#D7A13B` | Darker gold for contrast              |
| `accent-700` | `#A77D2D` | Dark gold text                        |
| `accent-800` | `#99582F` | Brown accents                         |

**Usage Example:**

```tsx
<span className="bg-accent-500 rounded-full px-3 py-1 text-white">New</span>
```

---

### Neutral Colors (Tan/Beige)

Neutral palette for subtle backgrounds and muted elements.

| Token         | Value     | Usage                        |
| ------------- | --------- | ---------------------------- |
| `neutral-50`  | `#F2F2F2` | Light gray backgrounds       |
| `neutral-100` | `#E9F0EE` | Very light teal background   |
| `neutral-200` | `#D9D9D9` | Borders, dividers            |
| `neutral-300` | `#CDBA96` | Tan accents                  |
| `neutral-400` | `#BFA26C` | Medium tan                   |
| `neutral-500` | `#AFC8BF` | Light teal (for non-SVG use) |
| `neutral-700` | `#A38D63` | Dark tan text                |

**Usage Example:**

```tsx
<div className="border border-neutral-200 bg-neutral-100 p-4">Subtle card background</div>
```

---

### Secondary Colors

Gray scale for general UI elements.

| Token           | Value     | Usage                |
| --------------- | --------- | -------------------- |
| `secondary-50`  | `#f8fafc` | Lightest backgrounds |
| `secondary-100` | `#f1f5f9` | Card backgrounds     |
| `secondary-200` | `#e2e8f0` | Borders              |
| `secondary-300` | `#cbd5e1` | Disabled states      |
| `secondary-400` | `#94a3b8` | Placeholder text     |
| `secondary-500` | `#64748b` | Secondary text       |
| `secondary-600` | `#475569` | Body text            |
| `secondary-700` | `#334155` | Headings             |
| `secondary-800` | `#1e293b` | Dark text            |
| `secondary-900` | `#0f172a` | Darkest text         |
| `secondary-950` | `#020617` | Black                |

---

### Error Colors

Red palette for errors, warnings, and destructive actions.

| Token       | Value     | Usage                           |
| ----------- | --------- | ------------------------------- |
| `error-50`  | `#fef2f2` | Light error backgrounds         |
| `error-100` | `#fee2e2` | Error tints                     |
| `error-200` | `#fecaca` | Error borders                   |
| `error-300` | `#fca5a5` | Light error text                |
| `error-400` | `#f87171` | Error icons                     |
| `error-500` | `#ef4444` | Default error color             |
| `error-600` | `#dc2626` | Error buttons, badges           |
| `error-700` | `#b91c1c` | Dark error backgrounds          |
| `error-800` | `#991b1b` | Error hover states              |
| `error-900` | `#7f1d1d` | Darkest error                   |
| `error-950` | `#450a0a` | Error text on light backgrounds |

---

### Success Colors

Green palette for success states and positive feedback.

| Token         | Value     | Usage                             |
| ------------- | --------- | --------------------------------- |
| `success-50`  | `#f0fdf4` | Light success backgrounds         |
| `success-100` | `#dcfce7` | Success tints                     |
| `success-200` | `#bbf7d0` | Success borders                   |
| `success-300` | `#86efac` | Light success text                |
| `success-400` | `#4ade80` | Success icons                     |
| `success-500` | `#22c55e` | Default success color             |
| `success-600` | `#16a34a` | Success buttons                   |
| `success-700` | `#15803d` | Dark success backgrounds          |
| `success-800` | `#166534` | Success hover states              |
| `success-900` | `#14532d` | Darkest success                   |
| `success-950` | `#052e16` | Success text on light backgrounds |

---

### Greeting Background

Special background color for greeting components.

| Token                 | Value     | Usage                          |
| --------------------- | --------- | ------------------------------ |
| `greeting-background` | `#F6F9F8` | Greeting component backgrounds |

---

## Spacing Tokens

Semantic spacing tokens for consistent sizing across components.

| Token             | Value            | Usage                                     |
| ----------------- | ---------------- | ----------------------------------------- |
| `xs`              | `0.25rem` (4px)  | Minimal spacing                           |
| `sm`              | `0.5rem` (8px)   | Small spacing                             |
| `md`              | `1rem` (16px)    | Medium spacing (default)                  |
| `lg`              | `1.5rem` (24px)  | Large spacing                             |
| `xl`              | `2rem` (32px)    | Extra large spacing                       |
| `2xl`             | `3rem` (48px)    | Double extra large                        |
| `3xl`             | `4rem` (64px)    | Triple extra large                        |
| **`icon-sm`**     | `1.5rem` (24px)  | Small icon containers                     |
| **`icon-md`**     | `2.25rem` (36px) | **Medium icon containers** (heavily used) |
| **`icon-lg`**     | `2.5rem` (40px)  | Large icon containers                     |
| **`header`**      | `4rem` (64px)    | Standard header height                    |
| **`section-min`** | `25rem` (400px)  | Minimum section height                    |

**Usage Examples:**

```tsx
// Icon buttons
<button className="h-icon-md w-icon-md">
  <Icon />
</button>

// Header
<header className="h-header">
  ...
</header>

// Section with minimum height
<section className="min-h-section-min">
  ...
</section>
```

---

## Typography

### Font Families

| Token        | Value                      | Usage                                |
| ------------ | -------------------------- | ------------------------------------ |
| `font-sans`  | Lato + system fallbacks    | Body text, navigation, UI elements   |
| `font-serif` | Mollie Glaston + fallbacks | Headings, greetings, decorative text |

### Font Sizes

| Token       | Size | Line Height | Usage                      |
| ----------- | ---- | ----------- | -------------------------- |
| `text-xs`   | 12px | 16px        | Small labels, badges       |
| `text-sm`   | 14px | 20px        | Navigation, captions       |
| `text-base` | 16px | 24px        | **Default body text**      |
| `text-lg`   | 18px | 28px        | Emphasized text            |
| `text-xl`   | 20px | 28px        | Small headings             |
| `text-2xl`  | 24px | 32px        | Section headers            |
| `text-3xl`  | 30px | 36px        | Large headings (greetings) |
| `text-4xl`  | 36px | 40px        | Hero text                  |
| `text-6xl`  | -    | -           | Extra large (404 pages)    |

**Usage Examples:**

```tsx
// Greeting with serif font
<h1 className="font-serif text-3xl font-bold">
  Good Morning, Aram
</h1>

// Body text
<p className="font-sans text-base text-secondary-600">
  Regular paragraph text
</p>
```

### Font Weights

| Class           | Weight | Usage                    |
| --------------- | ------ | ------------------------ |
| `font-normal`   | 400    | Body text, navigation    |
| `font-medium`   | 500    | Buttons, emphasis        |
| `font-semibold` | 600    | Section labels           |
| `font-bold`     | 700    | Headings, important text |

---

## Border Radius

| Token              | Value    | Usage                          |
| ------------------ | -------- | ------------------------------ |
| `rounded-none`     | 0        | Sharp corners                  |
| `rounded-sm`       | 2px      | Subtle rounding                |
| `rounded`          | 4px      | **Default** - buttons, inputs  |
| **`rounded-base`** | **5px**  | **Intermediate rounding**      |
| `rounded-md`       | 6px      | Cards, containers              |
| `rounded-lg`       | 8px      | Large cards, panels            |
| `rounded-xl`       | 12px     | Modal corners                  |
| `rounded-2xl`      | 16px     | Large panels                   |
| **`rounded-3xl`**  | **20px** | **Extra large cards/sections** |
| `rounded-full`     | 9999px   | Circles, pills, badges         |

**Usage Examples:**

```tsx
// Button with default rounding
<button className="rounded-md">Click</button>

// Icon button with circular shape
<button className="rounded-full">
  <Icon />
</button>

// Large card
<div className="rounded-3xl bg-white shadow-lg">
  ...
</div>
```

---

## Border Width

| Token      | Value | Usage               |
| ---------- | ----- | ------------------- |
| `border`   | 1px   | Default borders     |
| `border-0` | 0     | No border           |
| `border-2` | 2px   | Emphasized borders  |
| `border-4` | 4px   | Strong borders      |
| `border-8` | 8px   | Very strong borders |

---

## Shadows

Using Tailwind's default shadow scale:

| Class         | Usage                       |
| ------------- | --------------------------- |
| `shadow-sm`   | Subtle elevation            |
| `shadow`      | Default card shadow         |
| `shadow-md`   | **Header, prominent cards** |
| `shadow-lg`   | Modals, dropdowns           |
| `shadow-xl`   | Overlays                    |
| `shadow-none` | Remove shadow               |

---

## Transitions & Animations

### Transition Classes

| Class                  | Usage                            |
| ---------------------- | -------------------------------- |
| `transition-colors`    | **Most common** - buttons, links |
| `transition-transform` | Scale, rotate effects            |
| `transition-opacity`   | Fade in/out                      |
| `transition-all`       | All properties                   |

### Animation Tokens

| Token             | Duration | Easing           | Usage            |
| ----------------- | -------- | ---------------- | ---------------- |
| `animate-shimmer` | 2s       | linear, infinite | Loading skeleton |
| `animate-fadeIn`  | 0.3s     | ease-in-out      | Fade in elements |

---

## Best Practices

### 1. Use Semantic Tokens

❌ **Don't:**

```tsx
<button className="h-[36px] w-[36px]">
```

✅ **Do:**

```tsx
<button className="h-icon-md w-icon-md">
```

### 2. Avoid Magic Numbers

❌ **Don't:**

```tsx
<div className="min-h-[400px]">
```

✅ **Do:**

```tsx
<div className="min-h-section-min">
```

### 3. Use Color Tokens Consistently

❌ **Don't:**

```tsx
<div style={{ backgroundColor: "#DEB260" }}>
```

✅ **Do:**

```tsx
<div className="bg-accent-500">
```

### 4. Keep SVG Illustrations Separate

✅ **Do:**

- Keep illustration-specific colors (gradients) in SVG files
- Use design tokens for non-SVG component backgrounds and text
- This maintains design flexibility for illustrations

### 5. Leverage Tailwind's Default Scale

✅ **Do:**

- Use `gap-2`, `gap-3`, `gap-4` for spacing (Tailwind defaults)
- Use `px-4`, `py-3` for padding (Tailwind defaults)
- Only use custom tokens for brand-specific semantic values

---

## Component Examples

### Icon Button

```tsx
<IconButton
  icon={Bell}
  size="md" // Maps to icon-md internally
  variant="primary"
/>
```

### Header

```tsx
<header className="bg-primary-700 h-header shadow-md">
  <div className="flex items-center justify-between">
    <Logo />
    <button className="h-icon-md w-icon-md rounded-full">
      <UserIcon />
    </button>
  </div>
</header>
```

### Greeting Card

```tsx
<div className="bg-greeting-background rounded-lg p-6">
  <h2 className="text-primary-700 font-serif text-3xl font-bold">Good Morning, Aram</h2>
</div>
```

### Accent Badge

```tsx
<span className="bg-accent-500 rounded-full px-3 py-1 text-sm text-white">New Feature</span>
```

---

---

## Related Files

- **Configuration:** `packages/ui/tailwind.config.ts`
- **Storybook:** `packages/ui/src/stories/DesignTokens.stories.tsx`
- **Components:** All components in `packages/ui/src/`

---
