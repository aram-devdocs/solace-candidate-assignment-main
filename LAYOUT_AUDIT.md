# Layout Architecture Audit & Refactor

## Issues Identified

### Critical Issues

1. **Nested Main Elements (Accessibility Violation)**
   - Location: `RootLayout.tsx` line 222 + `AdvocateListTemplate.tsx` line 274
   - Problem: Two `<main>` elements nested inside each other
   - Impact: Invalid HTML5, breaks screen readers, fails WCAG compliance
   - Fix: Remove `<main>` from AdvocateListTemplate

2. **Multiple Nested Overflow Containers**
   - Locations:
     - `RootLayout.tsx` line 182: flex container (removed overflow-y-auto)
     - `RootLayout.tsx` line 222: main element with `overflow-y-auto`
     - `AdvocateListTemplate.tsx` line 274: `overflow-x-hidden`
     - `AdvocateTable.tsx` line 291: table wrapper with `overflow-auto`
   - Problem: Creates double scrollbars, confusing UX
   - Impact: Windows Chrome shows two scrollbars simultaneously
   - Fix: Single scrolling container pattern

3. **Incorrect Element Hierarchy**
   - Problem: Template components shouldn't define page-level semantic elements
   - Impact: Inflexible component reuse, semantic HTML violations
   - Fix: Templates should render fragments or divs, not main/article

### Architecture Issues

4. **Fixed Height Constraints on Table**
   - Location: `AdvocateTable.tsx` line 291
   - Problem: `max-h-[600px]` and `lg:max-h-[70vh]` with overflow-auto
   - Impact: Creates internal scrolling when main should scroll
   - Fix: Let content flow naturally, main container handles scroll

5. **Inconsistent Overflow Handling**
   - Problem: overflow-x-hidden scattered across multiple levels
   - Impact: Hard to debug horizontal scroll issues
   - Fix: Single point of horizontal overflow control

## Refactor Plan

### 1. RootLayout (Organism)

- Responsibility: Page-level layout with header, nav, footer
- Semantic: Provides `<main>` element
- Scrolling: Main container handles all vertical scrolling
- Change: Already fixed - removed overflow-y-auto from flex container

### 2. AdvocateListTemplate (Template)

- Responsibility: Page content composition
- Semantic: Use fragment instead of `<main>`
- Scrolling: No overflow control - flows naturally
- Change: Remove `<main>` wrapper and `overflow-x-hidden`

### 3. AdvocateTable (Organism)

- Responsibility: Table display with internal scrolling only when needed
- Semantic: Use `<div>` with role="region" for accessibility
- Scrolling: Table should scroll internally only on very large screens
- Change: Adjust max-height strategy for better UX

## Best Practices Applied

1. **Single Scrolling Container Pattern**
   - One primary scroll container (main element)
   - Child components flow naturally
   - Internal scrolling only for specific widgets (modals, drawers)

2. **Semantic HTML**
   - One `<main>` per page
   - Templates use fragments/divs
   - Proper ARIA labels for scrollable regions

3. **Proper Component Boundaries**
   - Organisms: Page-level layout (RootLayout)
   - Templates: Content composition (AdvocateListTemplate)
   - Organisms: Feature sections (AdvocateTable)
   - Clear separation of concerns

4. **Accessibility**
   - No nested main elements
   - Proper landmark roles
   - Screen reader friendly structure

## Implementation

See refactored files:

- `/workspace/packages/ui/src/organisms/RootLayout.tsx`
- `/workspace/packages/ui/src/templates/AdvocateListTemplate.tsx`
- `/workspace/packages/ui/src/organisms/AdvocateTable.tsx`
