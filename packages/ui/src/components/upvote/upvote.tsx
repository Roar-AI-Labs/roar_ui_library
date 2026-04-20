import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type UpvoteProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  count: ReactNode;
  active?: boolean;
  icon?: ReactNode;
};

export const Upvote = forwardRef<HTMLButtonElement, UpvoteProps>(
  function Upvote(
    { className, count, active, icon, type = 'button', ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'group flex min-w-[52px] shrink-0 flex-col items-center justify-center rounded-[var(--rs-radius)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] px-[var(--rs-space-2)] py-[var(--rs-space-2)] transition-all duration-150 select-none',
          'hover:border-[var(--rs-color-upvote-hover)] hover:text-[var(--rs-color-upvote-hover)]',
          active &&
            'border-[var(--rs-color-upvote-active)] bg-[var(--rs-color-upvote-active-bg)] text-[var(--rs-color-upvote-active)]',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            'group-hover:-translate-y-0.5 group-hover:scale-100',
            active && '-translate-y-0.5 scale-110',
          )}
        >
          {icon ?? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-full w-full"
              aria-hidden
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          )}
        </span>
        <span className="mt-[var(--rs-space-0-5)] text-[length:var(--rs-text-sm)] font-semibold leading-none">
          {count}
        </span>
      </button>
    );
  },
);
