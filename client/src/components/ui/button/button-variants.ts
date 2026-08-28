import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center space-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        outline:
          'border border-input bg-surface text-foreground hover:bg-primary hover:text-primary-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-link underline underline-offset-4 transition-colors hover:text-link-hover',
        field: [
          'justify-between border border-input bg-surface',
          'text-foreground',
          'hover:bg-surface',
          'focus:border-primary',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
          'data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-ring',
        ],
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6',
        icon: 'size-10',
        field: 'h-11 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
