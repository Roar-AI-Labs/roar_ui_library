# Roar Workspace UI — delivery roadmap

This repo holds the **static design reference** (`docs/`) and the **React UI package** (`packages/ui/`). Work proceeds in phases so each step produces something shippable without extra tooling (no Storybook).

---

## Phase 0 — Repository shape (done)

- Monorepo layout: `docs/` for HTML/CSS/JS reference, `packages/ui/` for the npm-targeted library.
- Move showcase pages and assets into `docs/` (`index.html`, `dashboard.html`, `charts.html`, shared CSS/JS).
- Root `package.json` workspaces + `npm run build` wired to `@roar-workspace/ui`.
- UI package scaffold: Vite ESM build, declaration emit, `cn()` + `ROAR_UI_VERSION` exports (see `packages/ui/`).
- Root `README.md`, `.gitignore` covers `dist/` + `node_modules/`, initial commit records Phase 0 tree.

**How to view docs locally:** open `docs/index.html` in a browser, or from repo root run  
`npx --yes serve docs` and visit the printed URL (static server avoids `file://` quirks for some scripts).

---

## Phase 1 — UI package baseline (done)

**Goal:** Installable TypeScript + React package with a clean public API and build output.

- Package name placeholder: `@roar-workspace/ui` (rename when publishing).
- `**Button`** export — Tailwind + `cva`, aligned with `.rs-btn` in `docs/design-system.css`; `**import '@roar-workspace/ui/styles.css'**` loads minimal `--rs-*` tokens + `rs-spin`.
- `npm run build` produces `dist/` with types (`.d.ts`).
- **Peers:** `react`, `react-dom`, `**tailwindcss` ^3.4** (required so JIT sees classes in `dist/`). See `packages/ui/README.md`.

**Exit criteria:** Another project can `npm install` the tarball or Git dependency and `import { Button, … } from '@roar-workspace/ui'` after adding the stylesheet + Tailwind `content` paths.

---

## Phase 2 — Tokens and Tailwind (done)

**Goal:** Single source of truth for theme variables aligned with the reference CSS.

- [x] **`packages/ui/styles/roar-tokens.css`** — full token + palette layers from `docs/design-system.css` (section 1, through accent blocks) + **`rs-spin`**; no global reset/body from section 2.
- [x] **`tailwind-preset.cjs`** — `theme.extend` maps **`rs-*` utilities** to `var(--rs-…)`; **`exports`** include **`./tailwind-preset`**; **`require`** condition on main entry for CJS resolvers.
- [x] **`packages/playground`** — Vite + React + Tailwind; **`npm run dev:playground`** / **`build:playground`**; theme + palette controls + **`Button`** matrix.
- [x] **`packages/ui/README.md`** — stylesheet contract, **`data-theme` / `data-palette`**, preset + **`content`** glob (hoist-safe).

**Exit criteria:** Components look correct in the playground with the preset applied; light/dark and palettes match the static docs’ token behavior.

---

## Phase 3 — Component migration (done)

**Goal:** Replace global BEM with colocated React components (composition over one huge stylesheet).

- **Primitives:** `Button`, `Field`, `Label`, `Input`, `Textarea`, `Select`, `Card`, `Avatar`, `Tag`, `Badge`.
- **Layout:** `Header` (+ subcomponents), `SearchBar`.
- **Product blocks:** `PostCard`, `Upvote`, `Comment`, `LeaderboardRow`, `ProfileCard`, `CourseCard`, `StatsCard`.
- **Charts:** `ChartShell`, `ThemedLineChart` — **Recharts** (documented in `packages/ui/README.md`; static docs Chart.js remains reference).
- **Behavior:** `@radix-ui/react-dialog` for modals; **Sonner** for toasts; date/time v1 = native inputs + tokens (no `rs-picker.js` port).

**Exit criteria:** Feature parity with the main sections of `docs/index.html` for v1 components; see playground for visual QA.

---

## Phase 4 — Developer install experience (done)

**Goal:** One clear way to adopt the system (add a second path later only if needed).

**Path A — npm package (recommended first):**

- Publish to npm (or private registry): `packages/ui` has **`prepublishOnly`** build, **`license`**, **`keywords`**, **`repository`** / **`bugs`** / **`homepage`** (adjust URLs to your org before shipping).
- README **Quick start** in `packages/ui/README.md`: install, peers, Tailwind setup, minimal `main` + `App` example.
- Root **`README.md`**: adoption pointer, **`npm pack`** verification, **`npm publish -w`** notes.

**Path B — shadcn-style registry + CLI (optional later):**

- Host `registry.json` (component file URLs).
- CLI `npx @your-org/roar-ui add button` copies source into the consumer repo.

**Exit criteria:** A new app can follow the README and render a screen using your components in under ~30 minutes.

---

## Phase 5 — Polish and governance (done)

- [CHANGELOG.md](CHANGELOG.md), [VERSIONING.md](VERSIONING.md), **Accessibility** in [`packages/ui/README.md`](packages/ui/README.md).
- **0.5.1:** **PostCard** presentational by default; form controls use **`focus-visible`** rings in `input-variants.ts`.
- **`packages/gallery`** — minimal Vite app that consumes **`@roar-workspace/ui`** like an external app (`npm run dev:gallery` / `build:gallery`).

---

## Folder reference


| Path           | Purpose                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `docs/`        | Static design system reference (legacy HTML/CSS/JS). Source of truth for visuals until React parity is reached. |
| `packages/ui/` | React + TypeScript library; Tailwind-based styling; published or linked as a workspace package.                 |
| `packages/gallery/` | Thin Vite consumer of the UI package for integration-style smoke tests (not Storybook).                          |


---

## What we are intentionally not doing (unless needs change)

- Storybook
- Separate `@scope/tokens` package until a second consumer truly needs it
- Supporting non-React targets in v1

