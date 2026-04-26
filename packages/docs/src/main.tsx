import '@roar-workspace/ui/styles.css';
import {
  Avatar,
  Badge,
  Button,
  Card,
  ChartShell,
  Comment,
  CourseCard,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Header,
  HeaderInner,
  HeaderLeft,
  HeaderLogo,
  HeaderLogoIcon,
  HeaderNav,
  HeaderNavLink,
  HeaderRight,
  Input,
  LeaderboardRow,
  LeaderboardStat,
  PostCard,
  ProfileCard,
  ProfileStat,
  SearchBar,
  Select,
  StatsCard,
  Tag,
  Textarea,
  ThemedLineChart,
  Toaster,
  toast,
  Upvote,
} from '@roar-workspace/ui';
import { StrictMode, type ReactNode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const themes = ['light', 'dark'] as const;
const palettes = ['neutral', 'slate', 'teal', 'violet', 'amber', 'rose'] as const;

type Theme = (typeof themes)[number];
type Palette = (typeof palettes)[number];
type Page = 'components' | 'dashboard' | 'charts';

const trafficData = [
  { name: 'Mon', value: 240 },
  { name: 'Tue', value: 310 },
  { name: 'Wed', value: 290 },
  { name: 'Thu', value: 420 },
  { name: 'Fri', value: 380 },
  { name: 'Sat', value: 450 },
  { name: 'Sun', value: 520 },
];

const retentionData = [
  { name: 'Jan', value: 72 },
  { name: 'Feb', value: 74 },
  { name: 'Mar', value: 77 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 84 },
  { name: 'Jun', value: 86 },
];

const revenueData = [
  { name: 'Q1', value: 48 },
  { name: 'Q2', value: 56 },
  { name: 'Q3', value: 64 },
  { name: 'Q4', value: 73 },
];

function readTheme(): Theme {
  const saved = localStorage.getItem('rs-theme');
  return saved === 'dark' || saved === 'light' ? saved : 'light';
}

function readPalette(): Palette {
  const saved = localStorage.getItem('rs-palette');
  return palettes.includes(saved as Palette) ? (saved as Palette) : 'neutral';
}

function App() {
  const page = (document.body.dataset.page || 'components') as Page;
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [palette, setPalette] = useState<Palette>(readPalette);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('rs-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    localStorage.setItem('rs-palette', palette);
  }, [palette]);

  return (
    <>
      <Shell
        page={page}
        theme={theme}
        palette={palette}
        onThemeChange={setTheme}
        onPaletteChange={setPalette}
      >
        {page === 'dashboard' ? (
          <DashboardPage />
        ) : page === 'charts' ? (
          <ChartsPage />
        ) : (
          <ComponentsPage />
        )}
      </Shell>
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

function Shell({
  page,
  theme,
  palette,
  onThemeChange,
  onPaletteChange,
  children,
}: {
  page: Page;
  theme: Theme;
  palette: Palette;
  onThemeChange: (theme: Theme) => void;
  onPaletteChange: (palette: Palette) => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-rs-bg text-rs-content">
      <Header>
        <HeaderInner>
          <HeaderLeft>
            <HeaderLogo href="./index.html">
              <HeaderLogoIcon>R</HeaderLogoIcon>
              Roar UI
            </HeaderLogo>
            <HeaderNav className="hidden md:flex">
              <HeaderNavLink href="./index.html" active={page === 'components'}>
                Components
              </HeaderNavLink>
              <HeaderNavLink href="./dashboard.html" active={page === 'dashboard'}>
                Dashboard
              </HeaderNavLink>
              <HeaderNavLink href="./charts.html" active={page === 'charts'}>
                Charts
              </HeaderNavLink>
            </HeaderNav>
          </HeaderLeft>
          <HeaderRight className="hidden lg:flex">
            <SearchBar aria-label="Search docs" placeholder="Search docs" kbd="Ctrl K" />
            <Select
              aria-label="Palette"
              className="h-9 w-28"
              value={palette}
              onChange={(event) => onPaletteChange(event.target.value as Palette)}
            >
              {palettes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </HeaderRight>
        </HeaderInner>
      </Header>
      <main className="mx-auto flex w-full max-w-[var(--rs-container-max)] flex-col gap-8 px-4 py-8 md:px-6">
        {children}
      </main>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5 border-b border-rs-border pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="mb-2 text-rs-xs font-semibold uppercase tracking-[0.12em] text-rs-primary">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold leading-tight text-rs-content md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-rs-base leading-7 text-rs-content-secondary">
          {description}
        </p>
      </div>
      {action}
    </section>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold text-rs-content">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-3xl text-rs-sm leading-6 text-rs-content-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function ComponentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Real package demo"
        title="Components rendered from @roar-workspace/ui"
        description="This page replaces the legacy hand-written class gallery with actual React components from the publishable package."
        action={
          <Button type="button" onClick={() => toast.success('Roar UI is wired up.')}>
            Trigger toast
          </Button>
        }
      />

      <Section title="Actions" description="Button variants, sizes, loading state, and icon-sized controls.">
        <Card padding="lg">
          <div className="grid gap-5">
            {(['primary', 'secondary', 'ghost', 'destructive'] as const).map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-2">
                <span className="w-24 text-rs-sm capitalize text-rs-content-muted">{variant}</span>
                <Button variant={variant} size="sm" type="button">
                  Small
                </Button>
                <Button variant={variant} size="md" type="button">
                  Medium
                </Button>
                <Button variant={variant} size="lg" type="button">
                  Large
                </Button>
                <Button variant={variant} loading type="button">
                  Loading
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Forms" description="Field, Label, Input, Select, and Textarea share tokenized focus and error states.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card padding="lg">
            <div className="grid gap-5">
              <Field label="Email" htmlFor="email" helperText="Used for product updates.">
                <Input id="email" type="email" placeholder="you@example.com" />
              </Field>
              <Field label="Workspace" htmlFor="workspace" errorText="Workspace is required.">
                <Input id="workspace" error placeholder="Roar Labs" />
              </Field>
              <Field label="Role" htmlFor="role">
                <Select id="role" defaultValue="admin">
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </Select>
              </Field>
            </div>
          </Card>
          <Card padding="lg">
            <Field label="Release notes" htmlFor="notes" helperText="Textarea uses the same input recipe.">
              <Textarea id="notes" rows={8} placeholder="Summarize what changed." />
            </Field>
          </Card>
        </div>
      </Section>

      <Section title="Status, identity, and surfaces">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card padding="lg" className="grid gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <Avatar key={size} size={size} fallback={size.toUpperCase()} online={size === 'md'} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag variant="primary">Primary</Tag>
              <Tag variant="success">Success</Tag>
              <Tag variant="warning">Warning</Tag>
              <Tag variant="error">Error</Tag>
              <Tag variant="cat-2">Category</Tag>
            </div>
          </Card>
          <Card padding="lg" className="grid gap-3">
            {(['common', 'rare', 'epic', 'legendary'] as const).map((tier) => (
              <Badge key={tier} tier={tier} icon={<span aria-hidden>*</span>}>
                {tier}
              </Badge>
            ))}
          </Card>
          <StatsCard icon={<span aria-hidden>#</span>} value="94%" label="Components using tokens" />
        </div>
      </Section>

      <Section title="Overlays">
        <Card padding="lg">
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="secondary">
                  Open dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm publish</DialogTitle>
                  <DialogDescription>
                    Dialog is backed by Radix and styled with Roar tokens.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button">Publish</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button type="button" variant="secondary" onClick={() => toast('Saved as draft.')}>
              Toast
            </Button>
          </div>
        </Card>
      </Section>

      <Section title="Product blocks" description="These are the current Roar-specific package components.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-rs border border-rs-border bg-rs-surface">
            <PostCard
              position="first"
              title="Package demos now use React"
              description="The public docs can be generated from actual Roar UI components."
              meta="Design system"
              tags={<Tag variant="primary">Docs</Tag>}
              thumbnail={<span aria-hidden>UI</span>}
              aside={<Upvote count={42} />}
            />
            <PostCard
              position="last"
              title="Legacy static reference remains available"
              description="The source of truth should move to package components as coverage improves."
              meta="Migration"
              tags={<Tag variant="warning">In progress</Tag>}
              thumbnail={<span aria-hidden>R</span>}
              aside={<Upvote count={18} active />}
            />
          </div>
          <div className="grid gap-4">
            <Comment
              avatar={<Avatar size="sm" fallback="A" />}
              author="Alex"
              time="Today"
              actions={<Button type="button" size="sm" variant="ghost">Reply</Button>}
            >
              Component examples should fail when the package API breaks.
            </Comment>
            <CourseCard
              title="Design-system polish"
              description="Add primitives, improve forms, and wire accessibility checks."
              difficulty={<Tag variant="intermediate">Roadmap</Tag>}
              thumbnail={<span aria-hidden>Plan</span>}
              footer={<Button type="button" size="sm">Review</Button>}
            />
          </div>
        </div>
      </Section>
    </>
  );
}

function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard prototype"
        title="A product screen composed from Roar UI"
        description="This page uses the current package components for cards, actions, charts, search, tags, and leaderboard rows."
        action={<Button type="button">Export report</Button>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard icon={<span aria-hidden>$</span>} value="$48.2k" label="Revenue this week" />
        <StatsCard icon={<span aria-hidden>%</span>} value="86%" label="Retention" />
        <StatsCard icon={<span aria-hidden>+</span>} value="1,248" label="New learners" />
        <StatsCard icon={<span aria-hidden>!</span>} value="12" label="Open reviews" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <ChartShell
          title="Workspace activity"
          description="ThemedLineChart from the package, wrapped in ChartShell."
          footer="Chart color follows the active palette."
        >
          <ThemedLineChart data={trafficData} height={320} />
        </ChartShell>
        <Card padding="lg" className="grid content-start gap-4">
          <div>
            <h2 className="text-lg font-semibold text-rs-content">Review queue</h2>
            <p className="text-rs-sm text-rs-content-secondary">Native table markup for now; promote this to a package Table component in Phase 4.</p>
          </div>
          <div className="overflow-hidden rounded-rs border border-rs-border">
            <table className="w-full border-collapse text-left text-rs-sm">
              <thead className="bg-rs-bg text-rs-content-muted">
                <tr>
                  <th className="px-3 py-2 font-medium">Item</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 text-right font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Token audit', 'Ready', '98'],
                  ['Table primitive', 'Queued', '72'],
                  ['A11y pass', 'Active', '86'],
                ].map(([item, status, score]) => (
                  <tr key={item} className="border-t border-rs-border">
                    <td className="px-3 py-3 text-rs-content">{item}</td>
                    <td className="px-3 py-3"><Tag variant={status === 'Ready' ? 'success' : status === 'Active' ? 'primary' : 'warning'}>{status}</Tag></td>
                    <td className="px-3 py-3 text-right font-semibold text-rs-content">{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card padding="none" className="overflow-hidden lg:col-span-2">
          <LeaderboardRow
            rank={1}
            user="Foundations"
            subtitle="Package metadata, tests, release flow"
            stats={<LeaderboardStat label="Progress" value="80%" />}
          />
          <LeaderboardRow
            rank={2}
            user="Accessibility"
            subtitle="Field wiring and Radix-backed primitives"
            stats={<LeaderboardStat label="Progress" value="45%" />}
          />
          <LeaderboardRow
            rank={3}
            user="Dashboard blocks"
            subtitle="Table, sidebar, pagination, empty states"
            stats={<LeaderboardStat label="Progress" value="35%" />}
          />
        </Card>
        <ProfileCard
          avatar={<Avatar size="lg" fallback="RW" online />}
          name="Roar Workspace"
          title="UI package"
          dept="React, Tailwind, tokens"
          stats={
            <>
              <ProfileStat label="Components" value="20" />
              <ProfileStat label="Pages" value="3" />
            </>
          }
        />
      </section>
    </>
  );
}

function ChartsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Charts"
        title="Chart examples using the package shell"
        description="The package currently exposes ChartShell and ThemedLineChart. This page shows the current capability and makes the expansion path obvious."
        action={<Button type="button" variant="secondary" onClick={() => toast.success('Chart docs use package components.')}>Check wiring</Button>}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <ChartShell title="Weekly activity" description="Default line chart">
          <ThemedLineChart data={trafficData} />
        </ChartShell>
        <ChartShell title="Retention" description="Same component, different data" footer="Future: add area, bar, donut, and legend components.">
          <ThemedLineChart data={retentionData} yKey="value" />
        </ChartShell>
        <ChartShell title="Revenue index" description="Compact panel" className="lg:col-span-2">
          <ThemedLineChart data={revenueData} height={220} />
        </ChartShell>
      </section>

      <Section title="Recommended chart roadmap" description="These are not implemented yet; they are shown as product requirements for the next chart phase.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['AreaChart', 'Trend panels with filled series and optional comparison.'],
            ['BarChart', 'Categorical metrics for dashboards and reports.'],
            ['DonutChart', 'Composition summaries with tokenized legends.'],
          ].map(([title, description]) => (
            <Card key={title} padding="lg">
              <h3 className="text-rs-base font-semibold text-rs-content">{title}</h3>
              <p className="mt-2 text-rs-sm leading-6 text-rs-content-secondary">{description}</p>
              <Tag className="mt-4" variant="warning">Planned</Tag>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
