import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type CourseCardProps = HTMLAttributes<HTMLDivElement> & {
  thumbnail?: ReactNode;
  difficulty?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
};

export function CourseCard({
  className,
  thumbnail,
  difficulty,
  title,
  description,
  footer,
  ...props
}: CourseCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--rs-radius-lg)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] transition-[transform,box-shadow] duration-150',
        'hover:shadow-[var(--rs-shadow-card-hover)] active:scale-[0.995]',
        className,
      )}
      {...props}
    >
      <div className="relative flex h-40 items-center justify-center bg-[var(--rs-color-bg)] text-[40px]">
        {thumbnail}
        {difficulty != null ? (
          <div className="absolute right-[var(--rs-space-3)] top-[var(--rs-space-3)]">
            {difficulty}
          </div>
        ) : null}
      </div>
      <div className="p-[var(--rs-space-4)]">
        <div className="mb-[var(--rs-space-1)] text-[length:var(--rs-text-base)] font-semibold text-[var(--rs-color-content)]">
          {title}
        </div>
        {description != null ? (
          <div className="mb-[var(--rs-space-3)] line-clamp-2 text-[length:var(--rs-text-sm)] text-[var(--rs-color-content-muted)]">
            {description}
          </div>
        ) : null}
        {footer != null ? (
          <div className="flex items-center justify-between gap-[var(--rs-space-3)]">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
