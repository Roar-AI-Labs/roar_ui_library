import { type ReactNode } from 'react';
import { Label } from '../label';
import { cn } from '../../lib/cn';

export type FieldProps = {
  id?: string;
  label?: ReactNode;
  htmlFor?: string;
  helperText?: ReactNode;
  errorText?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Field({
  label,
  htmlFor,
  helperText,
  errorText,
  children,
  className,
}: FieldProps) {
  const showHelper = Boolean(helperText) && !errorText;
  const showError = Boolean(errorText);

  return (
    <div className={cn('flex flex-col', className)}>
      {label != null ? (
        <Label htmlFor={htmlFor}>{label}</Label>
      ) : null}
      {children}
      {showError ? (
        <p
          className="mt-[var(--rs-space-1)] text-[length:var(--rs-text-xs)] text-[var(--rs-color-error)]"
          role="alert"
        >
          {errorText}
        </p>
      ) : null}
      {showHelper ? (
        <p className="mt-[var(--rs-space-1)] text-[length:var(--rs-text-xs)] text-[var(--rs-color-content-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
