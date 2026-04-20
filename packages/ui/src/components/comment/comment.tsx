import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type CommentProps = HTMLAttributes<HTMLDivElement> & {
  avatar?: ReactNode;
  author: ReactNode;
  time?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  replies?: ReactNode;
  bordered?: boolean;
};

export function Comment({
  className,
  avatar,
  author,
  time,
  children,
  actions,
  replies,
  bordered = true,
  ...props
}: CommentProps) {
  return (
    <div
      className={cn(
        'flex gap-[var(--rs-space-3)] py-[var(--rs-space-4)]',
        bordered && 'border-t border-[var(--rs-color-border)] first:border-t-0',
        className,
      )}
      {...props}
    >
      {avatar}
      <div className="min-w-0 flex-1">
        <div className="mb-[var(--rs-space-1)] flex items-center gap-[var(--rs-space-2)]">
          <span className="text-[length:var(--rs-text-sm)] font-semibold text-[var(--rs-color-content)]">
            {author}
          </span>
          {time != null ? (
            <span className="text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
              {time}
            </span>
          ) : null}
        </div>
        {children != null ? (
          <div className="text-[length:var(--rs-text-sm)] leading-[var(--rs-leading-relaxed)] text-[var(--rs-color-content-secondary)]">
            {children}
          </div>
        ) : null}
        {actions != null ? (
          <div className="mt-[var(--rs-space-2)] flex items-center gap-[var(--rs-space-4)] text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
            {actions}
          </div>
        ) : null}
        {replies != null ? (
          <div className="ml-[var(--rs-space-8)] mt-[var(--rs-space-3)] border-l-2 border-[var(--rs-color-border)] pl-[var(--rs-space-4)]">
            {replies}
          </div>
        ) : null}
      </div>
    </div>
  );
}
