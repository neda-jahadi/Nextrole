import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    invalid?: boolean;
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          // Base
          'min-h-24 w-full resize-y rounded-md bg-surface px-3 py-2',
          'text-base md:text-sm text-foreground placeholder:text-muted-foreground',
          'transition-colors',

          // Border
          'border border-input',

          // Focus - same as Input
          'focus:outline-none',
          'focus:border-primary',
          'focus-visible:ring-2 focus-visible:ring-ring',

          // Disabled
          'disabled:cursor-not-allowed',
          'disabled:bg-disabled',
          'disabled:text-disabled-foreground',
          'disabled:placeholder:text-disabled-foreground',

          // Validation
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

Textarea.displayName = 'Textarea';

export default Textarea;
