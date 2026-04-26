# `@roar-workspace/ui`

React + TypeScript components for Roar Workspace. Visual reference: [`../../docs/design-system.css`](../../docs/design-system.css).

## Quick start (new app, ~30 minutes)

1. **Install the package** (from npm when published, or link until then):

   ```bash
   npm install @roar-workspace/ui
   ```

   **Local / monorepo** (path to this folder):

   ```json
   "@roar-workspace/ui": "file:../path/to/UI library/packages/ui"
   ```

2. **Install React / Tailwind peers** (adjust if your app already has them):

   ```bash
   npm install react react-dom tailwindcss
   ```

3. **Load tokens** in your app entry (e.g. `main.tsx`) and set theme on `<html>` (or `document.documentElement`):

   ```ts
   import '@roar-workspace/ui/styles.css';
   ```

   ```html
   <!-- index.html -->
   <html lang="en" data-theme="light" data-palette="neutral">
   ```

4. **Tailwind v3** — add the preset and a **hoist-safe `content` glob** so JIT sees classes inside the built package:

   ```js
   // tailwind.config.cjs
   const path = require('node:path');
   const uiEntry = require.resolve('@roar-workspace/ui');
   const uiRoot = path.join(path.dirname(uiEntry), '..');
   const uiDistGlob = path.join(uiRoot, 'dist', '**', '*.js').replace(/\\/g, '/');

   module.exports = {
     presets: [require('@roar-workspace/ui/tailwind-preset')],
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', uiDistGlob],
   };
   ```

5. **Minimal shell** — button + toast proves tokens, Tailwind utilities, and Sonner:

   ```tsx
   // main.tsx
   import '@roar-workspace/ui/styles.css';
   import { StrictMode } from 'react';
   import { createRoot } from 'react-dom/client';
   import { App } from './App';

   createRoot(document.getElementById('root')!).render(
     <StrictMode>
       <App />
     </StrictMode>,
   );
   ```

   ```tsx
   // App.tsx
   import { Button, Toaster, toast } from '@roar-workspace/ui';

   export function App() {
     return (
       <>
         <Button type="button" onClick={() => toast.success('Roar UI is wired up.')}>
           Say hello
         </Button>
         <Toaster richColors position="top-right" />
       </>
     );
   }
   ```

For dialogs, charts, native date inputs, and the full API, see the sections below.

## AI assistants (bundled skill)

This package ships a portable **agent skill** (markdown + YAML frontmatter) so coding agents know how to install the library, load tokens, configure Tailwind, and use the barrel API.

| Where | Path |
|--------|------|
| **In this monorepo (git)** | [`skills/roar-workspace-ui/SKILL.md`](./skills/roar-workspace-ui/SKILL.md) |
| **After `npm install` in an app** | `node_modules/@roar-workspace/ui/skills/roar-workspace-ui/SKILL.md` |

**Bootstrap the skill** into your agent’s skill folder (paths depend on the product: Cursor, Claude Code, Codex, etc.):

1. Install **`@roar-workspace/ui`** so the files exist under `node_modules`.
2. Copy the directory **`skills/roar-workspace-ui/`** (contains `SKILL.md`) from the package into your tool’s project or user skill location.
3. Prefer **copy** over symlink if you frequently delete `node_modules`; re-copy after upgrades if the skill changed.

The skill is included in the **npm tarball** (`files` in `package.json` includes `skills`). Verify with `npm pack -w @roar-workspace/ui` and inspect the archive.

## Accessibility

- **`Button`**, **`Upvote`**, native **`<button>`** usage: use real buttons for actions; they expose focus and activation semantics by default (`focus-visible` ring on **`Button`**).
- **`Dialog`**: always provide **`DialogTitle`** (and **`DialogDescription`** when helpful). Radix manages focus trap and `Escape`; the overlay blocks background interaction.
- **Forms / `SearchBar`:** pair **`Field`** with **`Label`** / `htmlFor` + control `id`; use **`errorText`** so errors are associated via visible text (and `aria-invalid` on **`Input`** / **`Select`** / **`Textarea`** when using the `error` prop). Native-ish controls use a **`focus-visible`** ring for keyboard focus.
- **`PostCard`:** treat as **presentational**. For a clickable post, wrap it in a **link** (`<a>` / router link) or place the primary action in a real **`Button`**. As of **v0.5.1** the root element no longer sets `role="button"` / `tabIndex={0}`; see [CHANGELOG.md](../../CHANGELOG.md).
- **Toasts (`sonner`):** mount **`Toaster`** once; toasts should not be the only channel for critical errors users must acknowledge (use **`Dialog`** when appropriate).
- **Charts:** provide a text summary or table alternative when the chart conveys essential data.

## Tokens stylesheet

