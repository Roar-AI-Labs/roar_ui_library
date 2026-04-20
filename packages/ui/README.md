# `@roar-workspace/ui`

React + TypeScript UI package for Roar Workspace. Styling will follow the tokens and patterns in `../../docs/design-system.css` (see repo **`ROADMAP.md`**).

## Status

Phase 1 scaffold: build pipeline and `cn()` helper. Components and Tailwind token preset are added in later roadmap phases.

## Build

From the **repository root**:

```bash
npm install
npm run build
```

## Consume locally (another app)

In a consumer `package.json`:

```json
"@roar-workspace/ui": "file:../path/to/UI library/packages/ui"
```

Then:

```tsx
import { cn, ROAR_UI_VERSION } from '@roar-workspace/ui';
```

Peers: `react`, `react-dom`.
