import { Button } from '@roar-workspace/ui';
import { Avatar, Badge, Card, Tag } from '@roar-workspace/ui/display';
import { Field, Input, Label, Select, Textarea } from '@roar-workspace/ui/forms';
import {
  Header,
  HeaderInner,
  HeaderLeft,
  HeaderLogo,
  HeaderLogoIcon,
  HeaderNav,
  HeaderNavLink,
  HeaderRight,
  SearchBar,
} from '@roar-workspace/ui/layout';
import {
  Comment,
  CourseCard,
  LeaderboardRow,
  LeaderboardStat,
  PostCard,
  ProfileCard,
  ProfileStat,
  StatsCard,
  Upvote,
} from '@roar-workspace/ui/product';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  toast,
} from '@roar-workspace/ui/overlays';
import { ChartShell, ThemedLineChart } from '@roar-workspace/ui/charts';
import { componentGroups, retentionData, revenueData, trafficData, type Page } from './docs-data';
import { PageHeader, Section } from './docs-shell';

export function renderPage(page: Page) {
  switch (page) {
    case 'forms':
      return <FormsPage />;
    case 'display':
      return <DisplayPage />;
    case 'layout':
      return <LayoutPage />;
    case 'product':
      return <ProductPage />;
    case 'overlays':
      return <OverlaysPage />;
    case 'charts':
      return <ChartsPage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'components':
    default:
      return <ComponentsPage />;
  }
}

function ComponentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Component library"
        title="Roar UI component demos"
        description="Browse the real package components by category. Each page imports from the public package entrypoints used by consumers."
        action={
          <Button type="button" onClick={() => toast.success('Roar UI is wired up.')}>
            Trigger toast
          </Button>
        }
      />

      <Section
        id="button"
        title="Button"
        description="Button remains available from the root package barrel. This page covers variants, sizes, loading, disabled, and icon-only controls."
      >
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
                <Button variant={variant} disabled type="button">
                  Disabled
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2 border-t border-rs-border pt-5">
              <span className="w-24 text-rs-sm text-rs-content-muted">Icon</span>
              <Button icon size="sm" aria-label="Add item">
                +
              </Button>
              <Button icon variant="secondary" aria-label="Open menu">
                #
              </Button>
              <Button icon size="lg" variant="ghost" aria-label="Favorite">
                *
              </Button>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Categories">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {componentGroups.slice(1).map((group) => (
            <a
              key={group.page}
              href={group.href}
              className="block rounded-rs border border-rs-border bg-rs-surface p-5 no-underline transition-[border-color,box-shadow] hover:border-rs-border-strong hover:shadow-rs-sm"
            >
              <div className="text-rs-base font-semibold text-rs-content">{group.label}</div>
              <p className="mt-2 text-rs-sm leading-6 text-rs-content-secondary">
                {group.description}
              </p>
              <p className="mt-4 text-rs-xs font-semibold uppercase tracking-[0.12em] text-rs-primary">
                {group.links.length} demos
              </p>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

function FormsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Forms"
        title="Form controls and validation states"
        description="These demos import from @roar-workspace/ui/forms and cover the currently shipped form components."
      />

      <Section id="field" title="Field" description="Field composes label, helper text, error text, and control spacing.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card padding="lg">
            <div className="grid gap-5">
              <Field label="Email" htmlFor="email" helperText="Used for product updates.">
                <Input id="email" type="email" placeholder="you@example.com" />
              </Field>
              <Field label="Workspace" htmlFor="workspace" errorText="Workspace is required.">
                <Input id="workspace" error placeholder="Roar Labs" />
              </Field>
            </div>
          </Card>
          <Card padding="lg">
            <Field label="Release notes" htmlFor="field-notes" helperText="Textarea can sit inside Field too.">
              <Textarea id="field-notes" rows={6} placeholder="Summarize what changed." />
            </Field>
          </Card>
        </div>
      </Section>

      <Section id="label" title="Label" description="Label is available separately for custom form layouts.">
        <Card padding="lg">
          <div className="max-w-md">
            <Label htmlFor="manual-label">Manual label</Label>
            <Input id="manual-label" placeholder="Custom composition" />
          </div>
        </Card>
      </Section>

      <Section id="input" title="Input" description="Input supports native input types plus tokenized default and error states.">
        <Card padding="lg">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Default input" />
            <Input type="date" aria-label="Date" />
            <Input error placeholder="Input with error" />
            <Input disabled placeholder="Disabled input" />
          </div>
        </Card>
      </Section>

      <Section id="select" title="Select" description="Select keeps the same height, border, focus, and error styling as Input.">
        <Card padding="lg">
          <div className="grid gap-4 md:grid-cols-3">
            <Select defaultValue="admin">
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </Select>
            <Select error defaultValue="missing">
              <option value="missing">Missing role</option>
              <option value="member">Member</option>
            </Select>
            <Select disabled defaultValue="locked">
              <option value="locked">Locked</option>
            </Select>
          </div>
        </Card>
      </Section>

      <Section id="textarea" title="Textarea" description="Textarea shares the input recipe and supports error and disabled states.">
        <Card padding="lg">
          <div className="grid gap-4 lg:grid-cols-2">
            <Textarea rows={6} placeholder="Write a product note." />
            <Textarea rows={6} error placeholder="Error note state." />
          </div>
        </Card>
      </Section>
    </>
  );
}

