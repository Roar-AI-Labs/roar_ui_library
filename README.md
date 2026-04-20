# Roar Workspace UI

Monorepo for the **Roar** design reference (`docs/`) and the publishable React library **`@roar-workspace/ui`**. Components use **Tailwind CSS v3**, **CSS variables (`--rs-*`)**, and optional peers (**Radix Dialog**, **Sonner**, **Recharts**).

**Demo Preview:** [Design System](https://roar-ai-labs.github.io/roar_ui_library/) · [Dashboard](https://roar-ai-labs.github.io/roar_ui_library/dashboard.html) · [Charts](https://roar-ai-labs.github.io/roar_ui_library/charts.html)

**Roadmap:** [ROADMAP.md](ROADMAP.md) · **Changelog (library):** [CHANGELOG.md](CHANGELOG.md) · **Versioning:** [VERSIONING.md](VERSIONING.md)

---

## What’s in this repository

| Path | Purpose |
|------|---------|
| [docs/](docs/) | Static HTML/CSS/JS design system reference (`index.html`, `dashboard.html`, `charts.html`). |
| [packages/ui/](packages/ui/) | **`@roar-workspace/ui`** — React components, tokens (`styles/`), Tailwind preset, **bundled agent skill** under `skills/`. |
| [packages/playground/](packages/playground/) | Full visual QA app: `npm run dev:playground`. |
| [packages/gallery/](packages/gallery/) | Minimal “consumer” Vite app: `npm run dev:gallery`. |

---

## Prerequisites

- **Node.js** ≥ 18 ([nodejs.org](https://nodejs.org/))
- **npm** (comes with Node)
- **Git** — for cloning and version control (see below)

---

## Git: clone, work, and publish this repo

Git is used for **source control**; it is not installed *into* the npm package consumers download.

### If you already have a clone

```bash
cd "path/to/UI library"
git status
git pull
```

### New machine: clone

```bash
git clone <your-remote-url> roar-workspace-ui
cd roar-workspace-ui
```

Replace `<your-remote-url>` with your Git host (GitHub, GitLab, etc.). If you only have a local folder and no remote yet:

```bash
cd "path/to/UI library"
git init
git branch -M main   # or master; this repo may use master
git remote add origin <your-remote-url>
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Daily workflow (contributors)

```bash
git checkout -b feature/your-topic
# edit, then:
npm install
npm run build
git add -A
git commit -m "Describe the change clearly."
git push -u origin feature/your-topic
```

Use a **pull request** on your host to merge. Release process for the **library** is in [VERSIONING.md](VERSIONING.md).

---

## Install and run (contributors)

From the **repository root**:

```bash
npm install
npm run build              # builds @roar-workspace/ui
npm run build:playground
npm run build:gallery
```

| Script | What it does |
|--------|----------------|
| `npm run dev:playground` | Vite dev server for the full component playground. |
| `npm run dev:gallery` | Vite dev server for the minimal consumer app. |
| `npm run dev:ui` | Watch build of the UI package. |

---

## Use the library in *another* project

The **canonical install guide** is the **Quick start** in [**packages/ui/README.md**](packages/ui/README.md): `npm install`, peers, `import '@roar-workspace/ui/styles.css'`, Tailwind preset + `content` glob, and example `App` code.

**Local link (before npm publish):**

```json
"@roar-workspace/ui": "file:../path/to/UI library/packages/ui"
```

---

## AI / coding agents: read this repo and bootstrap the skill

Agents (Cursor, Claude Code, Codex, etc.) should **start from this README**, then open the **package README** and/or the **skill file**.

### Working inside *this* monorepo

1. Read [ROADMAP.md](ROADMAP.md) for phase scope.
2. Library source: `packages/ui/src/` — export new components only from `packages/ui/src/index.ts`.
3. Agent skill (workflows + consume instructions):  
   **[packages/ui/skills/roar-workspace-ui/SKILL.md](packages/ui/skills/roar-workspace-ui/SKILL.md)**

### Working in a *consumer* repo that depends on `@roar-workspace/ui`

1. Ensure `npm install` has run so the package exists under `node_modules`.
2. Open **`node_modules/@roar-workspace/ui/README.md`** for the human quick start.
3. Open **`node_modules/@roar-workspace/ui/skills/roar-workspace-ui/SKILL.md`** for agent-oriented steps.
4. **Install the skill into the tool** (optional but recommended): copy the folder `skills/roar-workspace-ui/` from that package path into the agent’s skill directory for Cursor / Claude / Codex (see your product docs). Use **copy**, not symlink, if `node_modules` is often wiped.

No `npm` command auto-registers skills; **copy or configure** is the portable approach.

---

## Verify the npm package contents

```bash
npm run build
npm pack -w @roar-workspace/ui
```

The `.tgz` should include among other paths: `package.json`, `README.md`, `dist/`, `styles/`, `tailwind-preset.cjs`, **`skills/roar-workspace-ui/SKILL.md`**.

---

## Publish `@roar-workspace/ui` to npm

1. Update **`repository` / `bugs` / `homepage`** in [packages/ui/package.json](packages/ui/package.json) if placeholders are wrong.
2. `npm login`
3. From repo root:

   ```bash
   npm publish -w @roar-workspace/ui --access public
   ```

   Scoped public packages need `--access public`. `prepublishOnly` runs **`npm run build`**.

---

## License

Library **`license`** field in [packages/ui/package.json](packages/ui/package.json) is currently **`UNLICENSED`** — change when you adopt a real license and add a `LICENSE` file if needed.

---

## Intentionally out of scope

See [ROADMAP.md](ROADMAP.md): Storybook, Path B registry/CLI (optional later), separate tokens package until needed.
