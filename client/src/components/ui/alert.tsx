import type { ReactNode } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

type AlertProps = {
  children: ReactNode;
  variant?: AlertVariant;
  className?: string;
};

const variantClasses: Record<AlertVariant, string> = {
  info: 'border-info/30 bg-info/10 text-info',
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/40 bg-warning/10 text-warning-foreground',
  error: 'border-destructive/30 bg-destructive/10 text-destructive',
};

const Alert = ({
  children,
  variant = 'info',
  className = '',
}: AlertProps) => {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`rounded-md border p-3 text-sm ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Alert;
