# UI Redesign Prompt Pack (Modern + Clean + Human)

Use this when the UI “looks AI-generated” (generic gradients, random spacing, inconsistent typography). This is **UI-only**: keep business logic intact.

---

## 1) Master Prompt (paste into your AI UI tool)

**System / Role**
You are a senior product designer + front-end UI engineer. Your job is to refactor an existing UI to feel modern, clean, and human-designed. Do not change business logic, API contracts, or data flow—only presentation/UI structure.

**Context**
I already have working logic. The current UI looks AI-generated: inconsistent spacing, weak typography hierarchy, generic components, and poor alignment.

**Goal**
Redesign the UI to look like a polished SaaS product in 2026: minimal, crisp typography, strong spacing system, coherent components, accessible contrast, responsive layout, consistent interactions.

**Hard Constraints**
- **UI-only changes**: do not change endpoints, state shape, validation rules, or core logic.
- Keep existing data bindings and component boundaries unless restructuring improves UI clarity without changing behavior.
- No random gradients, neon, glassmorphism, or over-styled effects.
- Use a consistent design system: spacing scale, type scale, color tokens.
- Must be **mobile-first**, responsive, and accessible (keyboard + screen reader basics).
- Prefer fewer components done well over many fancy ones.

**Design Language**
- Clean, modern, neutral palette; subtle surfaces; soft shadows only when necessary.
- One primary accent color, used sparingly.
- Typography: clear hierarchy (page title → section title → labels → helper text).
- Layout: 12-col grid on desktop, single column on mobile.
- Components: consistent buttons, inputs, dropdowns, tables, empty states, toasts, modals.
- Microinteractions: hover, focus, loading, disabled, error states.
- Copy: short, human, consistent. Avoid robotic labels.

**Output Requirements**
1. Provide a short **UI audit**: top 10 issues + how you’ll fix them.
2. Provide a **design spec**:
   - tokens (colors, spacing, radii, shadows, typography)
   - component guidelines (buttons, forms, cards, tables, modals)
3. Implement the refactor:
   - rewrite UI components with the new system
   - add consistent spacing + typography + layout
   - ensure responsive behavior
   - ensure accessibility (focus rings, aria labels where needed)
4. Deliver:
   - Updated component code
   - A “before → after” summary (what changed and why)

**Important**
If something is ambiguous, make the best assumption and proceed. Keep the UI minimal, consistent, and professional.

---

## 2) Targeted Prompt Add-ons (choose what applies)

### A) Make it feel “human-designed”
- Reduce visual noise. Align everything to a grid.
- Use consistent padding/margins everywhere (no arbitrary numbers).
- Remove decorative elements that don’t add meaning.
- Use fewer font sizes; use weight and spacing for hierarchy.

### B) Dashboard / SaaS vibe
- Top navigation + left sidebar (desktop), bottom nav or drawer (mobile).
- Clear page headers with primary actions on the right.
- Cards for metrics; tables for lists; filters pinned above tables.

### C) Forms
- Labels always visible (don’t rely on placeholder-only).
- Inline errors below fields; helper text light.
- Group fields into sections with headings and spacing.

### D) Tables / Lists
- Sticky header (desktop if needed).
- Row hover, selection states, empty state with CTA.
- Action menu per row instead of cluttered buttons.

### E) Empty + Loading States
- Skeleton loaders for content areas.
- Empty states explain what to do next + one clear CTA.
- Retry for error states.

---

## 3) Quick UI Quality Checklist (use to validate)

### Visual System
- [ ] Spacing uses a scale (4/8/12/16/24/32/48…)
- [ ] Only 1–2 radii values used consistently
- [ ] Shadows are subtle and consistent
- [ ] Accent color used only for primary actions + highlights

### Typography
- [ ] Clear hierarchy (H1/H2/body/label/helper)
- [ ] Line-height readable; no cramped text
- [ ] Labels are consistent and human

### Components
- [ ] Buttons: primary/secondary/ghost + loading/disabled
- [ ] Inputs: focus ring, error states, helper text
- [ ] Modals: trap focus, close on ESC, clear CTA
- [ ] Toasts: success/error with concise copy

### UX
- [ ] Every page has a clear primary action
- [ ] No dead-ends (empty states have CTA)
- [ ] Feedback on actions (loading → success/fail)

### Accessibility
- [ ] Keyboard nav works (tab order sane)
- [ ] Focus states visible
- [ ] Contrast is acceptable (don’t use light gray on white)
- [ ] aria-labels for icon buttons

---

## 4) If you want the AI to only touch styling (strict mode)

Add this line to the prompt:

> Strict mode: you may only change classNames/styles, layout wrappers, typography, and presentational components. You may not rename state variables, props, query keys, API functions, or event handlers.

---

## 5) Template “Design Tokens” (drop-in suggestion)

Use these as a baseline (adapt to your stack):

- Spacing: 4, 8, 12, 16, 24, 32, 48
- Radius: 12 (cards), 10 (inputs/buttons), 999 (pills)
- Border: 1px neutral
- Shadow: subtle for elevated surfaces only
- Typography:
  - H1 28–32 / semibold
  - H2 18–20 / semibold
  - Body 14–16 / normal
  - Label 12–13 / medium
  - Helper 12 / normal muted

---

## 6) “Paste this with your code” wrapper prompt (recommended)

When you paste your existing UI code, precede it with:

> Here is my current UI code. Keep all logic and behavior identical. Refactor ONLY the UI to match the design system described above. Return updated files/components with consistent tokens, responsive layout, and accessible states.

---

## Notes
- If you tell me your stack (Next.js + Tailwind? shadcn? MUI? plain CSS?) I can tailor the prompt to that ecosystem with exact component library language.