import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ChartShellProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
};

export function ChartShell({
  className,
  title,
  description,
  footer,
  children,
  ...props
}: ChartShellProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--rs-radius-lg)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)]',
        className,
      )}
      {...props}
    >
      {title != null || description != null ? (
        <div className="border-b border-[var(--rs-color-border)] px-[var(--rs-space-5)] py-[var(--rs-space-4)]">
          {title != null ? (
            <h3 className="text-[length:var(--rs-text-base)] font-semibold text-[var(--rs-color-content)]">
              {title}
            </h3>
          ) : null}
          {description != null ? (
            <p className="mt-[var(--rs-space-1)] text-[length:var(--rs-text-sm)] text-[var(--rs-color-content-muted)]">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="p-[var(--rs-space-4)]">{children}</div>
      {footer != null ? (
        <div className="border-t border-[var(--rs-color-border)] px-[var(--rs-space-5)] py-[var(--rs-space-3)] text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
