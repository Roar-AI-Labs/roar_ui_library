import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type StatsCardProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode;
  value: ReactNode;
  label: ReactNode;
};

export function StatsCard({
  className,
  icon,
  value,
  label,
  ...props
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--rs-space-2)] rounded-[var(--rs-radius-lg)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] p-[var(--rs-space-5)] transition-[transform,box-shadow,border-color] duration-150 hover:shadow-[var(--rs-shadow-sm)]',
        className,
      )}
      {...props}
    >
      {icon != null ? (
        <div className="flex h-10 w-10 items-center justify-center rounded-[var(--rs-radius)] text-xl">
          {icon}
        </div>
      ) : null}
      <div className="text-[length:var(--rs-text-3xl)] font-bold leading-none text-[var(--rs-color-content)]">
        {value}
      </div>
      <div className="text-[length:var(--rs-text-sm)] text-[var(--rs-color-content-muted)]">
        {label}
      </div>
    </div>
  );
}
