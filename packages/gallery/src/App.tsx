import { Button, Card, ROAR_UI_VERSION } from '@roar-workspace/ui';

/**
 * Minimal consumer app: depends on the workspace package like an external install.
 * Add peers (Radix, Sonner, Recharts) when you demo those components here.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-rs-bg p-8 font-rs text-rs-content">
      <h1 className="mb-2 text-xl font-semibold">Roar UI gallery</h1>
      <p className="mb-6 text-rs-sm text-rs-content-secondary">
        <code className="rounded-rs bg-rs-surface px-1">@roar-workspace/ui</code> v
        {ROAR_UI_VERSION}
      </p>
      <Card padding="md" className="max-w-md">
        <p className="mb-4 text-rs-sm text-rs-content-secondary">
          Smoke test: tokens + Tailwind preset + a component from the package build.
        </p>
        <Button type="button">Primary</Button>
      </Card>
    </div>
  );
}
