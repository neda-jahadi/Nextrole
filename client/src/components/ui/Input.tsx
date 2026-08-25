import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  variant?: 'default' | 'ghost';
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      invalid = false,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          // Base
          'h-11 w-full rounded-md bg-surface px-3',
          'text-foreground placeholder:text-muted-foreground',
          'transition-colors',

          // Focus
          'focus:outline-none',

          // Disabled
          'disabled:cursor-not-allowed',
          'disabled:bg-disabled',
          'disabled:text-disabled-foreground',
          'disabled:placeholder:text-disabled-foreground',

          // Default field
          variant === 'default' && [
            'border border-input',
            'focus:border-primary',
            'focus-visible:ring-2 focus-visible:ring-ring',
          ],

          // Used inside composite controls such as SearchInput
          variant === 'ghost' && [
            'border-0 bg-transparent',
            'focus:border-transparent',
            'focus-visible:ring-0',
          ],

          // Validation state
          invalid && [
            'border-destructive',
            'focus:border-destructive',
            'focus-visible:ring-destructive',
          ],

          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
