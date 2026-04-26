# Changelog

All notable changes to **`@roar-workspace/ui`** are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) as described in [VERSIONING.md](VERSIONING.md).

## [Unreleased]

### Added

- **Bundled agent skill:** `skills/roar-workspace-ui/SKILL.md` ships with the npm package (`files` includes `skills`) for Cursor / Claude Code / Codex-style workflows; see root [README.md](README.md) and [packages/ui/README.md](packages/ui/README.md).
- **Package subpath exports:** `@roar-workspace/ui/forms`, `/display`, `/layout`, `/product`, `/overlays`, and `/charts` provide supported category entrypoints in addition to the root barrel.
- **Validation baseline:** root typecheck, Vitest component tests, package smoke test, and Changesets release tooling are available for maintainers.

## [0.5.1] — 2026-04-19

### Fixed

- **PostCard:** removed `role="button"` and `tabIndex={0}` so the card stays presentational; wrap in a link or add a real control for navigation (see Accessibility in `packages/ui/README.md`).
- **Form controls (`Input`, `Textarea`, `Select`)** and **`SearchBar`:** focus ring uses `focus-visible` so pointer clicks do not always show the ring while keyboard focus remains obvious.

### Documentation

- Phase 5 governance: [VERSIONING.md](VERSIONING.md), **Accessibility** in `packages/ui/README.md`, roadmap checkpoint.
- Monorepo **`packages/gallery`**: minimal Vite consumer of the UI package (`npm run dev:gallery` / `build:gallery`).

## [0.5.0] — 2026-04-19

### Added

- Phase 3 component set: forms (`Field`, `Label`, `Input`, `Textarea`, `Select`), display (`Card`, `Tag`, `Badge`, `Avatar`), layout (`Header`, `SearchBar`), product blocks (`PostCard`, `Upvote`, `Comment`, leaderboard/profile/course/stats cards).
- Radix **`Dialog`**, Sonner **`Toaster`** + **`toast`** re-export, Recharts **`ChartShell`** + **`ThemedLineChart`**.
- Packaged tokens (`styles.css`), Tailwind preset, playground demos.
- Phase 4 publish hygiene (`prepublishOnly`, package metadata) and README **Quick start**.
