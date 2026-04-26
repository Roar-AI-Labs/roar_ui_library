# Roar Workspace Docs

The public docs pages in this folder are static build outputs for GitHub Pages. Their source now lives in `packages/docs` and renders real components from `@roar-workspace/ui`.

## Pages

| File | Contents |
|------|----------|
| `index.html` | Component gallery rendered from the package. |
| `dashboard.html` | Dashboard prototype rendered from the package. |
| `charts.html` | Charts gallery rendered from the package. |

## Build And Preview

From the repository root:

```bash
npm run build:docs
npm run dev:docs
```

`npm run build:docs` writes the static HTML and assets into this folder.

To preview the built static output without Vite:

```bash
npx --yes serve docs
```

## Related

See the repo root `ROADMAP.md` and the local ignored plan at `docs/UI_LIBRARY_POLISH_PLAN.md`.