function DisplayPage() {
  return (
    <>
      <PageHeader
        eyebrow="Display"
        title="Surfaces, tags, badges, and avatars"
        description="These demos import from @roar-workspace/ui/display and show visual states used across product screens."
      />

      <Section id="card" title="Card" description="Card provides tokenized surface, border, radius, and padding variants.">
        <div className="grid gap-4 md:grid-cols-3">
          {(['sm', 'md', 'lg'] as const).map((padding) => (
            <Card key={padding} padding={padding}>
              <div className="text-rs-sm font-semibold text-rs-content">Padding {padding}</div>
              <p className="mt-2 text-rs-sm leading-6 text-rs-content-secondary">
                A simple content surface for repeated UI blocks.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="tag" title="Tag" description="Tags cover neutral, category, semantic, and skill-level tones.">
        <Card padding="lg">
          <div className="flex flex-wrap gap-2">
            {[
              'neutral',
              'primary',
              'cat-1',
              'cat-2',
              'cat-3',
              'cat-4',
              'cat-5',
              'cat-6',
              'success',
              'warning',
              'error',
              'info',
              'beginner',
              'intermediate',
              'advanced',
            ].map((variant) => (
              <Tag key={variant} variant={variant as never}>
                {variant}
              </Tag>
            ))}
          </div>
        </Card>
      </Section>

      <Section id="badge" title="Badge" description="Badges include tier colors, optional icons, and the legendary shimmer treatment.">
        <Card padding="lg">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {(['common', 'rare', 'epic', 'legendary'] as const).map((tier) => (
              <Badge key={tier} tier={tier} icon={<span aria-hidden>*</span>}>
                {tier}
              </Badge>
            ))}
          </div>
        </Card>
      </Section>

      <Section id="avatar" title="Avatar" description="Avatar covers shipped sizes, fallback content, images, and online presence.">
        <Card padding="lg">
          <div className="flex flex-wrap items-center gap-4">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Avatar key={size} size={size} fallback={size.toUpperCase()} online={size === 'md'} />
            ))}
            <Avatar
              size="xl"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
              alt="Product teammate"
              online
            />
          </div>
        </Card>
      </Section>
    </>
  );
}

function LayoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Layout"
        title="Header and search patterns"
        description="These demos import from @roar-workspace/ui/layout and show the shell primitives used by the docs app itself."
      />

      <Section id="header" title="Header" description="Header pieces compose a sticky product navigation bar.">
        <Card padding="none" className="overflow-hidden">
          <Header className="static">
            <HeaderInner>
              <HeaderLeft>
                <HeaderLogo href="#header">
                  <HeaderLogoIcon>D</HeaderLogoIcon>
                  Demo
                </HeaderLogo>
                <HeaderNav className="hidden sm:flex">
                  <HeaderNavLink href="#header" active>
                    Overview
                  </HeaderNavLink>
                  <HeaderNavLink href="#header">Reports</HeaderNavLink>
                  <HeaderNavLink href="#header">Settings</HeaderNavLink>
                </HeaderNav>
              </HeaderLeft>
              <HeaderRight>
                <Button size="sm" variant="secondary">
                  Invite
                </Button>
              </HeaderRight>
            </HeaderInner>
          </Header>
        </Card>
      </Section>

      <Section id="search-bar" title="SearchBar" description="SearchBar supports placeholder text, optional icon slot, keyboard hint, and sizing hooks.">
        <Card padding="lg">
          <div className="grid gap-4 md:grid-cols-2">
            <SearchBar aria-label="Search projects" placeholder="Search projects" kbd="Ctrl K" />
            <SearchBar
              aria-label="Search members"
              placeholder="Search members"
              icon={<span aria-hidden>#</span>}
              inputClassName="w-full"
            />
          </div>
        </Card>
      </Section>
    </>
  );
}

function ProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Roar-specific product blocks"
        description="These demos import from @roar-workspace/ui/product and show the app blocks currently shipped by the package."
      />

      <Section id="post-card" title="PostCard" description="PostCard supports feed position, thumbnail, tags, metadata, and aside content.">
        <Card padding="none" className="overflow-hidden">
          <PostCard
            position="first"
            title="Package demos now use React"
            description="The public docs are generated from actual Roar UI components."
            meta="Design system"
            tags={<Tag variant="primary">Docs</Tag>}
            thumbnail={<span aria-hidden>UI</span>}
            aside={<Upvote count={42} />}
          />
          <PostCard
            position="last"
            title="Category pages keep examples focused"
            description="Each component now has a clear place to live."
            meta="Documentation"
            tags={<Tag variant="success">Ready</Tag>}
            thumbnail={<span aria-hidden>R</span>}
            aside={<Upvote count={18} active />}
          />
        </Card>
      </Section>

      <Section id="upvote" title="Upvote" description="Upvote is a compact action with count, active state, and optional custom icon.">
        <Card padding="lg">
          <div className="flex flex-wrap gap-3">
            <Upvote count={24} />
            <Upvote count={86} active />
            <Upvote count="New" icon={<span aria-hidden>+</span>} />
          </div>
        </Card>
      </Section>

      <Section id="comment" title="Comment" description="Comment composes avatar, author, time, body, actions, and nested replies.">
        <Card padding="lg">
          <Comment
            avatar={<Avatar size="sm" fallback="A" />}
            author="Alex"
            time="Today"
            actions={<Button type="button" size="sm" variant="ghost">Reply</Button>}
            replies={
              <Comment avatar={<Avatar size="sm" fallback="R" />} author="Roar" time="Now" bordered={false}>
                Good component examples should break when package APIs break.
              </Comment>
            }
          >
            Component examples should fail when the package API breaks.
          </Comment>
        </Card>
      </Section>

      <Section id="leaderboard-row" title="LeaderboardRow" description="Leaderboard rows support rank treatment and stat slots.">
        <Card padding="none" className="overflow-hidden">
          {[1, 2, 3].map((rank) => (
            <LeaderboardRow
              key={rank}
              rank={rank}
              user={rank === 1 ? 'Foundations' : rank === 2 ? 'Documentation' : 'Components'}
              subtitle={rank === 1 ? 'Package hygiene' : rank === 2 ? 'Demo architecture' : 'Expansion phase'}
              stats={<LeaderboardStat label="Progress" value={rank === 1 ? '100%' : rank === 2 ? '70%' : '25%'} />}
            />
          ))}
        </Card>
      </Section>

      <Section id="profile-card" title="ProfileCard" description="ProfileCard presents identity, title, department, and stats.">
        <ProfileCard
          avatar={<Avatar size="lg" fallback="RW" online />}
          name="Roar Workspace"
          title="UI package"
          dept="React, Tailwind, tokens"
          stats={
            <>
              <ProfileStat label="Components" value="20" />
              <ProfileStat label="Pages" value="8" />
            </>
          }
        />
      </Section>

      <Section id="course-card" title="CourseCard" description="CourseCard supports thumbnail, difficulty badge, description, and footer actions.">
        <div className="grid gap-4 md:grid-cols-2">
          <CourseCard
            title="Design-system polish"
            description="Add primitives, improve forms, and wire accessibility checks."
            difficulty={<Tag variant="intermediate">Roadmap</Tag>}
            thumbnail={<span aria-hidden>Plan</span>}
            footer={<Button type="button" size="sm">Review</Button>}
          />
          <CourseCard
            title="Package confidence"
            description="Build, pack, and smoke-test consumer install paths."
            difficulty={<Tag variant="beginner">Foundation</Tag>}
            thumbnail={<span aria-hidden>Ship</span>}
            footer={<Button type="button" size="sm" variant="secondary">Open</Button>}
          />
        </div>
      </Section>

      <Section id="stats-card" title="StatsCard" description="StatsCard is a compact metric surface with optional icon.">
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard icon={<span aria-hidden>$</span>} value="$48.2k" label="Revenue this week" />
          <StatsCard icon={<span aria-hidden>%</span>} value="86%" label="Retention" />
          <StatsCard icon={<span aria-hidden>+</span>} value="1,248" label="New learners" />
        </div>
      </Section>
    </>
  );
}

