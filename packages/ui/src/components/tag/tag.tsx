import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

export const tagVariants = cva(
  [
    'inline-flex items-center gap-[var(--rs-space-1)] whitespace-nowrap rounded-[var(--rs-radius-full)]',
    'px-[var(--rs-space-2)] py-0.5 text-[length:var(--rs-text-xs)] font-medium leading-[1.6]',
  ],
  {
    variants: {
      variant: {
        neutral:
          'bg-[var(--rs-color-bg)] text-[var(--rs-color-content-secondary)]',
        primary:
          'bg-[var(--rs-color-primary-subdued)] text-[var(--rs-color-primary-pressed)]',
        'cat-1':
          'bg-[var(--rs-color-cat-1-bg)] text-[var(--rs-color-cat-1)]',
        'cat-2':
          'bg-[var(--rs-color-cat-2-bg)] text-[var(--rs-color-cat-2)]',
        'cat-3':
          'bg-[var(--rs-color-cat-3-bg)] text-[var(--rs-color-cat-3)]',
        'cat-4':
          'bg-[var(--rs-color-cat-4-bg)] text-[var(--rs-color-cat-4)]',
        'cat-5':
          'bg-[var(--rs-color-cat-5-bg)] text-[var(--rs-color-cat-5)]',
        'cat-6':
          'bg-[var(--rs-color-cat-6-bg)] text-[var(--rs-color-cat-6)]',
        success:
          'bg-[var(--rs-color-success-light)] text-[var(--rs-color-success-dark)]',
        error:
          'bg-[var(--rs-color-error-light)] text-[var(--rs-color-error-dark)]',
        warning:
          'bg-[var(--rs-color-warning-light)] text-[var(--rs-color-warning-dark)]',
        info: 'bg-[var(--rs-color-info-light)] text-[var(--rs-color-info-dark)]',
        beginner:
          'bg-[var(--rs-color-success-light)] text-[var(--rs-color-success-dark)]',
        intermediate:
          'bg-[var(--rs-color-warning-light)] text-[var(--rs-color-warning-dark)]',
        advanced:
          'bg-[var(--rs-color-error-light)] text-[var(--rs-color-error-dark)]',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

export type TagProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tagVariants>;

export function Tag({ className, variant, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant }), className)} {...props} />
  );
}
