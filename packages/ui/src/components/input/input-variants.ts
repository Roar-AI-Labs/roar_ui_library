import { cva, type VariantProps } from 'class-variance-authority';

const controlBase = [
  'w-full font-[family-name:var(--rs-font-family)] text-[length:var(--rs-text-sm)] text-[var(--rs-color-content)]',
  'border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)]',
  'transition-all duration-150 ease-out',
  'placeholder:text-[var(--rs-color-content-placeholder)]',
  'focus:outline-none focus-visible:border-[var(--rs-color-border-focus)] focus-visible:shadow-[var(--rs-shadow-focus)]',
  'disabled:cursor-not-allowed disabled:opacity-50',
] as const;

export const inputVariants = cva(controlBase, {
  variants: {
    error: {
      true: 'border-[var(--rs-color-error)] focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.25)]',
      false: '',
    },
  },
  defaultVariants: { error: false },
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
