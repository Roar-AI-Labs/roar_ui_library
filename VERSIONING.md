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

1. Run `npm run check` from the repo root.
2. Add a Changeset with `npm run changeset` for package changes that should ship to npm.
3. Run `npm run version-packages` when preparing a release PR; this updates versions and changelogs from committed changesets.
4. Confirm `ROAR_UI_VERSION` in [`packages/ui/src/index.ts`](packages/ui/src/index.ts) matches the npm version before publishing.
5. Run `npm pack -w @roar-workspace/ui --dry-run` if you want to inspect the tarball.
6. Publish with `npm run release` after the release commit is merged and npm credentials are configured.

Manual changelog entries are still acceptable for local documentation-only changes, but package releases should prefer Changesets so version bumps and changelogs stay coordinated.

## Changelog

User-facing library changes belong in [CHANGELOG.md](CHANGELOG.md). Playground-only or monorepo-only tweaks can be noted there under **Documentation** or omitted if they do not affect consumers of the package.
