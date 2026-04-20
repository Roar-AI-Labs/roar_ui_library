import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

export const badgeVariants = cva(
  [
    'relative inline-flex items-center gap-[var(--rs-space-2)] overflow-hidden',
    'rounded-[var(--rs-radius)] px-[var(--rs-space-3)] py-[var(--rs-space-2)]',
    'text-[length:var(--rs-text-sm)] font-medium',
  ],
  {
    variants: {
      tier: {
        common: 'bg-[var(--rs-color-badge-common-bg)] text-[var(--rs-color-badge-common)]',
        rare: 'bg-[var(--rs-color-badge-rare-bg)] text-[var(--rs-color-badge-rare)]',
        epic: 'bg-[var(--rs-color-badge-epic-bg)] text-[var(--rs-color-badge-epic)]',
        legendary:
          'bg-[var(--rs-color-badge-legendary-bg)] text-[var(--rs-color-badge-legendary)]',
      },
    },
    defaultVariants: { tier: 'common' },
  },
);

const iconVariants = cva(
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--rs-radius-sm)] text-base',
  {
    variants: {
      tier: {
        common: 'bg-[#e8e6e1]',
        rare: 'bg-[var(--rs-color-primary-subtle)]',
        epic: 'bg-[#dfe3ea]',
        legendary: 'bg-[#e5ddd4]',
      },
    },
    defaultVariants: { tier: 'common' },
  },
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    icon?: ReactNode;
  };

export function Badge({
  className,
  tier,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ tier }),
        tier === 'legendary' &&
          'after:pointer-events-none after:absolute after:top-[-50%] after:-left-full after:h-[200%] after:w-[40%] after:animate-[rs-shimmer_4.5s_ease-in-out_infinite] after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] after:content-[""]',
        className,
      )}
      {...props}
    >
      {icon != null ? (
        <span className={cn(iconVariants({ tier }))}>{icon}</span>
      ) : null}
      {children}
    </div>
  );
}
