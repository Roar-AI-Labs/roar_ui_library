# Roar Workspace — static design reference

These files are the **HTML/CSS/JS showcase** for the design system. They stay in sync with migration work in `packages/ui/` until React components reach parity.

## Pages

| File | Contents |
|------|----------|
| `index.html` | Full component gallery (foundations + UI blocks + mockups). |
| `dashboard.html` | Dashboard prototype with Chart.js panels. |
| `charts.html` | Charts gallery and documentation. |

## Local preview

Relative paths (`design-system.css`, `*.js`) assume all assets live in this folder.

- **Quick:** double-click `index.html` or open it from your editor’s simple browser preview.
- **Recommended:** serve the folder so scripts behave like a real site:

```bash
npx --yes serve docs
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Related

See the repo root **`ROADMAP.md`** for phased migration into the React package under `packages/ui/`.
