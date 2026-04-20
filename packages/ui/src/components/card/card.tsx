import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

export const cardVariants = cva(
  'rounded-[var(--rs-radius)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)]',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-[var(--rs-space-3)]',
        md: 'p-[var(--rs-space-4)]',
        lg: 'p-[var(--rs-space-6)]',
      },
    },
    defaultVariants: { padding: 'md' },
  },
);

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export function Card({ className, padding, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ padding }), className)} {...props} />
  );
}
