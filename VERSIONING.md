# Versioning policy

This monorepo ships a publishable UI library from **`packages/ui`** as **`@roar-workspace/ui`**.

## Semantic versioning

- **MAJOR** — Breaking changes to the public API (exports, prop types, required peers, or documented behavior consumers rely on).
- **MINOR** — New features, new components, or new optional props that remain backward compatible.
- **PATCH** — Bug fixes, documentation, internal refactors, accessibility corrections that do not change the intended public contract.

Pre-1.0, treat **minor** releases as the place for larger additions and **patch** for fixes and small polish; breaking changes should still be called out in [CHANGELOG.md](CHANGELOG.md) and ideally batched before 1.0.

## Source of truth

- **npm version:** `packages/ui/package.json` → `"version"`.
- **Runtime string:** `ROAR_UI_VERSION` in [`packages/ui/src/index.ts`](packages/ui/src/index.ts) must match the npm version at release time.

Release checklist:

1. Update [CHANGELOG.md](CHANGELOG.md) under a dated section for the new version.
2. Bump `"version"` in `packages/ui/package.json`.
3. Set `ROAR_UI_VERSION` to the same value.
4. `npm run build` from the repo root (and `npm pack -w @roar-workspace/ui` if you verify the tarball).

## Changelog

User-facing library changes belong in [CHANGELOG.md](CHANGELOG.md). Playground-only or monorepo-only tweaks can be noted there under **Documentation** or omitted if they do not affect consumers of the package.
