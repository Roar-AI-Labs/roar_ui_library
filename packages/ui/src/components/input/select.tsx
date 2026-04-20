import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { inputVariants, type InputVariantProps } from './input-variants';

const chevron =
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23727272' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pl-[var(--rs-space-3)] pr-[var(--rs-space-8)]";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  InputVariantProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, error, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          inputVariants({ error: Boolean(error) }),
          'h-[38px] appearance-none rounded-[var(--rs-radius-md)]',
          chevron,
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
      </select>
    );
  },
);