function OverlaysPage() {
  return (
    <>
      <PageHeader
        eyebrow="Overlays"
        title="Dialog and toast feedback"
        description="These demos import from @roar-workspace/ui/overlays and use Radix-backed dialog behavior plus Sonner toast feedback."
        action={
          <Button type="button" onClick={() => toast.success('Toast from the overlays page.')}>
            Show toast
          </Button>
        }
      />

      <Section id="dialog" title="Dialog" description="Dialog includes trigger, content, header, description, footer, and close composition.">
        <Card padding="lg">
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
        </Card>
      </Section>

      <Section id="toaster" title="Toaster" description="The shared app shell mounts Toaster once so every docs page can trigger feedback.">
        <Card padding="lg">
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={() => toast.success('Saved successfully.')}>
              Success
            </Button>
            <Button type="button" variant="secondary" onClick={() => toast('Saved as draft.')}>
              Neutral
            </Button>
            <Button type="button" variant="destructive" onClick={() => toast.error('Publish failed.')}>
              Error
            </Button>
          </div>
        </Card>
      </Section>

      <Section id="toast" title="toast" description="toast is exported with Toaster from the overlays subpath for direct event handlers.">
        <Card padding="lg">
          <p className="text-rs-sm leading-6 text-rs-content-secondary">
            Use toast from event handlers after Toaster is mounted in the app shell.
          </p>
        </Card>
      </Section>
    </>
  );
}

function ChartsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Charts"
        title="Chart examples using the package shell"
        description="These demos import from @roar-workspace/ui/charts and show the current ChartShell and ThemedLineChart capability."
        action={
          <Button type="button" variant="secondary" onClick={() => toast.success('Chart docs use package components.')}>
            Check wiring
          </Button>
        }
      />

      <Section id="chart-shell" title="ChartShell" description="ChartShell provides heading, description, content padding, and optional footer.">
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartShell
            title="Weekly activity"
            description="Default line chart inside a standard shell."
            footer="Chart color follows the active palette."
          >
            <ThemedLineChart data={trafficData} />
          </ChartShell>
          <ChartShell
            title="Retention"
            description="Same shell, different data."
            footer="Use shell copy for chart context, not legends."
          >
            <ThemedLineChart data={retentionData} yKey="value" />
          </ChartShell>
        </div>
      </Section>

      <Section id="themed-line-chart" title="ThemedLineChart" description="ThemedLineChart supports custom height and data keys while reading color from Roar tokens.">
        <ChartShell title="Revenue index" description="Compact chart panel">
          <ThemedLineChart data={revenueData} height={220} />
        </ChartShell>
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
        description="This page stays as a product-style composition surface while category pages document individual components."
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
          description="ThemedLineChart from the charts subpath, wrapped in ChartShell."
          footer="Chart color follows the active palette."
        >
          <ThemedLineChart data={trafficData} height={320} />
        </ChartShell>
        <Card padding="lg" className="grid content-start gap-4">
          <div>
            <h2 className="text-lg font-semibold text-rs-content">Review queue</h2>
            <p className="text-rs-sm text-rs-content-secondary">
              Native table markup remains page-local until a Table component ships.
            </p>
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
                  ['Docs split', 'Active', '86'],
                  ['Component expansion', 'Queued', '72'],
                ].map(([item, status, score]) => (
                  <tr key={item} className="border-t border-rs-border">
                    <td className="px-3 py-3 text-rs-content">{item}</td>
                    <td className="px-3 py-3">
                      <Tag variant={status === 'Ready' ? 'success' : status === 'Active' ? 'primary' : 'warning'}>
                        {status}
                      </Tag>
                    </td>
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
            stats={<LeaderboardStat label="Progress" value="100%" />}
          />
          <LeaderboardRow
            rank={2}
            user="Docs architecture"
            subtitle="Category pages, sidebar, generated docs"
            stats={<LeaderboardStat label="Progress" value="70%" />}
          />
          <LeaderboardRow
            rank={3}
            user="Component expansion"
            subtitle="New primitives and motion pass"
            stats={<LeaderboardStat label="Progress" value="25%" />}
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
              <ProfileStat label="Pages" value="8" />
            </>
          }
        />
      </section>
    </>
  );
}
