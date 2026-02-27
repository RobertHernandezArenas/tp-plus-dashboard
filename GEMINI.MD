# Gemini Rules & Skills for Nuxt 4 Project

## 1. Stack & Tools

- **Framework:** Nuxt 4 (Vue 3, Composition API, `<script setup>`).
- **Package Manager:** pnpm (ALWAYS use `pnpm` instead of `npm` or `yarn`).
- **Styling:** Use always Daisy UI +/or Tailwind CSS V4 (via `@tailwindcss/vite`).
- **TypeScript:** Strict mode enabled.

## 2. Best Practices & Clean Code

- **Composition API:** Use `<script setup lang="ts">` exclusively. Avoid Options API.
- **Composables:** Extract reusable logic into `composables/`. Keep them pure and side-effect free when it is
  possible.
- **Componentisation:** Componentise everything possible with a certain degree of consistency.
- **Type Safety:** Define explicit interfaces/types for all component props, emits, component refs, and API responses. Avoid `any`.
- **Naming Conventions:**
   - **Components:** PascalCase (e.g., `UserCard.vue`).
   - **Composables:** camelCase, prefixed with `use` (e.g., `useAuth.ts`).
   - **Utils:** camelCase (e.g., `formatDate.ts`).
   - **Files in `pages/`:** lowercase, kebab-case (e.g., `user-profile.vue`).
- **State Management:** Use Vue's reactivity (`ref`, `reactive`, `computed`) or Nuxt's `useState`. Avoid
  overly complex Pinia stores if simple native state suffices.

## 3. Frontend Architecture (Nuxt 4)

- **Directory Structure:** Follow standard Nuxt 4 auto-imports:
   - `components/`: UI components. Group by domain if necessary (e.g., `components/users/`).
   - `composables/`: Reusable stateful logic.
   - `utils/`: Stateless helper functions.
   - `server/`: Nitro API routes.
   - `pages/`: File-based routing.
- **Data Fetching:** Use `useFetch` or `useAsyncData` for SSR-compatible data fetching. Avoid using basic
  `fetch` inside components without wrapper.
- **Performance:** Ensure lazy loading of non-critical components using the `Lazy` prefix (e.g.,
  `<LazyUserModal />`).

## 4. Accessibility (A11y)

- **Semantic HTML:** Use proper HTML5 tags (`<button>`, `<nav>`, `<main>`, `<article>`, `<dialog>`). Don't use
  `<div>` for clickable elements.
- **ARIA Attributes:** Apply `aria-label`, `aria-hidden`, `aria-expanded`, and `role` where native elements
  fall short.
- **Keyboard Navigation:** Ensure all interactive elements are focusable (`tabindex="0"`) and triggerable via
  Enter/Space keys.
- **Color Contrast:** Ensure text meets WCAG AA standards (4.5:1 ratio).
- **Forms:** Always associate `<label>` with `<input>` (via `for` and `id`). Supply accessible error messages
  for screen readers.

## X. Execution Instructions for Gemini (Antigravity)

When "executing" this file, you must:

1. Scan the project for violations of these rules.
2. Fix any accessibility issues or bad practices found in core pages/components.
3. Ensure the project structure aligns with these standards.
