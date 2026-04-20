import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ProfileCardProps = HTMLAttributes<HTMLDivElement> & {
  avatar?: ReactNode;
  name: ReactNode;
  title?: ReactNode;
  dept?: ReactNode;
  stats?: ReactNode;
};

export function ProfileCard({
  className,
  avatar,
  name,
  title,
  dept,
  stats,
  ...props
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--rs-radius-lg)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] p-[var(--rs-space-6)] text-center',
        className,
      )}
      {...props}
    >
      {avatar != null ? (
        <div className="mx-auto mb-[var(--rs-space-3)] flex justify-center">
          {avatar}
        </div>
      ) : null}
      <div className="text-[length:var(--rs-text-lg)] font-semibold text-[var(--rs-color-content)]">
        {name}
      </div>
      {title != null ? (
        <div className="mt-[var(--rs-space-0-5)] text-[length:var(--rs-text-sm)] text-[var(--rs-color-content-muted)]">
          {title}
        </div>
      ) : null}
      {dept != null ? (
        <div className="mt-[var(--rs-space-0-5)] text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
          {dept}
        </div>
      ) : null}
      {stats != null ? (
        <div className="mt-[var(--rs-space-5)] flex justify-center gap-[var(--rs-space-6)] border-t border-[var(--rs-color-border)] pt-[var(--rs-space-4)]">
          {stats}
        </div>
      ) : null}
    </div>
  );
}

export function ProfileStat({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div>
      <div className="text-[length:var(--rs-text-xl)] font-bold text-[var(--rs-color-content)]">
        {value}
      </div>
      <div className="text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
        {label}
      </div>
    </div>
  );
}
