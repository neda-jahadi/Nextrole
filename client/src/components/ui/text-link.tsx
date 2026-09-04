import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/utils';

type TextLinkProps = LinkProps;

export default function TextLink({
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        // Base
        'text-link underline-offset-4 font-semibold',
        'transition-colors',

        // Hover
        'hover:underline hover:text-link-hover',

        // Keyboard focus
        'rounded-md focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring',

        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
