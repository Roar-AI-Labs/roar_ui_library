import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

export const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--rs-radius)]',
    'bg-[var(--rs-color-primary-subdued)] font-semibold text-[var(--rs-color-primary)]',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[length:var(--rs-text-xs)]',
        sm: 'h-8 w-8 text-[length:var(--rs-text-xs)]',
        md: 'h-10 w-10 text-[length:var(--rs-text-sm)]',
        lg: 'h-14 w-14 text-[length:var(--rs-text-lg)]',
        xl: 'h-20 w-20 text-[length:var(--rs-text-2xl)]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

const onlineVariants = cva(
  'absolute rounded-full border-[2px] border-[var(--rs-color-surface)] bg-[var(--rs-color-success)]',
  {
    variants: {
      size: {
        xs: 'bottom-[-1px] right-[-1px] h-2 w-2',
        sm: 'bottom-[-1px] right-[-1px] h-2.5 w-2.5',
        md: 'bottom-[-1px] right-[-1px] h-2.5 w-2.5',
        lg: 'bottom-[-1px] right-[-1px] h-3.5 w-3.5 border-[2.5px]',
        xl: 'bottom-[-1px] right-[-1px] h-3.5 w-3.5 border-[2.5px]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type AvatarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt?: string;
    fallback?: ReactNode;
    online?: boolean;
  };

export function Avatar({
  className,
  size,
  src,
  alt = '',
  fallback,
  online,
  ...props
}: AvatarProps) {
  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="select-none">{fallback}</span>
      )}
      {online ? <span className={cn(onlineVariants({ size }))} aria-hidden /> : null}
    </div>
  );
}
