import { useTheme } from '@/context/ThemeProvider';
import Button from '../common/Button';

function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      size="sm"
      color={isDarkMode ? 'primary' : 'dark'}
      onClick={toggleTheme}
      className="rounded-md"
    >
      {isDarkMode ? 'Light' : 'Dark'}
    </Button>
  );
}

export default ThemeSwitcher;
