import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type PostCardProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  tags?: ReactNode;
  thumbnail?: ReactNode;
  aside?: ReactNode;
  /** first / last / only for border radius on feed */
  position?: 'first' | 'middle' | 'last' | 'only';
};

export function PostCard({
  className,
  title,
  description,
  meta,
  tags,
  thumbnail,
  aside,
  position = 'middle',
  ...props
}: PostCardProps) {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-start gap-[var(--rs-space-4)] border-b border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] px-[var(--rs-space-5)] py-[var(--rs-space-4)] transition-[transform,background-color] duration-150',
        'hover:bg-[var(--rs-color-surface-hover)] active:scale-[0.995]',
        position === 'first' && 'rounded-t-[var(--rs-radius)]',
        position === 'last' && 'rounded-b-[var(--rs-radius)] border-b-0',
        position === 'only' && 'rounded-[var(--rs-radius)] border-b-0',
        className,
      )}
      {...props}
    >
      {thumbnail != null ? (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--rs-radius)] bg-[var(--rs-color-bg)]">
          {thumbnail}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="mb-[var(--rs-space-1)] text-[length:var(--rs-text-base)] font-semibold leading-[var(--rs-leading-snug)] text-[var(--rs-color-content)]">
          {title}
        </div>
        {description != null ? (
          <div className="mb-[var(--rs-space-2)] line-clamp-2 text-[length:var(--rs-text-sm)] text-[var(--rs-color-content-muted)]">
            {description}
          </div>
        ) : null}
        {meta != null ? (
          <div className="flex items-center gap-[var(--rs-space-3)] text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
            {meta}
          </div>
        ) : null}
        {tags != null ? (
          <div className="mt-[var(--rs-space-2)] flex flex-wrap gap-[var(--rs-space-1-5)]">
            {tags}
          </div>
        ) : null}
      </div>
      {aside != null ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
