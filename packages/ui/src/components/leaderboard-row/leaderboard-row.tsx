import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type LeaderboardRowProps = HTMLAttributes<HTMLDivElement> & {
  rank: number;
  user: ReactNode;
  subtitle?: ReactNode;
  stats?: ReactNode;
};

export function LeaderboardRow({
  className,
  rank,
  user,
  subtitle,
  stats,
  ...props
}: LeaderboardRowProps) {
  const tier =
    rank === 1 ? '1' : rank === 2 ? '2' : rank === 3 ? '3' : 'other';

  return (
    <div
      className={cn(
        'flex items-center gap-[var(--rs-space-4)] border-b border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] px-[var(--rs-space-4)] py-[var(--rs-space-3)] transition-colors duration-150 last:border-b-0 hover:bg-[var(--rs-color-surface-hover)]',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--rs-radius)] text-[length:var(--rs-text-sm)] font-bold text-[var(--rs-color-content-muted)]',
          tier === '1' &&
            'bg-[linear-gradient(135deg,var(--rs-color-primary),var(--rs-color-primary-pressed))] text-[var(--rs-color-content-on-primary)]',
          tier === '2' &&
            'bg-[linear-gradient(135deg,#9ca3af,#6b7280)] text-[var(--rs-color-content-on-primary)]',
          tier === '3' &&
            'bg-[linear-gradient(135deg,#787e8c,#525a6b)] text-[var(--rs-color-content-on-primary)]',
        )}
      >
        {rank}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-[var(--rs-space-3)]">
        <div className="min-w-0">
          <div className="text-[length:var(--rs-text-sm)] font-semibold text-[var(--rs-color-content)]">
            {user}
          </div>
          {subtitle != null ? (
            <div className="text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      {stats != null ? (
        <div className="flex items-center gap-[var(--rs-space-6)]">{stats}</div>
      ) : null}
    </div>
  );
}

export function LeaderboardStat({
  label,
  value,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'min-w-[60px] text-center text-[length:var(--rs-text-sm)] font-semibold text-[var(--rs-color-content)]',
        className,
      )}
    >
      <div>{value}</div>
      <div className="text-[length:var(--rs-text-xs)] font-normal text-[var(--rs-color-content-muted)]">
        {label}
      </div>
    </div>
  );
}
