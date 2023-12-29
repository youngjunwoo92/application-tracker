import { useTheme } from '@/context/ThemeProvider';

function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useTheme();

  console.log(isDarkMode);

  return <button onClick={toggleTheme}>{isDarkMode ? 'Light' : 'Dark'}</button>;
}

export default ThemeSwitcher;
