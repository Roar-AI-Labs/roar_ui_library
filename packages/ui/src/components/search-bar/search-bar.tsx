import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  className?: string;
  inputClassName?: string;
  icon?: ReactNode;
  kbd?: ReactNode;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    { className, inputClassName, icon, kbd, ...inputProps },
    ref,
  ) {
    return (
      <div
        className={cn('relative flex items-center', className)}
      >
        {icon != null ? (
          <span className="pointer-events-none absolute left-[var(--rs-space-3)] h-[18px] w-[18px] text-[var(--rs-color-content-muted)] [&_svg]:h-full [&_svg]:w-full">
            {icon}
          </span>
        ) : null}
        <input
          ref={ref}
          type="search"
          className={cn(
            'h-[38px] w-[240px] rounded-[var(--rs-radius)] border border-[var(--rs-color-border)] bg-[var(--rs-color-bg)] py-0 pl-[var(--rs-space-10)] pr-[var(--rs-space-10)] font-[family-name:var(--rs-font-family)] text-[length:var(--rs-text-sm)] text-[var(--rs-color-content)] transition-all duration-150',
            'placeholder:text-[var(--rs-color-content-placeholder)]',
            'focus:outline-none focus-visible:border-[var(--rs-color-border-focus)] focus-visible:bg-[var(--rs-color-surface)] focus-visible:shadow-[var(--rs-shadow-focus)]',
            !icon && 'pl-[var(--rs-space-3)]',
            !kbd && 'pr-[var(--rs-space-3)]',
            inputClassName,
          )}
          {...inputProps}
        />
        {kbd != null ? (
          <kbd className="pointer-events-none absolute right-[var(--rs-space-3)] rounded-[var(--rs-radius-sm)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] px-1.5 py-0.5 font-[family-name:var(--rs-font-family)] text-[length:var(--rs-text-xs)] leading-[1.4] text-[var(--rs-color-content-muted)]">
            {kbd}
          </kbd>
        ) : null}
      </div>
    );
  },
);
