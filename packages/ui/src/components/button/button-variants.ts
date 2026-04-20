import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-[var(--rs-space-2)]',
    'border border-transparent font-medium leading-none tracking-[var(--rs-tracking-normal)]',
    'rounded-[var(--rs-radius)] cursor-pointer select-none whitespace-nowrap',
    'font-[family-name:var(--rs-font-family)] no-underline',
    'transition-[transform,background-color,border-color,color,box-shadow,opacity]',
    'duration-150 ease-out',
    'focus-visible:outline-none focus-visible:shadow-[var(--rs-shadow-focus)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--rs-color-primary)] text-[var(--rs-color-content-on-primary)] border-[var(--rs-color-primary)] hover:bg-[var(--rs-color-primary-hover)] hover:border-[var(--rs-color-primary-hover)] active:bg-[var(--rs-color-primary-pressed)] active:border-[var(--rs-color-primary-pressed)]',
        secondary:
          'bg-[var(--rs-color-surface)] text-[var(--rs-color-content)] border-[var(--rs-color-border)] hover:bg-[var(--rs-color-surface-hover)] hover:border-[var(--rs-color-border-strong)] active:bg-[var(--rs-color-bg)]',
        ghost:
          'bg-transparent text-[var(--rs-color-content-secondary)] border-transparent hover:bg-[var(--rs-color-surface-hover)] hover:text-[var(--rs-color-content)]',
        destructive:
          'bg-[var(--rs-color-error)] text-[var(--rs-color-content-inverse)] border-[var(--rs-color-error)] hover:bg-[var(--rs-color-error-dark)] hover:border-[var(--rs-color-error-dark)]',
      },
      size: {
        sm: 'h-8 px-[var(--rs-space-3)] text-[length:var(--rs-text-xs)]',
        md: 'h-10 px-[var(--rs-space-4)] text-[length:var(--rs-text-sm)]',
        lg: 'h-12 px-[var(--rs-space-6)] text-[length:var(--rs-text-base)]',
      },
      icon: {
        true: 'p-0 w-10 h-10',
        false: '',
      },
    },
    compoundVariants: [
      { icon: true, size: 'sm', class: 'w-8 h-8 min-h-8 min-w-8' },
      { icon: true, size: 'lg', class: 'w-12 h-12 min-h-12 min-w-12' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      icon: false,
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
