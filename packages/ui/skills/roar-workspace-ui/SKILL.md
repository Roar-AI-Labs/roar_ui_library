---
name: roar-workspace-ui
description: >-
  Use when installing, configuring, or extending @roar-workspace/ui (Roar UI):
  Tailwind preset, tokens stylesheet, peers, barrel exports, monorepo component
  patterns, releases, or copying this skill from node_modules into an agent
  skills folder.
---

# Roar Workspace UI — agent skill

## When to use this skill

- Adding **`@roar-workspace/ui`** to an existing React app (Vite, Next, etc.).
- Debugging missing styles (tokens not loaded, Tailwind classes not generated).
- Contributing **new components** inside this monorepo’s `packages/ui`.
- Preparing a **release** (version, `ROAR_UI_VERSION`, `CHANGELOG.md`).
- **Bootstrapping** this skill into Cursor / Claude Code / Codex after `npm install`.

## Consume the package (another repository)

1. **Install** the library and **peers** (adjust versions to match the app):

   ```bash
   npm install @roar-workspace/ui react react-dom tailwindcss @radix-ui/react-dialog sonner recharts
   ```

2. **Styles:** in the app entry (e.g. `main.tsx`):

   ```ts
   import '@roar-workspace/ui/styles.css';
   ```

3. **Theme / palette** on `<html>`:

   - `data-theme="light"` | `"dark"`
   - `data-palette="neutral"` | `slate` | `teal` | `violet` | `amber` | `rose`

4. **Tailwind v3** — preset + **hoist-safe `content` glob** so JIT scans classes inside the built package:

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

5. **Imports:** use the **public barrel** only:

   ```ts
   import { Button, Field, Input, Dialog, toast, Toaster } from '@roar-workspace/ui';
   ```

   Do **not** deep-import from `@roar-workspace/ui/dist/...` or unpublished paths.

6. **Dialogs / toasts / charts:** peers must be installed; mount **`Toaster`** once if using `toast()`.

Full human docs: `packages/ui/README.md` in this monorepo, or the same file inside **`node_modules/@roar-workspace/ui/README.md`** after install.

## Contribute in this monorepo (`packages/ui`)

- One folder per component under `packages/ui/src/components/<name>/`.
- Export from **`packages/ui/src/index.ts`** only (barrel).
- Match existing patterns: `forwardRef` where appropriate, `cn`, `cva`, `var(--rs-*)` classes.
- Run from repo root: `npm run build` (and `npm run build:playground` when UI changes affect demos).
- Releases: follow **VERSIONING.md** and **CHANGELOG.md** at the **monorepo root** (when you have this repository cloned); they are not shipped inside the npm package tarball.

## Install this skill from the npm package (after `npm install`)

The canonical skill files ship with the package under:

```text
node_modules/@roar-workspace/ui/skills/roar-workspace-ui/SKILL.md
```

**Bootstrap (conceptual):** copy the folder `skills/roar-workspace-ui/` into your tool’s skill directory, for example:

- **Cursor (project):** `.cursor/skills/roar-workspace-ui/` (copy `SKILL.md` into that folder).
- **Cursor (personal):** `~/.cursor/skills/roar-workspace-ui/`.
- **Other tools:** use the path your product documents for custom skills.

Prefer **copy** over symlink if `node_modules` is routinely deleted. Re-copy after major package upgrades if the skill content changed.

**From a git clone of this monorepo** (no npm install yet), the same file lives at:

```text
packages/ui/skills/roar-workspace-ui/SKILL.md
```

## Accessibility reminders

- **`PostCard`** is presentational; use a real link or button for navigation.
- **`Dialog`:** include **`DialogTitle`** (and description when useful).
- **Forms:** use **`Field`** + **`Label`** + `htmlFor` / `id`; use `error` prop for invalid state.
