import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

const THEME_STORAGE_KEY = 'nextrole-theme';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isInDarkMode, setIsInDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isInDarkMode);
    localStorage.setItem(
      THEME_STORAGE_KEY,
      isInDarkMode ? 'dark' : 'light',
    );
  }, [isInDarkMode]);

  const toggleTheme = () => {
    setIsInDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isInDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
