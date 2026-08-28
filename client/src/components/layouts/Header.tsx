import { Link } from 'react-router-dom';
import nextrole from '@/assets/images/nextrole-noB.png';
import Container from './Container';
import { navItems } from '../../config/nav.config';
import { useAuth } from '../../context/useAuth';
import NavigationBar from '../navigation/NavigationBar';
import MobileNavigationBar from '../navigation/MobileNavigationBar';
import ThemeToggle from '../settings/ThemeToggle';

const Header = () => {
  const { isAuthenticated, user } = useAuth();

  const items = navItems.filter((item) => {
    if (item.onlyGuest && isAuthenticated) {
      return false;
    }

    if (item.requiresAuth && !isAuthenticated) {
      return false;
    }

    if (item.roles && user?.role && !item.roles.includes(user?.role)) {
      return false;
    }

    if (user?.role && item.hideForRoles?.includes(user?.role)) {
      return false;
    }
    return true;
  });

  return (
    <header className="bg-primary text-primary-foreground">
      <Container className="flex h-20 items-center justify-between">
        <Link className="flex items-center mr-4" to="/">
          <img className="h-12 w-auto" src={nextrole} alt="NextRole Logo" />
        </Link>
        <div className="flex gap-2">
          <nav aria-label="Primary" className="hidden md:block">
            <NavigationBar items={items} />
          </nav>
          {/* Mobile */}
          <div className="md:hidden">
            <MobileNavigationBar items={items} />
          </div>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
