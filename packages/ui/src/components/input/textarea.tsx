import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { inputVariants, type InputVariantProps } from './input-variants';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputVariantProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, error, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          inputVariants({ error: Boolean(error) }),
          'min-h-[100px] resize-y rounded-[var(--rs-radius-md)] p-[var(--rs-space-3)] leading-[var(--rs-leading-normal)]',
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  },
);
