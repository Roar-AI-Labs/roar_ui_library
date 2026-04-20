# Roar Workspace UI — delivery roadmap

This repo holds the **static design reference** (`docs/`) and the **React UI package** (`packages/ui/`). Work proceeds in phases so each step produces something shippable without extra tooling (no Storybook).

---

## Phase 0 — Repository shape (done)

- [x] Monorepo layout: `docs/` for HTML/CSS/JS reference, `packages/ui/` for the npm-targeted library.
- [x] Move showcase pages and assets into `docs/` (`index.html`, `dashboard.html`, `charts.html`, shared CSS/JS).
- [x] Root `package.json` workspaces + `npm run build` wired to `@roar-workspace/ui`.
- [x] UI package scaffold: Vite ESM build, declaration emit, `cn()` + `ROAR_UI_VERSION` exports (see `packages/ui/`).
- [x] Root `README.md`, `.gitignore` covers `dist/` + `node_modules/`, initial commit records Phase 0 tree.

**How to view docs locally:** open `docs/index.html` in a browser, or from repo root run  
`npx --yes serve docs` and visit the printed URL (static server avoids `file://` quirks for some scripts).

---

## Phase 1 — UI package baseline

**Goal:** Installable TypeScript + React package with a clean public API and build output.

- Lock package name and scope (e.g. `@your-org/roar-ui`) in `packages/ui/package.json` (placeholder: `@roar-workspace/ui`).
- Add first real export (e.g. `Button`) — start by mapping `docs/design-system.css` `.rs-btn` patterns to Tailwind + tokens.
- `npm run build` produces `dist/` with types (`.d.ts`).
- Document **peer dependencies**: `react`, `react-dom` (and later `tailwindcss` if styles are utility-based) — see `packages/ui/README.md`.

**Exit criteria:** Another project can `npm install` the tarball or Git dependency and `import { … } from '@your-org/roar-ui'`.

---

## Phase 2 — Tokens and Tailwind

**Goal:** Single source of truth for theme variables aligned with the reference CSS.

- Port `:root` / `[data-theme="dark"]` / `[data-palette]` tokens from `docs/design-system.css` into `packages/ui` (Tailwind `theme.extend` + CSS variables, or a thin `tokens.css` consumed by the package).
- Document required Tailwind `content` paths and any `tailwind.config` presets for consumers.
- Verify light/dark and palette switching matches the `docs/` behavior (or document intentional differences).

**Exit criteria:** Components look correct in a minimal Vite+React+Tailwind consumer with your preset applied.

---

## Phase 3 — Component migration

**Goal:** Replace global BEM with colocated React components (composition over one huge stylesheet).

- **Primitives first:** button, input, label, card, avatar, tag/badge variants.
- **Layout:** header, search bar, table shell.
- **Product blocks:** post card, upvote, feed row, comments, leaderboard row, course card, stats, charts wrapper (choose Chart.js vs Recharts and stick to it).
- **Behavior:** reimplement `rs-picker.js` / modals / toasts with Radix (or equivalent) + React state — do not port vanilla DOM scripts verbatim.

**Exit criteria:** Feature parity with the main sections of `docs/index.html` for components you intend to support in v1.

---

## Phase 4 — Developer install experience

**Goal:** One clear way to adopt the system (add a second path later only if needed).

**Path A — npm package (recommended first):**

- Publish to npm (or private registry).
- README: install, peers, Tailwind setup, minimal example.

**Path B — shadcn-style registry + CLI (optional later):**

- Host `registry.json` (component file URLs).
- CLI `npx @your-org/roar-ui add button` copies source into the consumer repo.

**Exit criteria:** A new app can follow the README and render a screen using your components in under ~30 minutes.

---

## Phase 5 — Polish and governance

- Semantic versioning policy and changelog.
- Accessibility pass on interactive components (keyboard, focus, dialogs).
- Optional: visual gallery app under `packages/gallery` (Vite) that imports `@your-org/roar-ui` — **not** Storybook; same idea as `docs/` but for React.

---

## Folder reference


| Path           | Purpose                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `docs/`        | Static design system reference (legacy HTML/CSS/JS). Source of truth for visuals until React parity is reached. |
| `packages/ui/` | React + TypeScript library; Tailwind-based styling; published or linked as a workspace package.                 |


---

## What we are intentionally not doing (unless needs change)

- Storybook
- Separate `@scope/tokens` package until a second consumer truly needs it
- Supporting non-React targets in v1