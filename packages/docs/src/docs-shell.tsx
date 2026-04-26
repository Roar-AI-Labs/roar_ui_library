import { Button } from '@roar-workspace/ui';
import { Select } from '@roar-workspace/ui/forms';
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
import { type ReactNode } from 'react';
import {
  componentGroups,
  palettes,
  type Page,
  type Palette,
  type Theme,
} from './docs-data';

export function Shell({
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
  const isComponentPage = page !== 'dashboard';

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
              <HeaderNavLink href="./index.html" active={isComponentPage}>
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
      <main className="mx-auto grid w-full max-w-[var(--rs-container-max)] gap-8 px-4 py-8 md:px-6 lg:grid-cols-[248px_minmax(0,1fr)]">
        <DocsSidebar page={page} />
        <div className="grid min-w-0 content-start gap-8">{children}</div>
      </main>
    </div>
  );
}

function DocsSidebar({ page }: { page: Page }) {
  return (
    <aside className="lg:sticky lg:top-[calc(var(--rs-header-height)+var(--rs-space-6))] lg:self-start">
      <nav
        aria-label="Component categories"
        className="rounded-rs border border-rs-border bg-rs-surface p-3"
      >
        <div className="mb-2 px-2 text-rs-xs font-semibold uppercase tracking-[0.12em] text-rs-content-muted">
          Library
        </div>
        <div className="grid gap-1">
          {componentGroups.map((group) => {
            const active = page === group.page;

            return (
              <details key={group.page} open={active || group.page === 'components'}>
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-rs px-2 py-2 text-rs-sm font-semibold text-rs-content transition-colors hover:bg-rs-surface-hover [&::-webkit-details-marker]:hidden">
                  <a
                    href={group.href}
                    className={active ? 'text-rs-primary' : 'text-rs-content'}
                  >
                    {group.label}
                  </a>
                  <span aria-hidden className="text-rs-content-muted">
                    +
                  </span>
                </summary>
                <div className="mb-2 grid gap-1 border-l border-rs-border pl-3">
                  {group.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-rs px-2 py-1.5 text-rs-sm text-rs-content-secondary no-underline transition-colors hover:bg-rs-bg hover:text-rs-content"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export function PageHeader({
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

export function Section({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 grid gap-4">
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
