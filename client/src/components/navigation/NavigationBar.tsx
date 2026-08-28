import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

type NavItem = {
  label: string;
  to: string;
};

const NavigationBar = ({ items }: { items: NavItem[] }) => {
  return (
    <ul className="flex items-center gap-2">
      {items.map((navItem) => (
        <li key={navItem.label}>
          <NavLink
            to={navItem.to}
            className={({ isActive }) =>
              cn(
                'inline-flex rounded-md px-3 h-10 items-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
              )
            }
          >
            {navItem.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavigationBar;
