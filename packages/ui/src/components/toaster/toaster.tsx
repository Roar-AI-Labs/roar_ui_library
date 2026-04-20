import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { cn } from '../../lib/cn';

export type { ToasterProps };

/**
 * Mount once near the app root. Uses design tokens for surface, border, and text.
 * @see https://sonner.emilkowal.ski/
 */
export function Toaster({
  className,
  toastOptions,
  style,
  ...props
}: ToasterProps) {
  return (
    <Sonner
      className={cn('toaster group', className)}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          toast: cn(
            'group-[.toaster]:border-[var(--rs-color-border)] group-[.toaster]:bg-[var(--rs-color-surface)] group-[.toaster]:text-[var(--rs-color-content)] group-[.toaster]:shadow-[var(--rs-shadow-md)]',
            toastOptions?.classNames?.toast,
          ),
          title: cn(
            'group-[.toaster]:text-[var(--rs-color-content)]',
            toastOptions?.classNames?.title,
          ),
          description: cn(
            'group-[.toaster]:text-[var(--rs-color-content-muted)]',
            toastOptions?.classNames?.description,
          ),
          actionButton: cn(
            'group-[.toaster]:bg-[var(--rs-color-primary)] group-[.toaster]:text-[var(--rs-color-content-on-primary)]',
            toastOptions?.classNames?.actionButton,
          ),
          cancelButton: cn(
            'group-[.toaster]:bg-[var(--rs-color-surface-hover)] group-[.toaster]:text-[var(--rs-color-content)]',
            toastOptions?.classNames?.cancelButton,
          ),
        },
      }}
      style={
        {
          '--normal-bg': 'var(--rs-color-surface)',
          '--normal-border': 'var(--rs-color-border)',
          '--normal-text': 'var(--rs-color-content)',
          '--success-bg': 'var(--rs-color-surface)',
          '--success-border': 'var(--rs-color-success)',
          '--error-bg': 'var(--rs-color-surface)',
          '--error-border': 'var(--rs-color-error)',
          zIndex: 'var(--rs-z-toast)',
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
