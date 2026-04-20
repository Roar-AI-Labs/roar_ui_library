import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { buttonVariants, type ButtonVariantProps } from './button-variants';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    loading?: boolean;
  };

const spinnerClasses: Record<
  NonNullable<ButtonVariantProps['variant']>,
  string
> = {
  primary: 'border-white border-r-transparent',
  secondary:
    'border-[var(--rs-color-content)] border-r-transparent',
  ghost:
    'border-[var(--rs-color-content-secondary)] border-r-transparent',
  destructive: 'border-white border-r-transparent',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'primary',
      size = 'md',
      icon = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) {
    const isIcon = Boolean(icon);
    const showSpinner = loading;

    return (
      <button
        ref={ref}
        type={props.type ?? 'button'}
        className={cn(
          buttonVariants({
            variant,
            size,
            icon: isIcon,
          }),
          showSpinner && 'relative text-transparent pointer-events-none',
          className,
        )}
        disabled={disabled || loading}
        aria-busy={showSpinner || undefined}
        {...props}
      >
        {showSpinner ? (
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span
              className={cn(
                'box-border h-4 w-4 shrink-0 rounded-full border-2 animate-[rs-spin_0.6s_linear_infinite]',
                spinnerClasses[variant ?? 'primary'],
              )}
            />
          </span>
        ) : null}
        {children}
      </button>
    );
  },
);
