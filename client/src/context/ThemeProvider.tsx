import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  htmlClassName: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC = ({ children }) => {
  const storedTheme = localStorage.getItem('theme');
  const [isDarkMode, setDarkMode] = useState<boolean>(storedTheme === 'dark');

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const htmlClassName = isDarkMode ? 'dark' : 'light';

  useEffect(() => {
    document.documentElement.className = htmlClassName;
  }, [htmlClassName]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, htmlClassName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
