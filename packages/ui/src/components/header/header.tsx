import { type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Header({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--rs-z-header)] flex h-[var(--rs-header-height)] items-center border-b border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] px-[var(--rs-space-6)]',
        className,
      )}
      {...props}
    />
  );
}

export function HeaderInner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[var(--rs-container-max)] items-center justify-between',
        className,
      )}
      {...props}
    />
  );
}

export function HeaderLeft({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-[var(--rs-space-8)]',
        className,
      )}
      {...props}
    />
  );
}

export function HeaderLogo({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'flex items-center gap-[var(--rs-space-2)] text-[length:var(--rs-text-lg)] font-bold text-[var(--rs-color-content)] no-underline',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function HeaderLogoIcon({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-[var(--rs-radius)] bg-[linear-gradient(135deg,var(--rs-color-primary),var(--rs-color-primary-pressed))] text-[length:var(--rs-text-lg)] text-white',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeaderNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        'flex items-center gap-[var(--rs-space-1)]',
        className,
      )}
      {...props}
    />
  );
}

export type HeaderNavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
};

export function HeaderNavLink({
  className,
  active,
  ...props
}: HeaderNavLinkProps) {
  return (
    <a
      className={cn(
        'rounded-[var(--rs-radius)] px-[var(--rs-space-3)] py-[var(--rs-space-2)] text-[length:var(--rs-text-sm)] font-medium text-[var(--rs-color-content-secondary)] no-underline transition-all duration-150',
        'hover:bg-[var(--rs-color-surface-hover)] hover:text-[var(--rs-color-content)]',
        active &&
          'bg-[var(--rs-color-primary-subdued)] text-[var(--rs-color-primary)]',
        className,
      )}
      {...props}
    />
  );
}

export function HeaderRight({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-[var(--rs-space-3)]',
        className,
      )}
      {...props}
    />
  );
}
