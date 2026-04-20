import { forwardRef, type LabelHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(
        'mb-[var(--rs-space-1-5)] block text-[length:var(--rs-text-sm)] font-medium text-[var(--rs-color-content)]',
        className,
      )}
      {...props}
    />
  );
});
