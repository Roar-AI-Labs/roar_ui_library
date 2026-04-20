import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { inputVariants, type InputVariantProps } from './input-variants';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputVariantProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, type = 'text', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        inputVariants({ error: Boolean(error) }),
        'h-[38px] rounded-[var(--rs-radius-md)] px-[var(--rs-space-3)]',
        type === 'date' ||
          type === 'time' ||
          type === 'datetime-local' ||
          type === 'month'
          ? 'min-h-[38px] [color-scheme:light_dark]'
          : '',
        className,
      )}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
});