**`@roar-workspace/ui/styles.css`** ships the packaged **`--rs-*` token layer** (full `:root`, `[data-theme="dark"]`, and accent **`html[data-palette="…"]`** blocks from the docs) plus **`@keyframes`** used by components (`rs-spin`, `rs-shimmer`, `rs-dialog-in` / `rs-dialog-out`). It does **not** include the global reset or `body` chrome from the docs—only variables.

Set on **`document.documentElement`**:

- **`data-theme`:** `light` | `dark` (same as static docs).
- **`data-palette`:** `neutral` | `slate` | `teal` | `violet` | `amber` | `rose` (see [`../../docs/theme-palette.js`](../../docs/theme-palette.js)).

```ts
import '@roar-workspace/ui/styles.css';
```

## Tailwind preset (optional but recommended)

Add the preset so you can use utilities like **`bg-rs-primary`**, **`text-rs-content`**, **`rounded-rs`**, **`p-rs-4`**, **`shadow-rs-focus`**, **`font-rs`**, **`text-rs-sm`**, etc.

**CommonJS** `tailwind.config.cjs`:

```js
const path = require('node:path');
const uiEntry = require.resolve('@roar-workspace/ui');
const uiRoot = path.join(path.dirname(uiEntry), '..');
const uiDistGlob = path.join(uiRoot, 'dist', '**', '*.js').replace(/\\/g, '/');

module.exports = {
  presets: [require('@roar-workspace/ui/tailwind-preset')],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', uiDistGlob],
};
```

Using `require.resolve('@roar-workspace/ui')` keeps the **`dist` glob** correct when the package is hoisted in a monorepo. The package **`exports`** field includes a **`require`** condition so this resolves under Node.

## Peer dependencies

- `react`, `react-dom`
- `tailwindcss` **^3.4** — JIT must scan class strings in **`node_modules/@roar-workspace/ui/dist/**/*.js`**.

## Bundled feature dependencies

- **`@radix-ui/react-dialog`** — modal/dialog primitives (`Dialog`, `DialogContent`, …).
- **`sonner`** — toasts; this package exports **`Toaster`** (themed) and re-exports **`toast`** from `sonner`.
- **`recharts`** — charts; **`ChartShell`** + **`ThemedLineChart`** use tokens for grid, axes, and series color.

These are installed transitively with `@roar-workspace/ui` so root imports work for the full public API.

### Charts (v1)

**Recharts** is the chosen stack (React-first, composable, tree-shakeable). The static docs’ Chart.js gallery (`docs/chart-theme.js`) remains reference-only; **`ThemedLineChart`** maps **`--rs-color-primary`** and neutrals onto a line chart. For Chart.js-specific behavior, consume Chart.js directly in your app.

### Toasts (v1)

**Sonner** is the toast implementation. Mount **`Toaster`** once (e.g. next to your root):

```tsx
import { Toaster } from '@roar-workspace/ui';

export function Root() {
  return (
    <>
      <App />
      <Toaster richColors position="top-right" />
    </>
  );
}
```

Use **`toast()`** from **`@roar-workspace/ui`** (re-exported from `sonner`).

### Date / time (v1)

**Native** `<Input type="date" />` (and `time` / `datetime-local`) with token styling only—no custom calendar popover in v1. **`react-day-picker`** + **`@radix-ui/react-popover`** can be added later if product needs a shared picker.

## Monorepo playground

From the repo root, **`npm run dev:playground`** runs [`../playground`](../playground): theme and palette controls plus demos for primitives, layout, product blocks, dialog, toasts, and charts.

## Build (maintainers)

```bash
npm install
npm run build
```

## Consume locally (another app)

```json
"@roar-workspace/ui": "file:../path/to/UI library/packages/ui"
```

```tsx
import { Button, Toaster, toast, cn, ROAR_UI_VERSION } from '@roar-workspace/ui';
import '@roar-workspace/ui/styles.css';

export function Example() {
  return (
    <>
      <Button variant="secondary" size="md" onClick={() => toast('Hi')}>
        Submit
      </Button>
      <Toaster />
    </>
  );
}
```

### Public components (summary)

- **Actions:** `Button`
- **Forms:** `Field`, `Label`, `Input`, `Textarea`, `Select`
- **Display:** `Card`, `Tag`, `Badge`, `Avatar`
- **Layout:** `Header` (+ subcomponents), `SearchBar`
- **Feed / product:** `PostCard`, `Upvote`, `Comment`, `LeaderboardRow`, `LeaderboardStat`, `ProfileCard`, `ProfileStat`, `CourseCard`, `StatsCard`
- **Overlays:** `Dialog*` (Radix), `Toaster`, `toast`
- **Charts:** `ChartShell`, `ThemedLineChart`

### `Button` props

- `variant`: `primary` | `secondary` | `ghost` | `destructive`
- `size`: `sm` | `md` | `lg`
- `icon`: square icon-only layout
- `loading`: spinner, `aria-busy`, non-interactive
- Default `type` is `button`.

Rename the package in `package.json` when you publish under your npm org.
