import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import { Button } from '../ui/button/button';
import { useTheme } from '../../context/useTheme';

const ThemeToggle = () => {
  const { isInDarkMode, toggleTheme } = useTheme();

  return (
    <div>
      <Button
        size="icon"
        variant="ghost"
        aria-label={isInDarkMode ? 'Use light theme' : 'Use dark theme'}
        className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground justify-center"
        onClick={() => toggleTheme()}
      >
        {isInDarkMode ? <CiLight /> : <MdDarkMode />}
      </Button>
    </div>
  );
};

export default ThemeToggle;
