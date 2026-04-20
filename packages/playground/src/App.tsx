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
  ROAR_UI_VERSION,
  SearchBar,
  Select,
  StatsCard,
  Tag,
  Textarea,
  ThemedLineChart,
  toast,
  Upvote,
} from '@roar-workspace/ui';
import { useEffect, useState } from 'react';

const PALETTES = ['neutral', 'slate', 'teal', 'violet', 'amber', 'rose'] as const;
const THEMES = ['light', 'dark'] as const;

type Palette = (typeof PALETTES)[number];
type Theme = (typeof THEMES)[number];

const VARIANTS = ['primary', 'secondary', 'ghost', 'destructive'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

const TAG_VARIANTS = [
  'neutral',
  'primary',
  'cat-1',
  'success',
  'error',
  'warning',
] as const;

const CHART_DATA = [
  { name: 'Mon', value: 240 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 220 },
  { name: 'Thu', value: 380 },
  { name: 'Fri', value: 320 },
  { name: 'Sat', value: 280 },
  { name: 'Sun', value: 360 },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [palette, setPalette] = useState<Palette>('neutral');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
  }, [palette]);

  return (
    <div className="min-h-screen bg-rs-bg font-rs text-rs-content">
      <Header>
        <HeaderInner>
          <HeaderLeft>
            <HeaderLogo href="#">
              <HeaderLogoIcon>R</HeaderLogoIcon>
              Roar UI
            </HeaderLogo>
            <HeaderNav>
              <HeaderNavLink href="#" active>
                Playground
              </HeaderNavLink>
              <HeaderNavLink href="#">Docs</HeaderNavLink>
            </HeaderNav>
          </HeaderLeft>
          <HeaderRight>
            <SearchBar
              placeholder="Search…"
              icon={<SearchIcon />}
              kbd="⌘K"
              aria-label="Search"
            />
          </HeaderRight>
        </HeaderInner>
      </Header>

      <div className="mx-auto max-w-4xl p-6">
        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-rs-content">
            Roar UI playground
          </h1>
          <p className="text-rs-sm text-rs-content-secondary">
            Package{' '}
            <code className="rounded-rs bg-rs-surface px-1">
              @roar-workspace/ui
            </code>{' '}
            v{ROAR_UI_VERSION} — Phase 3 component demos.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-rs-sm">
              <span className="text-rs-content-secondary">Theme</span>
              <select
                className="rounded-rs border border-rs-border bg-rs-surface px-2 py-1 text-rs-content"
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
              >
                {THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-rs-sm">
              <span className="text-rs-content-secondary">Palette</span>
              <select
                className="rounded-rs border border-rs-border bg-rs-surface px-2 py-1 text-rs-content"
                value={palette}
                onChange={(e) => setPalette(e.target.value as Palette)}
              >
                {PALETTES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-medium text-rs-content">
            Button matrix
          </h2>
          <div className="flex flex-col gap-6">
            {VARIANTS.map((variant) => (
              <div key={variant}>
                <p className="mb-2 text-rs-sm capitalize text-rs-content-muted">
                  {variant}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {SIZES.map((size) => (
                    <Button key={size} variant={variant} size={size} type="button">
                      {size}
                    </Button>
                  ))}
                  <Button variant={variant} size="md" loading type="button">
                    Loading
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-medium text-rs-content">Forms</h2>
          <div className="flex max-w-md flex-col gap-6">
            <Field label="Email" htmlFor="pf-email" helperText="We never share your email.">
              <Input id="pf-email" type="email" placeholder="you@example.com" />
            </Field>
            <Field label="Username" htmlFor="pf-user" errorText="That handle is taken.">
              <Input id="pf-user" error defaultValue="taken-name" />
            </Field>
            <Field label="Bio" htmlFor="pf-bio">
              <Textarea id="pf-bio" rows={3} placeholder="Short bio…" />
            </Field>
            <Field label="Country" htmlFor="pf-country">
              <Select id="pf-country" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
              </Select>
            </Field>
            <Field label="Ship date (native)" htmlFor="pf-date" helperText="v1 uses native date input + token styling only.">
              <Input id="pf-date" type="date" />
            </Field>
            <Field label="Disabled" htmlFor="pf-dis">
              <Input id="pf-dis" disabled placeholder="Unavailable" />
            </Field>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-medium text-rs-content">
            Tags, badges, avatars, cards
          </h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {TAG_VARIANTS.map((v) => (
              <Tag key={v} variant={v}>
                {v}
              </Tag>
            ))}
          </div>
          <div className="mb-6 flex flex-wrap gap-3">
            {(['common', 'rare', 'epic', 'legendary'] as const).map((tier) => (
              <Badge key={tier} tier={tier} icon={<span>★</span>}>
                {tier}
              </Badge>
            ))}
          </div>
          <div className="mb-6 flex flex-wrap items-end gap-4">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Avatar
                key={size}
                size={size}
                online={size === 'md'}
                fallback={size.toUpperCase()}
              />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card padding="md">
              <p className="text-rs-sm font-medium text-rs-content">Card</p>
              <p className="mt-1 text-rs-sm text-rs-content-secondary">
                Composable surface for stats and panels.
              </p>
            </Card>
            <Card padding="lg" className="border-rs-border-strong">
              <p className="text-rs-base font-semibold text-rs-content">
                Padded lg
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-medium text-rs-content">
            Dialog & toasts
          </h2>
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="secondary">
                  Open dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm action</DialogTitle>
                  <DialogDescription>
                    Radix Dialog with token-aligned surface and focus ring.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button">Continue</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              type="button"
              variant="secondary"
              onClick={() => toast.success('Saved with Sonner')}
            >
              Toast success
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => toast.error('Something went wrong')}
            >
              Toast error
            </Button>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-medium text-rs-content">Chart</h2>
          <ChartShell
            title="Weekly activity"
            description="Recharts + design tokens"
            footer="ThemedLineChart applies --rs-color-primary and grid borders."
          >
            <ThemedLineChart data={CHART_DATA} />
          </ChartShell>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-lg font-medium text-rs-content">
            Product blocks
          </h2>
          <div className="mb-6 overflow-hidden rounded-rs border border-rs-border bg-rs-surface shadow-rs-sm">
            <PostCard
              position="first"
              title="Design tokens in React"
              description="Colocated components using the same --rs-* variables as the static docs."
              meta={<span>12 comments · 2h ago</span>}
              tags={
                <>
                  <Tag variant="primary">UI</Tag>
                  <Tag variant="cat-2">Tokens</Tag>
                </>
              }
              thumbnail={<span className="text-xl">📎</span>}
              aside={<Upvote count={42} />}
            />
            <PostCard
              position="last"
              title="Playground QA"
              description="Theme and palette toggles mirror docs behavior."
              meta={<span>Roar team</span>}
              thumbnail={<span className="text-xl">✓</span>}
              aside={<Upvote count={8} active />}
            />
          </div>

          <div className="mb-6 space-y-0 rounded-rs border border-rs-border bg-rs-surface px-2">
            <Comment
              avatar={<Avatar size="sm" fallback="A" />}
              author="Alex"
              time="5m ago"
              actions={<Button size="sm" variant="ghost" type="button">Reply</Button>}
            >
              Great work on the migration plan.
            </Comment>
            <Comment
              avatar={<Avatar size="sm" fallback="B" />}
              author="Bo"
              time="1h ago"
              bordered
            >
              +1 for native date inputs in v1.
            </Comment>
          </div>

          <div className="mb-6 overflow-hidden rounded-rs border border-rs-border bg-rs-surface">
            <LeaderboardRow
              rank={1}
              user="Top Player"
              subtitle="Level 42"
              stats={
                <>
                  <LeaderboardStat label="Score" value="12.4k" />
                  <LeaderboardStat label="Wins" value="98" />
                </>
              }
            />
            <LeaderboardRow
              rank={2}
              user="Runner Up"
              stats={<LeaderboardStat label="Score" value="11.1k" />}
            />
            <LeaderboardRow
              rank={7}
              user="You"
              subtitle="Keep climbing"
              stats={<LeaderboardStat label="Score" value="3.2k" />}
            />
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileCard
              avatar={<Avatar size="lg" fallback="JD" />}
              name="Jane Doe"
              title="Staff Designer"
              dept="Design Systems"
              stats={
                <>
                  <ProfileStat label="Posts" value={128} />
                  <ProfileStat label="Rep" value="4.2k" />
                </>
              }
            />
            <CourseCard
              thumbnail={<span className="text-3xl">📘</span>}
              difficulty={<Tag variant="warning">Intermediate</Tag>}
              title="Advanced tokens"
              description="Deep dive into theming and palettes."
              footer={
                <>
                  <span className="text-rs-sm text-rs-content-muted">8 lessons</span>
                  <Button size="sm" type="button">
                    Enroll
                  </Button>
                </>
              }
            />
            <StatsCard
              icon={<span aria-hidden>📊</span>}
              value="94%"
              label="Completion"
            />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-medium text-rs-content">
            Preset utilities
          </h2>
          <p className="rounded-rs-lg border border-rs-border-strong bg-rs-surface p-4 text-rs-sm shadow-rs-sm">
            This panel uses{' '}
            <code className="text-rs-primary">bg-rs-surface</code>,{' '}
            <code className="text-rs-primary">border-rs-border-strong</code>, and{' '}
            <code className="text-rs-primary">text-rs-content-secondary</code>{' '}
            from the preset.
          </p>
        </section>
      </div>
    </div>
  );
}
