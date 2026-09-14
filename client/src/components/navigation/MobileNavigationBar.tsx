import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button/button';

type NavItem = {
  label: string;
  to: string;
};

type MobileNavigationBarProps = {
  items: NavItem[];
};

const MobileNavigationBar = ({ items }: MobileNavigationBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Open navigation menu"
          className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground justify-center"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-2 px-4"
        >
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center rounded-md px-3 h-11 font-medium',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  'focus-visible:outline-none',

                  isActive
                    ? 'font-semibold bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationBar;
